import mongoose, { Model, Schema } from "mongoose";

const postSchema = new Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postTitle: {
      type: String,
      default: "",
      maxLength: 600,
    },
    image: {
      type: String,
    },

    likes: {
      type: Number,
      default: 0,
    },
    likedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        avatar: {
          type: String,
        },
        username: {
          type: String,
        },
      },
    ],
    comments: [
      {
        type:Schema.Types.ObjectId,
        ref:"Comment"
      },
    ],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
