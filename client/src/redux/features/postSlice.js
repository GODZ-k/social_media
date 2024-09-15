import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const postSlice = createSlice({
    name:"post",
    initialState,
    reducers:{
       feeds:(state , action)=>{
        return state = action.payload
       },
       addPost:(state,action)=>{
        state.push(action.payload)
       },
       deletePost:(state,action)=>{
        return state =  state.filter(post => post._id !== action.payload)
       },
       updatePost:(state,action)=>{
         
        const {_id , postTitle} = action.payload

        const post = state.find((e)=> e._id.toString() === _id.toString())
        post.postTitle = postTitle

       }
    }
})



export const { feeds , addPost , deletePost ,  updatePost} = postSlice. actions
export default postSlice.reducer
