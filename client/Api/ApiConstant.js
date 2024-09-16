// import { backendApiUrl } from "../config";


const authApiUrl = `/api/v1/auth/user`
const mainApiUrl  = `/api/v1`
const postApiUrl = `/api/v1/user/post`
// const authApiUrl = `${backendApiUrl}/auth/user`

export const ApiURL ={
    // auth routes
    registerUser:`${authApiUrl}/register`,
    loginUser:`${authApiUrl}/login`,
    currentUser:`${authApiUrl}/profile`,
    logOutUser:`${authApiUrl}/logout`,

    // main routes
    getProfile:`${mainApiUrl}/user`,
    getPost:`${mainApiUrl}/post`,
    feeds:`${mainApiUrl}/posts`,
    getAllUsers:`${mainApiUrl}/users`,

    // post routes
    // getMypost:`${postApiUrl}`
    createPost:`${postApiUrl}/create`,
    deletePost:`${postApiUrl}/delete`,
    editPost:`${postApiUrl}/update`,
    likePost:`${postApiUrl}/like`
}