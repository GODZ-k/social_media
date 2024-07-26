import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';



// authorize user --
const verifyJWT = async (req, res, next) => {
    try {
        let token;
        if (req.cookies) {
            token = req.cookies.accessToken;
        } else {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        if (!user) {
            return res.status(422).json({
                msg: "Unauthorized access",
            });
        }

        req.user = user

        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            const options = {
                httpOnly: true,
                path: "/"
            }
            return res
                .clearCookie('accessToken', options)
                .clearCookie('refreshToken', options)
                .status(422).json({
                    msg: "Session timeout please login again"
                })
        }
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}



//  decode verify account token 
const verifyVerificationToken = async (req, res, next) => {
    try {
        const token = req.query.token

        if (!token) {
            return res.status(400).json({
                msg: "Token expired or invalid token"
            })
        }

        const user = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET_KEY)


        if (!user) {
            return res.status(422).json({
                msg: "Token expired or invalid token"
            })
        }

        const verifyUser = await User.findOne({ $or: [{ username: user.username }, { email: user.email }] })


        if (!verifyUser) {

            return res.status(422).json({
                msg: "unauthorized access"
            })
        }

        if (verifyUser.isVerified) {
            return res.status(400).json({
                msg: "Account already verified"
            })
        }

        req.user = {
            user,
            token
        }

        next()

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(422).json({
                msg: "Token expired"
            })
        }
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}


// reset password verfify jwt 
const verifyForgotPasswordToken = async (req, res, next) => {
    try {
        const token = req.params.token

        if (!token) {
            return res.status(422).json({
                msg: "Invalid token or token expired"
            })
        }

        const user = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET_KEY)

        if (!user) {
            return res.status(422).json({
                msg: "Invalid token or token expired"
            })
        }

        const verifiedUser = await User.findById(user.id)

        if (!verifiedUser) {
            return res.status(422).json({
                msg: "invalid token or token expired"
            })
        }

        if (!verifiedUser.isVerified) {
            return res.status(422).json({
                msg: "Please verify your account first"
            })
        }

        if (!verifiedUser.verificationToken) {
            return res.status(422).json({
                msg: "Token expired"
            })
        }

        req.user = verifiedUser

        next()

    } catch (error) {
        return res.status(500).json({
            msg: "Invalid token or token expired"
        })
    }
}



export {
    verifyJWT,
    verifyVerificationToken,
    verifyForgotPasswordToken
}