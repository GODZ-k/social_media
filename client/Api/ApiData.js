// import toast from "react-hot-toast"
import { ApiURL } from "./ApiConstant.js"
import axios from "axios"
import { followUnfollowUser, login, logOut , removeAvatar ,updateProfileImage } from "../src/redux/features/authSlice.js"
import { toast } from "sonner"
import { addPost, deletePost, allPosts, likeDislikePost, updatePost, postComment } from "@/redux/features/postSlice.js"
import { Message } from "@mui/icons-material"



const SignUpUser = async (userData, navigate, setLoading) => {
    try {
        console.log(userData)
        setLoading(true)
        const response = await axios.post(ApiURL.registerUser, userData)
        const data = response.data
        toast.success(data.msg)
        setLoading(false)
        navigate("/signin")

    } catch (error) {
        setLoading(false)
        toast(error.response.data.msg)

    }
}


const SigninUser = async (userData, dispatch, navigate, setLoading) => {
    try {
        setLoading(true)
        const response = await axios.post(ApiURL.loginUser, userData)
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



const getProfile = async (dispatch) => {
    try {
        const response = await axios.get(ApiURL.currentUser, {
            withCredentials: true
        })
        const data = response.data.profile
        dispatch(login(data))
    } catch (error) {
        toast.warning(error.response.data.msg)
    }
}


const updateProfile = async (data, setLoading) => {
    try {
        setLoading(true)
        await axios.put(ApiURL.updateUser, data, {
            withCredentials: true
        }).then((res) => {
            toast.success(res.data.msg)
            setLoading(false)
        })

    } catch (error) {
        toast.warning(error.response.data.msg)
        setLoading(false)
    } finally {
        setLoading(false)
    }
}


const updateAvatar = async (data,dispatch, setLoading) => {
    try {
        await axios.put(ApiURL.updateProfileImage,data ,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials:true
        }).then((res)=>{
            dispatch(updateProfileImage(res.data.avatar))
            toast.success(res.data.msg)
        })
    } catch (error) {
        toast.warning(error.response.data.msg)
        setLoading(false)
    } finally {
        setLoading(false)
    }
}


const deleteAvatar = async (dispatch, setLoading) => {
    try {
        await axios.delete(ApiURL.deleteProfileImage,{
            withCredentials:true
        }).then((res)=>{
            dispatch(removeAvatar())
            toast.success(res.data.msg)
        })
    } catch (error) {
        toast.warning(error.response.data.msg)
        setLoading(false)
    } finally {
        setLoading(false)
    }
}

const getUser = async (username, setUser) => {
    try {
        const response = await axios.get(`${ApiURL.getProfile}/${username}`)
        // console.log(response.data)
        setUser(response.data.profile)
    } catch (error) {
        toast.warning(error.response.data.msg)
        setUser({})

    }
}


const getMypost = async (setPosts) => {
    try {
        const response = await axios.get(ApiURL.getMypost, {
            withCredentials: true
        })
        setPosts(response.data.posts)

    } catch (error) {
        toast.warning(error.response.data.msg)
    }
}


const getPost = async (setPost, pid) => {
    try {
        const response = await axios.get(`${ApiURL.getPost}/${pid}`)
        setPost(response.data.post)
    } catch (error) {
        toast(error.response.data.msg)
    }
}


const logOutUser = async (dispatch, navigate) => {
    try {
        await axios.get(ApiURL.logOutUser, {
            withCredentials: true
        })
        dispatch(logOut())
        navigate('/signin')
    } catch (error) {
        toast(error.response.data.msg)
    }
}



const createPost = async (postData, dispatch, navigate, setLoading) => {
    try {
        setLoading(true)
        console.log(postData)
        await axios.post(ApiURL.createPost, postData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            withCredentials: true
        })
            .then((res) => {
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


const editPost = async (data, postId, dispatch, setLoading) => {
    try {
        setLoading(true)
        await axios.put(`${ApiURL.editPost}/${postId}`, data, {
            withCredentials: true
        })
            .then((res) => {
                setLoading(false)
                dispatch(updatePost(res.data.updatedPost))
                toast.success(res.data.msg)
            })
    } catch (error) {
        setLoading(false)
        toast.warning(error.response.data.msg)
    }
}

const removePost = async (postId, dispatch, navigate, setLoading) => {
    try {
        setLoading(true)
        await axios.delete(`${ApiURL.deletePost}/${postId}`, {
            withCredentials: true
        })
            .then((res) => {
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

// const getAllFeeds = async (dispatch)=>{
//     try {
//         await axios.get(ApiURL.feeds,{
//             withCredentials:true
//         })
//         .then((res)=>{
//             dispatch(feeds(res.data.posts))
//         })
//     } catch (error) {
//         toast.warning(error.response.data.msg)
//     }
// }

const deleteUserAccount = async(navigate , setLoading)=>{
    try {
        setLoading(true)
        await axios.delete(ApiURL.deleteAccount,{
            withCredentials:true
        })
        .then((res)=>{
            toast.success(res.data.msg)
            setLoading(false)
            navigate('/signup')
        })
    } catch (error) {
        setLoading(false)
        toast.warning(error.response.data.msg)
    }
}
const getAllPosts = async (dispatch) => {
    try {
        await axios.get(ApiURL.getAllPosts)
            .then((res) => {
                dispatch(allPosts(res.data.posts))
            })
    } catch (error) {
        toast.warning(error.response.data.msg)
    }
}



const getAllUsers = async (filter) => {
    try {
        const response = await axios.get(`${ApiURL.getAllUsers}?filter=${filter}`)
        const data = await response.data
        return data.users

    } catch (error) {
        toast.warning(error.response.data.msg)
    }
}


// const getUser = async()=>{
//     try {

//     } catch (error) {
//         toast.warning(error)
//     }
// }


const likePost = async (postId, dispatch, user, isLiked) => {
    try {
        await axios.get(`${ApiURL.likePost}/${postId}`, {
            withCredentials: true
        }).then((res) => {
            dispatch(likeDislikePost({ user, postId, isLiked }))
            toast.success(res.data.msg)
        })
    } catch (error) {
        toast.warning(error.response.data.msg)

    }
}



const insertComment = async (data, postId, dispatch, setLoading) => {
    try {
        setLoading(true)
        await axios.post(`${ApiURL.comments}/${postId}`, data, {
            withCredentials: true,
        })
            .then((res) => {
                setLoading(false)
                console.log(res)
                toast.success(res.data.msg)
                dispatch(postComment({ comment: res.data.userComment, postId }))
            })
    } catch (error) {
        console.log(error)
        setLoading(false)
        // toast.warning(error.response.data.msg)
    }
}




const followUnfollow = async (id, dispatch, setLoading) => {
    try {
        setLoading(true)
        await axios.get(ApiURL.followUnfollow + '/' + id , {
            withCredentials: true
        }).then((res) => {
            setLoading(false)
            dispatch(followUnfollowUser(id))  // pending
            toast.success(res.data.msg)
        })

    } catch (error) {
        setLoading(false)
        toast.warning(error.response.data.msg)
    }
}


const getAllSuggestions = async (setUsers, setLoading) => {
    try {
        setLoading(true)
        await axios.get(ApiURL.suggestions, {
            withCredentials: true
        }).then((res) => {
            setLoading(false)
            setUsers(res.data.users)
        })
    } catch (error) {
        toast.warning(error.response.data.msg)
        setLoading(false)
    }
}


const sendMessage  = async(message,id,setLoading)=>{
    try {
        console.log(id,message)
        // return
        setLoading(true)
        const res = await axios.post(`${ApiURL.sendMessage}/${id}`,{message}, {
            withCredentials: true
        })
            toast.success(res.data.msg)
            setLoading(false)
            return res.data.newMessage
    } catch (error) {
        toast.warning(error.response.data.msg)
        setLoading(false)
    }
}

const allMessages = async(id,setLoading)=>{
    try {
        setLoading(true)
        const response = await axios.get(`${ApiURL.allMessages}/${id}`, {
            withCredentials: true
        })
        const message = await response.data.messages
        toast.success(response.data.msg)
        setLoading(false)
        return message
    } catch (error) {
        toast.warning(error.response.data.msg)
        setLoading(false)
    }
}

export {
    allMessages,
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
    likePost,
    insertComment,
    followUnfollow,
    getAllSuggestions,
    updateProfile,
    updateAvatar,
    deleteAvatar,
    deleteUserAccount,
    sendMessage
}