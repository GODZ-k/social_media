import Comment from "../models/comments.post.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

// get profile --------
const getProfile = async (req, res) => {
  try {
    const username = req.params.username;

    if (!username) {
      return res.status(404).json({
        msg: "All fileds must be require",
      });
    }

    const profile = await User.findOne({username}).select('-password -verificationToken -refreshToken')


    if (!profile || profile.length === 0 || !profile.isVerified ) {
      return res.status(404).json({
        msg: "User not found or not verified",
      });
    }

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

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }

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

    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({
        msg: "Comment not found",
      });
    }

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
