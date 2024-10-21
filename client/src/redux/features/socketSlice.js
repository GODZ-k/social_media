import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    socket:null
}

const socketSlice = createSlice({
    name:'socket',
    initialState,
    reducers:{
        setSocket:(state,action)=>{
            state.socket = action.payload
        },
        clearSocket:(state,action)=>{
            state.socket = null
        }
    }

})


export const { setSocket , clearSocket} = socketSlice.actions
export default socketSlice.reducer