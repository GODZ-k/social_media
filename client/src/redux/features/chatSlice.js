import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    onlineUsers:[],
    messages:[]
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        setOnlineUsers:(state,action)=>{
            const isExits = state.onlineUsers.some(user => user === action.payload)
            if(!isExits){
                state.onlineUsers = action.payload
            }
        },
        setMessages:(state,action)=>{
            state.messages = action.payload
        },
        setNewMessage:(state,action)=>{
            state.messages.push(action.payload)
        }
    }

})


export const { setOnlineUsers , setMessages,setNewMessage} = chatSlice.actions
export default chatSlice.reducer