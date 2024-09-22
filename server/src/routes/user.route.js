import { Router } from "express";
import postRoute from "./post.route.js"
import { followUser, getFollowers,getSuggestions } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";
const router = Router()


// bypass routes ----

router.use('/post' , postRoute)

// main routes ----

router.route('/follow/:userId').get(verifyJWT,followUser)

router.route('/followers/:userId').get(verifyJWT,getFollowers)


router.route('/suggestions').get(verifyJWT,getSuggestions)


export default router