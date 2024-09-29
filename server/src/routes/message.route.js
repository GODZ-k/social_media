import { Router } from "express";
import { verifyJWT } from "../middleware/user.middleware.js";
import { getMessage, sendMessage } from "../controller/message.controller.js";

const router = Router()



router.route('/send/:id').post(verifyJWT,sendMessage)
router.route('/all/:id').get(verifyJWT,getMessage)


export default router