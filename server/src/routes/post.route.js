import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import upload from "../middleware/multer.middleware.js";
import { commentPost, createPost, deleteComment, deletePost, getFeedPosts, getUserPosts, likePost, replyComment, updatePost } from "../controller/user.post.controller.js";
const router = Router()



router.route('/create').post(verifyJWT,upload.single('image'),createPost)
router.route('/delete/:postId').delete(verifyJWT,deletePost)
router.route('/like/:postId').get(verifyJWT,likePost)
router.route('/update/:postId').put(verifyJWT,updatePost)
router.route('/comment/:postId').post(verifyJWT,commentPost)
router.route('/comment/delete/:postId/:commentId').delete(verifyJWT,deleteComment)
router.route('/comment/reply/:commentId').post(verifyJWT,replyComment)
router.route('').get(verifyJWT,getUserPosts)
router.route('/feed').get(verifyJWT,getFeedPosts)

export default router