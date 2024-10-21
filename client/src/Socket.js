import { io } from 'socket.io-client';

export default function connectSocket(userId) {
    // Create a new socket connection
    const newSocket = io('http://localhost:3000', {
        query: {
            userId: userId
        },
        transports:['websocket']
    });
    return newSocket
}