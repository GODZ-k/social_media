import getReceiverSocketId, { io } from "../../socket.js"
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"
import { Cache } from "../utils/client.js"
const cache = new Cache()

const sendMessage = async(req,res)=>{
    try {
        const senderId = req.user._id
        const reciverId = req.params.id
        const {message} = req.body


        console.log(message)


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
            newMessage.save({validateBeforeSave:false})
        ])

        // socket implement for real time data ---

        const reciverSocketId = await getReceiverSocketId(reciverId)

        if(reciverSocketId){
            io.to(reciverSocketId).emit('newMessage',newMessage)
        }

        return res.status(200).json({
            newMessage,
            msg:"Message send successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}


const getMessage =async(req,res)=>{
    try {
        const senderId = req.user
        const reciverId = req.params.id

        // const cachedConversation = await cache.getCachedData('conversation')

        // if(cachedConversation){
        //     return res.status(200).json({
        //         messages:cachedConversation,
        //         msg:"Message found successfully"
        //     })
        // }

        let conversation = await Conversation.findOne({
            participants:{
                $all:[senderId,reciverId]
            }
        }).populate('message').select('message')

        if(!conversation){
            return res.status(404).json({
                msg:[]
            })
        }

        // await cache.setAndExpire('conversation',conversation?.message)
        
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