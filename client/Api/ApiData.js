import toast from "react-hot-toast"
import {ApiURL} from "./ApiConstant.js"
import axios from "axios"
import { login } from "../src/redux/features/authSlice.js"



const SignUpUser = async (userData)=>{
    try {
        const response = await axios.post(ApiURL.registerUser,userData)
        const data = response.data



    } catch (error) {
      toast.error(error.response.data.msg)

    }
}


const SigninUser = async(userData, dispatch , navigate)=>{
    try {
        const response = await axios.post(ApiURL.loginUser,userData)
        const data = response.data
        dispatch(login(data))
        toast.success(data.msg)
        navigate("/")
        
    } catch (error) {
        toast.error(error.response.data.msg)
    }
}



const getProfile = async(dispatch)=>{
    try {
        const response = await axios.get(ApiURL.currentUser, {
            withCredentials:true
        })
        const data = response.data.profile
        dispatch(login(data))
    } catch (error) {
       
        toast.error(error.response.data.msg)
    }
}


const getUser = async(username,setUser)=>{
    try {
        const response = await axios.get(`${ApiURL.getProfile}/${username}`)
        setUser(response.data.profile)
    } catch (error) {
        toast.error(error.response.data.msg)

    }
}


const getMypost = async(setPosts)=>{
    try {
        const response =  await axios.get(ApiURL.getMypost,{
            withCredentials:true
        })
        setPosts(response.data.posts)

    } catch (error) {
         toast.error(error.response.data.msg)
    }
}


const getPost = async(setPost,pid)=>{
    try {
        const response =  await axios.get(`${ApiURL.getPost}/${pid}`)
        setPost(response.data.post)
    } catch (error) {
        toast.error(error.response.data.msg)
    }
}
export {
    SignUpUser,
    SigninUser,
    getProfile,
    getUser,
    getMypost,
    getPost
}