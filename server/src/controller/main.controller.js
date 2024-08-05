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

    // const profile  = await User.findOne({username}).select("-password  -refreshToken")

    // if(!profile || !profile.isVerified){
    //     return res.status(404).json({
    //         msg:"User not found"
    //     })
    // }

    // return res.status(200).json({
    //     profile,
    //     msg:"Profile fetched successfully"
    // })

    const profile = await User.aggregate([
      { $match: { username: username } },
      {
        $lookup: {
          from: "users",
          localField: "followers",
          foreignField: "_id",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "following",
          foreignField: "_id",
          as: "following",
        },
      },
      {
        $project: {
          username: 1,
          email: 1,
          avatar: 1,
          isVerified:1,
          followers: {
            _id: 1,
            username: 1,
            email: 1,
            avatar: 1,
          },
          following: {
            _id: 1,
            username: 1,
            email: 1,
            avatar: 1,
          },
        },
      },
    ]);

    if (!profile || profile.length === 0 || !profile[0].isVerified ) {
      return res.status(404).json({
        msg: "User not found or not verified",
      });
    }

    return res.status(200).json({
      profile: profile[0],
      msg: "Profile fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// get all posts ----
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ createdAt: -1 });

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

export { getProfile, getAllPosts, getPost, getComment };
