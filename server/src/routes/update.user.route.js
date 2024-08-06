import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import { updateAvatar, updatePassword, updateProfile } from "../controller/update.user.controller.js";
import upload from "../middleware/multer.middleware.js";
const router = Router()




router.route('/profile').put(verifyJWT,updateProfile)
router.route('/password').put(verifyJWT,updatePassword)
router.route('/profile-image').put(verifyJWT,upload.single('avatar'),updateAvatar)



export default router