import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

const sendMessage = async(req,res)=>{
    try {
        const senderId = req.user._id
        const reciverId = req.params.id
        const {message} = req.body

        let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,reciverId]
            }
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId,reciverId]
            })
        }

        const newMessage = await Message.create({
            senderId,
            reciverId,
            message
        })

        if(newMessage){
            conversation.message.push(newMessage._id)
        }

        await Promise.all([
            conversation.save({validateBeforeSave:false}),
            message.save({validateBeforeSave:false})
        ])

        // socket implement for real time data ---


        return res.status(200).json({
            newMessage,
            msg:"Message send successfully"
        })
    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}


const getMessage =async(req,res)=>{
    try {
        const senderId = req.user
        const reciverId = req.params.id

        let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,reciverId]
            }
        })

        if(!conversation){
            return res.status(404).json({
                msg:[]
            })
        }

        return res.status(200).json({
            messages:conversation?.message,
            msg:"Message found successfully"
        })

    } catch (error) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}


export {
    getMessage,
    sendMessage
}