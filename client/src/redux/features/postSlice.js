import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
       feeds:(state , actions)=>{
        return state = actions.payload
       },
       addPost:(state,actions)=>{
        state.push(actions.payload)
       },
       deletePost:(state,actions)=>{
        return state =  state.filter(post => post._id !== actions.payload)
       },
       editPost:(state,actions)=>{

       }
    }
})



export const { feeds , addPost , deletePost ,  editPost} = postSlice. actions
export default postSlice.reducer
