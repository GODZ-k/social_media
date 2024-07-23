import { Router } from "express";
import postRoute from "./post.route.js"
import { getProfile } from "../controller/main.controller.js";
import { followUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/user.middleware.js";
const router = Router()


// bypass routes ----

router.use('/post' , postRoute)

// main routes ----

router.route('/:username').get(getProfile)

router.route('/follow/:userId').get(verifyJWT,followUser)


export default router