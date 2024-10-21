import { Server } from "socket.io";
import http from 'http'
import express from 'express'


const app = express()
const server = http.createServer(app)
const io = new Server(server ,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET',"POST","PATCH","DELETE","PUT"]
    }
})

const userSocketMap = {}   // this will store the user id and it's soket it

export default function getReceiverSocketId(reciverId){
    return userSocketMap[reciverId]
}

io.on('connection',(socket)=>{
    const userId = socket.handshake.query.userId
    if(userId){
        // if (!userSocketMap[userId]) {
        //     userSocketMap[userId] = [];
        // }
        // userSocketMap[userId].push(socket.id);
        // Output: { user123: ["socket1", "socket2"] }
        userSocketMap[userId] = socket.id
        // console.log(`user connected successfully userID: ${userId} socket id: ${socket.id}`)
        console.log(userSocketMap)
    }
    io.emit('getOnlineUsers' , Object.keys(userSocketMap))
    //  Output: { user123: ["socket1", "socket2"],
    //            user311: ["socket1", "socket2"],
    //            user143: ["socket1", "socket2"],
    //          }

    socket.on('disconnect',()=>{
        if(userId){
            // userSocketMap[userId] = userSocketMap[userId].filter(id => id !== socket.id);
            // if (userSocketMap[userId].length === 0) {
            //     delete userSocketMap[userId];
            // }
            delete userSocketMap[userId]
            console.log(`user disconnect successfully userID: ${userId} socket id: ${socket.id}`)
        }
        io.emit('getOnlineUsers' , Object.keys(userSocketMap))
    })
})



export { app ,  server , io }