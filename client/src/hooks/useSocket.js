import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import connectSocket from '@/Socket';
import { clearSocket, setSocket } from "@/redux/features/socketSlice";
import { setOnlineUsers } from '@/redux/features/chatSlice';
import { setNotification } from '@/redux/features/rtnSlice';

function useSocket() {
    const user = useSelector((state) => state.auth.userData);
    const { socket } = useSelector(state => state.socket)
    const dispatch = useDispatch();

    useEffect(()=>{
        let newSocket

        if(user && !socket){
          newSocket = connectSocket(user?._id); // Call this function to connect the user
          dispatch(setSocket(newSocket));
    
          // Listning  all listners
          newSocket.on('getOnlineUsers',(onlineUsers)=>{
            dispatch(setOnlineUsers(onlineUsers))
          })

          newSocket.on('notification',(notification)=>{
            console.log("notification",notification)
            dispatch(setNotification(notification))
          })
    
        }



        // return () => {
        //         if (newSocket) {
        //             newSocket.disconnect();
        //             dispatch(clearSocket()); // Clear socket from Redux when disconnected
        //         }
        //       };

      },[user, dispatch ])
    
  return null
}

export default useSocket