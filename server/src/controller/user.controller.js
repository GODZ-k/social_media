import User from "../models/user.model.js"
import { verificationMail } from "../utils/mails/verification.mail.js"
import { signInSchema, signUpSchema } from "../utils/Types/user.type.js"
import cron from 'node-cron'
import { generateAccessAndRefreshToken, generateVerificationToken } from "../utils/utils.js"

// register  -----
const registerUser = async (req, res) => {
    try {
        const inputData = req.body
        if (!inputData) {
            return res.status(400).json({
                msg: "All fields must be required"
            })
        }

        const payload = signUpSchema.safeParse(inputData)

        if (!payload.success) {
            return res.status(400).json({
                msg: "Please enter valid input"
            })
        }

        const { username, email, password } = payload.data

        const user = await User.findOne({ $or: [{ email }, { username }] })

        if (user) {
            return res.status(400).json({
                msg: "User already exists"
            })
        }

        const data = {
            username: payload.data.username,
            email: payload.data.email
        }

        const verificationToken = await generateVerificationToken(data)

        // console.log("verification token ------------------------------- ",verificationToken)

        const verificationLink = `${process.env.DOMAIN}/auth/user/verify?token=${verificationToken}`

        await verificationMail(email, verificationLink)

        await User.create({
            email,
            username,
            password,
            verificationToken,
        })

        return res.status(200).json({
            msg: "user created successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })

    }
}


// verify account ------ 
const verifyAccount = async (req, res) => {
    try {

        const { user, token } = req.user

        // console.log(user)

        if (!user) {
            return res.status(404).json({
                msg: "User not found"
            })
        }

        const verifiedUser = await User.findOne({ $or: [{ email: user.email }, { username: user.username }] })

        if (!verifiedUser) {
            return res.status(404).json({
                msg: "Invalid token"
            })
        }

        if (verifiedUser.isVerified || !verifiedUser.verificationToken) {
            return res.status(400).json({
                msg: "Token expired"
            })
        }

        await verifiedUser.updateOne({
            $unset: {
                verificationToken: 1
            },
            $set: {
                isVerified: true
            }
        })

        return res.status(200).json({
            msg: "Account verified successfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


// login -------
const loginUser = async (req, res) => {
    try {
        const inputData = req.body

        if (!inputData) {
            return res.status(400).json({
                msg: "All fields must be required"
            })
        }

        const payload = signInSchema.safeParse(inputData)

        if (!payload.success) {
            return res.status(400).json({
                msg: "please enter valid input"
            })
        }

        const { email, password } = payload.data

        const existUser = await User.findOne({ email })

        if (!existUser) {
            return res.status(422).json({
                msg: "User not exists"
            })
        }

        if (existUser && !existUser.isVerified) {
            return res.status(422).json({
                msg: "Please verify your account first"
            })
        }

        const checkIsPasswordCorrect = await existUser.isPasswordCorrect(password)

        if (!checkIsPasswordCorrect) {
            return res.status(422).json({
                msg: "Please enter valid password"
            })
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(existUser._id)

        const options = {
            httpOnly: true,
            path: "/"
        }

        return res.status(200).cookie('accessToken', accessToken, options).cookie('refreshToken', refreshToken, options).json({
            msg: "User loggedin successfully"
        })



    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


// get current user ------
const getCurrentUser = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        const currentUser = await User.findById(user._id).select("-password -refreshToken")

        if (!currentUser || !currentUser.isVerified) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        return res.status(200).json({
            currentUser,
            msg: "User fetched successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


// logout ---------
const logoutUser = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        const loggedInUser = await User.findById(user._id)

        if (!loggedInUser) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        await loggedInUser.updateOne({
            $unset: {
                refreshToken: 1
            }
        })
        const options = {
            httpOnly: true,
            path: '/'
        }

        return res.status(200).clearCookie('accessToken', options)
            .clearCookie('refreshToken', options)
            .json({
                msg: "User logged out successfully"
            })
    } catch (error) {
        return res.status(500).json({
            msg: 'Internal server error'
        })
    }
}


// delete account -----
const deleteAccount = async (req, res) => {
    try {
        const user = req.user

        if (!user) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        await User.findByIdAndDelete(user._id)

        const options = {
            httpOnly: true,
            path: "/"
        }

        return res.status(200).clearCookie('accessToken', options)
            .clearCookie('refreshToken', options)
            .json({
                msg: "Account removed successfully"
            })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}



// delete profile image 
const deleteProfileImage = async (req, res) => {
    try {

        const user = req.user

        if (!user) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        const loggedInUser =  await User.findById(user._id)

        if(!loggedInUser){
            return res.status(422).json({
                msg:"Unauthorized access"
            })
        }

        loggedInUser.avatar = ""
        await loggedInUser.save({validateBeforeSave:false})

        return res.status(200).json({
            msg:"Profile image removed successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "imternal server error"
        })
    }
}
// cron job ----------------

// delete unverified user - after 24h -------------------------------------
cron.schedule('0 0 * * *', async () => {
    try {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        await User.deleteMany({ isVerified: false, createdAt: { $lte: twentyFourHoursAgo } });
        console.log('Unverified users deleted');
    } catch (error) {
        console.error('Error deleting unverified users:', error);
    }
});



export {
    registerUser,
    loginUser,
    verifyAccount,
    getCurrentUser,
    logoutUser,
    deleteAccount,
    deleteProfileImage
}