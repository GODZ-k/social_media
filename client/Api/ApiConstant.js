// import { backendApiUrl } from "../config";


// backend url from config
const authApiUrl = `/api/v1/auth/user`
const mainApiUrl  = `/api/v1`
const postApiUrl = `/api/v1/user/post`

// backend url from env
// const authApiUrl = `${backendApiUrl}/api/v1/auth/user`
// const mainApiUrl  = `${backendApiUrl}/api/v1`
// const postApiUrl = `${backendApiUrl}/api/v1/user/post`

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