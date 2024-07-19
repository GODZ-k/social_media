import User from "../models/user.model.js"
import { verificationMail } from "../utils/mails/verification.mail.js"
import { signInSchema, signUpSchema } from "../utils/Types/user.type.js"
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

        const verificationToken = generateVerificationToken(payload.data)

        const verificationLink = `${process.env.DOMAIN}/user/verify?token=${verificationToken}`

        await verificationMail(email, verificationLink)

        await User.create({
            email,
            username,
            password
        })

        return res.status(200).json({
            msg: "user created successfully"
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal server error"
        })

    }
}

// verify account ------
const verifyAccount = async(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
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



export {
    registerUser,
    loginUser,
    verifyAccount
}