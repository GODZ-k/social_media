import { Router }from 'express'
import { deleteAccount, deleteProfileImage, forgotPassword, getCurrentUser, loginUser, logoutUser, registerUser, resetPassword, verifyAccount } from '../controller/user.controller.js'
import { verifyForgotPasswordToken, verifyJWT, verifyVerificationToken } from '../middleware/user.middleware.js'
import updateUserRoute from "./update.user.route.js"
const router =  Router()




router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/profile').get(verifyJWT,getCurrentUser)
router.route('/logout').get(verifyJWT,logoutUser)
router.route('/verify').get(verifyVerificationToken,verifyAccount)
router.route('/delete').get(verifyJWT,deleteAccount)
router.route('/remove-profile-image').get(verifyJWT,deleteProfileImage)
router.route('/forgot-password').post(forgotPassword)
router.route('/reset-password/:token').post(verifyForgotPasswordToken,resetPassword)


// bypass update routes ---

router.use('/update' , updateUserRoute)


export default router