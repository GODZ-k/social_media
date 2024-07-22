import { Router } from "express";
import userRouter from "./user.route.js"
import { getProfile } from "../controller/main.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";
import { followUser } from "../controller/user.controller.js";
const router =  Router()

// bypass routes ---
router.use('/auth/user', userRouter)


// main routes ---
router.route('/user/:username').get(getProfile)

router.route('/user/follow/:userId').get(verifyJWT,followUser)


export default router