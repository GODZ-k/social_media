// import toast from "react-hot-toast"
import {ApiURL} from "./ApiConstant.js"
import axios from "axios"
import { login, logOut } from "../src/redux/features/authSlice.js"
import { toast } from "sonner"
import { addPost, deletePost, feeds, likeDislikePost, updatePost } from "@/redux/features/postSlice.js"



const SignUpUser = async (userData , navigate , setLoading  )=>{
    try {
        console.log(userData)
        setLoading(true)
        const response = await axios.post(ApiURL.registerUser,userData)
        const data = response.data
        toast.success(data.msg)
        setLoading(false)
        navigate("/signin")

    } catch (error) {
        setLoading(false)
      toast(error.response.data.msg)

    }
}


const SigninUser = async(userData, dispatch , navigate , setLoading)=>{
    try {
        setLoading(true)
        const response = await axios.post(ApiURL.loginUser,userData)
        const data = response.data.user
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



const createPost = async(postData,dispatch,navigate , setLoading)=>{
    try {
        setLoading(true)
        await axios.post(ApiURL.createPost,postData,{
            headers:{
                "Content-Type":"multipart/form-data"
            },
            withCredentials:true
        })
        .then((res)=>{
            dispatch(addPost(res.data.post))
            toast.success(res.data.msg)
            setLoading(false)
            navigate("/")
        })
    } catch (error) {
        setLoading(false)
        toast.warning(error.response.data.msg)
    }
}


const editPost = async (data,postId,dispatch,setLoading)=>{
    try {
        setLoading(true)
        await axios.put(`${ApiURL.editPost}/${postId}` , data ,{
            withCredentials:true
        })
        .then((res)=>{
            setLoading(false)
            dispatch(updatePost(res.data.updatedPost))
            toast.success(res.data.msg)
        })
    } catch (error) {
        setLoading(false)
        toast.warning(error.response.data.msg)
    }
}

const removePost = async (postId,dispatch,navigate, setLoading)=>{
    try {
        setLoading(true)
        await axios.delete(`${ApiURL.deletePost}/${postId}`,{
            withCredentials:true
        })
        .then((res)=>{
            setLoading(false)
            dispatch(deletePost(postId))
            toast.success(res.data.msg)
            navigate("/")
        })
    } catch (error) {
        setLoading(false)
        toast.warning(error.response.data.msg)
    }
}

const getAllPosts = async (dispatch)=>{
    try {
        await axios.get(ApiURL.feeds)
        .then((res)=>{
            dispatch(feeds(res.data.posts))
        })
    } catch (error) {
        toast.warning(error.response.data.msg)
    }
}



const getAllUsers = async(filter,setUsers)=>{
    try {
        console.log(filter)
        await axios.get(`${ApiURL.getAllUsers}?filter=${filter}`)
        .then((res)=>{
            setUsers(res.data.users)
        })
    } catch (error) {
        toast.warning(error.response.data.msg)
    }
}



const likePost =   async(postId,dispatch , user)=>{
    try {
        await axios.get(`${ApiURL.likePost}/${postId}`,{
            withCredentials:true
        }).then((res)=>{

            dispatch(likeDislikePost({user,postId}))
            toast.success(res.data.msg)
        })
    } catch (error) {
        toast.warning(error.response.data.msg)

    }
}
export {
    SignUpUser,
    SigninUser,
    getProfile,
    getUser,
    getMypost,
    getPost,
    logOutUser,
    createPost,
    getAllPosts,
    removePost,
    editPost,
    getAllUsers,
    likePost
}