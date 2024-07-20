import { Router } from "express";
import userRouter from "./user.route.js"
import { getProfile } from "../controller/main.controller.js";
const router =  Router()

// bypass routes ---
router.use('/auth/user', userRouter)


// main routes ---
router.route('/user/:username').get(getProfile)


export default router