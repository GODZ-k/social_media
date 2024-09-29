import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status:false,
    userData:null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status = true,
            state.userData = action.payload
        },
        logout:(state,action)=>{
            state.status =  false,
            state.userData = null
        },
        updateProfile:(state,action)=>{
            state.userData = action.payload
        },
        logOut:(state, action)=>{
            state.status = false,
            state.userData =  null
        },
        followUnfollowUser:(state,action)=>{
            const user = state.userData.following.find((user)=> user._id === action.payload._id)
            if(user){
                const userIndex = state.userData.following.indexOf(action.payload._id);
                state.userData.following.splice(userIndex, 1);
            }else{
               state.userData.following.push(action.payload)
            }
        },
        removeAvatar:(state,action)=>{
            state.userData.avatar = null
        },
    }
})



export const { login , logout , logOut,followUnfollowUser,removeAvatar} = authSlice. actions
export default authSlice.reducer
