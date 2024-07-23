import { Router } from "express";
import authRoute from "./auth.user.route.js"
import userRoute from "./user.route.js"
import { getAllPosts, getPost } from "../controller/main.controller.js";

const router =  Router()

// bypass routes ---
router.use('/auth/user', authRoute)

router.use('/user' , userRoute)


// main routes ---

router.route("/posts").get(getAllPosts)
router.route('/post/:postId').get(getPost)


export default router