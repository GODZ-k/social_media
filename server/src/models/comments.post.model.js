import  mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  replies: [
    // {
    //   userId: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    //   comment: {
    //     type: String,
    //     required: true,
    //   },
    //   avatar: {
    //     type: String,
    //   },
    //   username: {
    //     type: String,
    //   },
    // },
    {
      type:Schema.Types.ObjectId,
      ref:"Comment"
    },
  ],
  avatar: {
    type: String,
  },
  username: {
    type: String,
  },
});


const Comment = mongoose.model("Comment", commentSchema)


export default Comment