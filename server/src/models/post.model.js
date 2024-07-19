import mongoose, { Model, Schema } from "mongoose";




const postSchema = new Schema({

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    postTitle:{
        type:String,
        default:"",
        maxLength:600
    },
    image:{
        type:Sring
    },

    likes:{
        type:Number,
        default:0
    },
    replies:[
        {
            userId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User'
            },
            comment:{
                type:String,
                required:true
            },
            avatar:{
                type:String,

            },
            username:{
                type:String
            }
        }
    ],


},{timestamps:true})


const Post = mongoose.model('Post',postSchema)


export default Post