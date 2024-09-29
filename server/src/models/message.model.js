import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema({
    senderId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reciverId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    message:{
        type:String,
        required:true
    }

},{timestamps:true})

const Message = mongoose.model('Message',messageSchema)

export default Message