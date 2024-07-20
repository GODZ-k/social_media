import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';



// authorize user --
const verifyJWT = async (req, res, next) => {
    try {
        let token;
        if (req.cookies) {
            token = req.cookies.accessToken;
        } else {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(422).json({
                msg: "Unauthorized access"
            })
        }

        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)

        if (!user) {
            return res.status(422).json({
                msg: "Unauthorized access",
            });
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({
            msg: "Internal server error"
        })
    }
}



//  decode verify account token 
const verifyVerificationToken = async (req, res, next) => {
    try {
        const token = req.query.token

        if (!token) {
            return res.status(400).json({
                msg: "Token expired or invalid token"
            })
        }

        const user = jwt.verify(token, process.env.VERIFICATION_TOKEN_SECRET_KEY)

        if (!user) {
            return res.status(422).json({
                msg: "Token expired or invalid token"
            })
        }

        const verifyUser = await User.findById(user._id)

        if(!verifyUser || !verifyUser.isVerified){
            return res.status(422).json({
                msg:"unauthorized access"
            })
        }

        req.user = {
            user,
            token
        }

        next()

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "internal server error"
        })
    }
}



export {
    verifyJWT,
    verifyVerificationToken
}