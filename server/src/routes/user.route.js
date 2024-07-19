import { Router }from 'express'
import { getProfile, loginUser, registerUser } from '../controller/user.controller.js'
import { verifyJWT } from '../middleware/user.middleware.js'
const router =  Router()




router.route('/login').post(loginUser)
router.route('/register').post(registerUser)
router.route('/profile').get(verifyJWT,getProfile)


export default router