import { Router }from 'express'
import { deleteAccount, deleteProfileImage, getCurrentUser, loginUser, logoutUser, registerUser, verifyAccount } from '../controller/user.controller.js'
import { verifyJWT, verifyVerificationToken } from '../middleware/user.middleware.js'
import updateUserRoute from "./update.user.route.js"
const router =  Router()




router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/profile').get(verifyJWT,getCurrentUser)
router.route('/logout').get(verifyJWT,logoutUser)
router.route('/verify').get(verifyVerificationToken,verifyAccount)
router.route('/delete').get(verifyJWT,deleteAccount)
router.route('/remove-profile-image').get(verifyJWT,deleteProfileImage)


// bypass update routes ---

router.use('/update' , updateUserRoute)


export default router