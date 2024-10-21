import mongoose from "mongoose";
import Comment from "../models/comments.post.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import client ,{Cache} from "../utils/client.js";

const cache = new Cache()

// get profile --------
const getProfile = async (req, res) => {  
  try {
    const identifier = req.params.identifier;
    console.log(identifier)

    if (!identifier) {
      return res.status(404).json({
        msg: "All fileds must be require",
      });
    }

    // const cacheProfile = await cache.hGet(`user:${username}`,username)

    // if(cacheProfile){
    //   return res.status(200).json({
    //     profile:cacheProfile,
    //     msg: "Profile fetched successfully",
    //   });
    // }

    const query = mongoose.Types.ObjectId.isValid(identifier)
      ? { _id: identifier }   // If valid, search by _id
      : { username: identifier }; // Otherwise, search by username

    const profile = await User.findOne(query)
    .populate({
      path: 'posts',
      populate: {
        path: 'createdBy',  
        select: 'username avatar firstName'  
      }
    })
    .select('-password -verificationToken -refreshToken')


    if (!profile || profile.length === 0 || !profile.isVerified ) {
      return res.status(404).json({
        msg: "User not found or not verified",
      });
    }

    // await cache.hSet(`user:${username}`,username,profile)

    return res.status(200).json({
      profile,
      msg: "Profile fetched successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// get all posts ----
const getAllPosts = async (req, res) => {
  try {

    // const cachedPosts = await cache.get('Allposts')

    // if(cachedPosts){
    //   return res.status(200).json({
    //     posts:cachedPosts,
    //     msg: "Post found successfully",
    //   })
    // }

    const posts = await Post.find({ createdBy: { $ne:null} }).sort({ createdAt: -1 })
    .populate({path:'createdBy',select:'-password -refreshToken -createdAt -updatedAt -savedPost'})
    .populate({path:'comments',populate:{
      path:'userId',
      selece:'-password -refreshToken -createdAt -updatedAt -savedPost'
    }})

    if (!posts || !posts.length) {
      return res.status(404).json({
        msg: "Posts not found",
      });
    }

    // await cache.set('Allposts',posts)

    return res.status(200).json({
      posts,
      msg: "Post found successfully",
    });

  } catch (error) {
    return res.status(500).json({
      error,
      msg: "Internal server error",
    });
  }
};

// get single post ----
const getPost = async (req, res) => {
  try {
    const postId = req.params.postId;

    if (!postId) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }

    // const cachedPost = await cache.hGet(`post:${postId}`,postId);

    // if (cachedPost) {
    //   return res.status(200).json({
    //     post: cachedPost,
    //     msg: "post found successfully",
    //   });
    // }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }

    // await cache.hSet(`post:${postId}`,postId,post,500)

    return res.status(200).json({
      post,
      msg: "post found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// get Comment -----
const getComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    if (!commentId) {
      return res.status(400).json({
        msg: "Bad request",
      });
    }

    // const cachedComment  =  await cache.hGet(`comment:${commentId}`,commentId)

    // if(cachedComment){
    //   return res.status(200).json({
    //     comment:cachedComment,
    //     msg: "Comment found successfully",
    //   });
    // }

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        msg: "Comment not found",
      });
    }

    // await cache.hSet(`comment:${commentId}`,commentId,comment,500)

    return res.status(200).json({
      comment,
      msg: "Comment found successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};


const getAllUsers = async (req,res)=>{
  try {
    const filter = req.query.filter || ""

    // const cachedUser = await cache.hGet(`user:${filter}`,filter)

    // if(cachedUser){
    //   return res.status(200).json({
    //     users:cachedUser,
    //     msg:"Users found successfully"
    //   })
    // }

    const users = await User.find({ 
          $or:[
            {
              username:{
                $regex:filter
              }
            },
            {
              firstName:{
                $regex:filter
              }
            }
          ]
    }).select('-password -refreshToken')

    if(!users){
      return res.status(404).json({
        msg:"User not found"
      })
    }

    // await cache.hSet(`user:${filter}`,filter,users)

    return res.status(200).json({
      users,
      msg:"Users found successfully"
    })
    
  } catch (error) {
    console.log(error);
    
    return res.status(500).json({
      msg:"Internal server error"
    })
  }
}



export { getProfile, getAllPosts, getPost, getComment ,getAllUsers };
