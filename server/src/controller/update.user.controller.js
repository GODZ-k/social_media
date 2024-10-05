import User from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { updatePasswordType, updateProfileType } from "../utils/Types/user.type.js"




// update profile ----
const updateProfile = async (req, res) => {
    try {
        const inputData = req.body
        const user = req.user

        if (!inputData) {
            return res.status(400).json({
                msg: "All fields must be required"
            })
        }

        const payload = updateProfileType.safeParse(inputData)

        if (!payload.success) {
            return res.status(400).json({
                msg: "Please enter valid input"
            })
        }

        const { username, firstName, bio , gender } = payload.data
        const loggedInUser = await User.findById(user._id)

        if (!loggedInUser) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        const updatableData = {}

        if (username) {
            updatableData.username = username
        }
        if (firstName) {
            updatableData.firstName = firstName
        }
        if (bio) {
            updatableData.bio = bio
        }
        if (gender) {
            updatableData.gender = gender
        }

        await loggedInUser.updateOne(updatableData)

        const updatedUser = await User.findById(user._id)

        return res.status(200).json({
            updatedUser,
            msg: "User updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


// update password ----
const updatePassword = async (req, res) => {
    try {
        const user = req.user
        const inputData = req.body

        if (!user) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        const payload = updatePasswordType.safeParse(inputData)

        if (!payload.success) {
            return res.status(400).json({
                msg: "Please enter valid input"
            })
        }

        const { oldPassword, newPassword, confirmPassword } = payload.data

        const loggedInUser = await User.findById(user._id)

        if (!loggedInUser) {
            return res.status(422).json({
                msg: "unauthorized access"
            })
        }

        const currentPassword = await loggedInUser.isPasswordCorrect(oldPassword)

        if (!currentPassword) {
            return res.status(400).json({
                msg: "Old password does not match"
            })
        }

        if (oldPassword === newPassword) {
            return res.status(406).json({
                msg: "You can not use old password as new password",
            });
        }

        if (newPassword !== confirmPassword) {
            return res.status(406).json({
                msg: "Confirm password does not match",
            });
        }


        loggedInUser.password = newPassword
        await loggedInUser.save({ validateBeforeSave: false })


        const options = {
            httpOnly: true,
            path: '/'
        }

        return res.status(200)
            .clearCookie('accessToken', options)
            .clearCookie('refreshToken', options)
            .json({
                msg: "Password updated successfully"
            })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}


// update avatar -------
const updateAvatar = async (req, res) => {
    try {
        const user = req.user
        const filePath = req.file ? req.file.path : null

        if(!filePath){
            return res.status(400).json({
                msg:"Image is require"
            })
        }

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

        const avatar = await uploadOnCloudinary(filePath)

        if(!avatar){
            return res.status(500).json({
                msg:"Failed to uplaod image"
            })
        }

        await loggedInUser.updateOne({
            $set:{
                avatar:avatar.url
            }
        })

        return res.status(200).json({
            avatar:avatar.url,
            msg: "Profile image updated successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}

export {
    updateProfile,
    updatePassword,
    updateAvatar
}