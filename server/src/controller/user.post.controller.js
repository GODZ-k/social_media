import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { createPostType } from "../utils/Types/post.type.js";

// create posts ------
const createPost = async (req, res) => {
  try {
    const user = req.user;
    const inputData = req.body;
    const filePath = req.file ? req.file.path : null;

    if (!inputData) {
      return res.status(400).json({
        msg: "All fields must be required",
      });
    }

    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    const payload = createPostType.safeParse(inputData);

    if (!payload.success) {
      return res.status(400).json({
        msg: "Please enter valid input",
      });
    }

    const { postTitle } = payload.data;

    const loggedInUser = await User.findById(user._id);

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    let post;
    if (filePath) {
      const image = await uploadOnCloudinary(filePath);
      post = await Post.create({
        postTitle,
        image: image.url,
        createdBy: loggedInUser._id,
      });
    } else {
      post = await Post.create({
        postTitle,
        createdBy: loggedInUser._id,
      });
    }

    if (!post) {
      return res.status(500).json({
        msg: "Failed to upload post",
      });
    }

    return res.status(200).json({
      post,
      msg: "Post created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// delete post -----
const deletePost = async (req, res) => {
  try {
    const user = req.user;
    const postId = req.params.postId;

    if (!postId) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }

    const [post, loggedInUser] = await Promise.all([
      Post.findById(postId),
      User.findById(user._id),
    ]);

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    if (!post) {
      return res.status(404).json({
        msg: "Post not found ",
      });
    }

    if (loggedInUser._id.toString() !== post.createdBy.toString()) {
      return res.status(422).json({
        msg: "you are not authorized to delete this post",
      });
    }

    const deletedPost = await post.deleteOne();

    if (!deletedPost) {
      return res.status(404).json({
        msg: "failed to delete post",
      });
    }

    return res.status(200).json({
      msg: "Post deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// update post    --- ( Pending )
const updatePost = async (req, res) => {
  try {
    const user = req.user;
    const inputData = req.body;
    const postId = req.params.postId;

    if (!inputData) {
      return res.status(400).json({
        msg: "All fileds must be required",
      });
    }

    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    const [post, loggedInUser] = await Promise.all([
      Post.findById(postId),
      User.findById(user._id),
    ]);

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    if (!post) {
      return res.status(404).json({
        msg: "Post not found",
      });
    }

    if (inputData) {
      post.updateOne({
        postTitle: inputData.postTitle,
      });
    }

    return res.status(200).json({
      msg: "Post updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// like post -----
const likePost = async (req, res) => {
  try {
    const user = req.user;
    const postId = req.params.postId;
    if (!user) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    const [loggedInUser, post] = await Promise.all([
      User.findById(user._id),
      Post.findById(postId),
    ]);

    if (!loggedInUser) {
      return res.status(422).json({
        msg: "Unauthorized access",
      });
    }

    if (!post) {
      return res.status(404).json({
        msg: "post not found",
      });
    }

    // Check if the post is already liked by the user
    const isLiked = post.likedBy.some(item => item.userId.toString() === user._id.toString());

    if (isLiked) {
      // Unlike the post
      post.likedBy = post.likedBy.filter(item => item.userId.toString() !== user._id.toString());
    } else {
      // Like the post
      post.likedBy.push({
        userId: loggedInUser._id,
        avatar: loggedInUser?.avatar,
        username: loggedInUser.username,
      });
    }

    post.likes = post.likedBy.length
    await post.save({validateBeforeSave:false})

    return res.status(200).json({
        msg: isLiked ? "Post Unliked successfully" : "Post liked successfully"
    })

  } catch (error) {
    console.log(error)
    return res.status(500).json({
      msg: "Internal server error",
    });
  }
};

// comment --------




export { createPost, deletePost, updatePost, likePost };
