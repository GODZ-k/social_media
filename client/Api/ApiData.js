// import toast from "react-hot-toast"
import {ApiURL} from "./ApiConstant.js"
import axios from "axios"
import { login, logOut } from "../src/redux/features/authSlice.js"
// import Toast from "@/components/Toast.jsx"
import { toast } from "sonner"
// import toast from "react-hot-toast"



const SignUpUser = async (userData)=>{
    try {
        const response = await axios.post(ApiURL.registerUser,userData)
        const data = response.data



    } catch (error) {
      toast(error.response.data.msg)

    }
}


const SigninUser = async(userData, dispatch , navigate , setLoading)=>{
    try {
        setLoading(true)
        const response = await axios.post(ApiURL.loginUser,userData)
        const data = response.data
        dispatch(login(data))
        setLoading(false)
        toast.success(data.msg)
        navigate("/")
        
    } catch (error) {
        setLoading(false)
        toast(error.response.data.msg)
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
        toast.warning(error.response.data.msg)
    }
}


const getUser = async(username,setUser)=>{
    try {
        const response = await axios.get(`${ApiURL.getProfile}/${username}`)
        setUser(response.data.profile)
    } catch (error) {
        toast.warning(error.response.data.msg)

    }
}


const getMypost = async(setPosts)=>{
    try {
        const response =  await axios.get(ApiURL.getMypost,{
            withCredentials:true
        })
        setPosts(response.data.posts)

    } catch (error) {
         toast.warning(error.response.data.msg)
    }
}


const getPost = async(setPost,pid)=>{
    try {
        const response =  await axios.get(`${ApiURL.getPost}/${pid}`)
        setPost(response.data.post)
    } catch (error) {
        toast(error.response.data.msg)
    }
}


const logOutUser = async(dispatch, navigate) =>{
    try {
        await axios.get(ApiURL.logOutUser,{
            withCredentials:true
        })
        dispatch(logOut())
        navigate('/signin')
    } catch (error) {
        toast(error.response.data.msg)
    }
}
export {
    SignUpUser,
    SigninUser,
    getProfile,
    getUser,
    getMypost,
    getPost,
    logOutUser
}