import { model, Schema } from "mongoose";

const conversationSchema = new Schema({
    participants:[{
        type:Schema.Types.ObjectId,
        ref:'User'
    }],
    isGroupChat: { type: Boolean, default: false },
    groupName: { type: String },
    message:[{
        type:Schema.Types.ObjectId,
        ref:'Message'
    }],
},{timestamps:true})

const Conversation = model('Conversation',conversationSchema)

export default Conversation