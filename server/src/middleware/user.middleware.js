import jwt from 'jsonwebtoken'




const verifyJWT = async(req,res,next)=>{
    try {
        let token;
        if (req.cookies) {
            token = req.cookies.accessToken;
        } else {
            token = req.headers.authorization.split(" ")[1];
        }

        if(!token){
            return res.status(422).json({
                msg:"Unauthorized access"
            })
        }

        const user = jwt.verify(token,  process.env.ACCESS_TOKEN_SECRET_KEY)

        if(!user){
            return res.status(422).json({
                msg: "Unauthorized access",
            });
        }

        req.user = user

        next()

    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}



export {
    verifyJWT
}