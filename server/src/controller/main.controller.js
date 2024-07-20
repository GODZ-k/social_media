import User from "../models/user.model.js"



// get profile --------
const getProfile = async(req,res)=>{
    try {
        const username = req.params.username
        
        if(!username){
            return res.status(404).json({
                msg:"All fileds must be require"
            })
        }

        const profile  = await User.findOne({username}).select("-password  -refreshToken")

        if(!profile || !profile.isVerified){
            return res.status(404).json({
                msg:"User not found"
            })
        }

        return res.status(200).json({
            profile,
            msg:"Profile fetched successfully"
        })


    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}



export {
    getProfile
}