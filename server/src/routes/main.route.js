import { Router } from "express";
import authRoute from "./auth.user.route.js"
import userRoute from "./user.route.js"
import { getAllPosts, getAllUsers, getComment, getPost, getProfile } from "../controller/main.controller.js";

const router =  Router()

// bypass routes ---
router.use('/auth/user', authRoute)

router.use('/user' , userRoute)


// main routes ---
router.route('/user/:username').get(getProfile)
router.route("/posts").get(getAllPosts)
router.route('/post/:postId').get(getPost)
router.route('/post/comment/:commentId').get(getComment)
router.route('/users').get(getAllUsers)

export default router