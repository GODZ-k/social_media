import Post from "../models/post.model.js"
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


// get all posts ----
const getAllPosts = async(req,res)=>{
    try {
        const posts = await Post.find({})

        if(!posts || !posts.length){
            return res.status(404).json({
                msg:"Posts not found"
            })
        }

        return res.status(200).json({
            posts,
            msg:"Post found successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}


// get single post ----
const getPost = async(req,res)=>{
    try {
        const postId = req.params.postId

        if(!postId){
            return res.status(404).json({
                msg:"Post not found"
            })
        }

        const post = await Post.findById(postId)

        if(!post){
            return res.status(404).json({
                msg:"Post not found"
            })
        }

        return res.status(200).json({
            post,
            msg:"post found successfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}


export {
    getProfile,
    getAllPosts,
    getPost
}