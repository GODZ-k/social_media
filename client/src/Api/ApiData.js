import toast from "react-hot-toast"
import {ApiURL} from "./ApiConstant.js"
import axios from "axios"
import { login } from "../redux/features/authSlice.js"



const SignUpUser = async (userData)=>{
    try {
        const response = await axios.post(ApiURL.registerUser,userData)
        const data = response.data



    } catch (error) {
      toast.error(error.response.data.msg)

    }
}


const SigninUser = async(userData, dispatch)=>{
    try {
        const response = await axios.post(ApiURL.loginUser,userData)
        const data = response.data

        dispatch(login(data))

        
    } catch (error) {
        toast.error(error.response.data.msg)
    }
}



const getProfile = async(dispatch)=>{
    try {
        const response = await axios.get(ApiURL.currentUser, {
            withCredentials:true
        })
        const data = response.data

        dispatch(login(data))

    } catch (error) {
        toast.error(error.response.data.msg)
    }
}


export {
    SignUpUser,
    SigninUser,
    getProfile
}