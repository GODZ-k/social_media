import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
// generte access and refresh token --------------------------

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)

        if (!user) {
            return res.status(400).json({
                msg: "user not found"
            })
        }

        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

const generateVerificationToken = async (user) => {
    try {

        return jwt.sign(
            user,
            process.env.VERIFICATION_TOKEN_SECRET_KEY,
            { expiresIn: process.env.VERIFICATION_TOKEN_EXPIRY }
        )

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

export {
    generateAccessAndRefreshToken,
    generateVerificationToken
}