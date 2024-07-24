import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { createPost, deletePost, likePost } from "../controller/user.post.controller.js";
const router = Router()



router.route('/create').post(verifyJWT,upload.single('image'),createPost)
router.route('/delete/:postId').get(verifyJWT,deletePost)
router.route('/like/:postId').get(verifyJWT,likePost)

export default router