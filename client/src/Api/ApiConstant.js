// import { backendApiUrl } from "../../config";


const authApiUrl = `/api/v1/auth/user`
const mainApiUrl  = `/api/v1`
const postApiUrl = `/api/v1/user/post`
// const authApiUrl = `${backendApiUrl}/auth/user`

export const ApiURL ={
    // auth routes
    registerUser:`${authApiUrl}/register`,
    loginUser:`${authApiUrl}/login`,
    currentUser:`${authApiUrl}/profile`,

    // main routes
    getProfile:`${mainApiUrl}/user`,
    getPost:`${mainApiUrl}/post`,

    // post routes
    getMypost:`${postApiUrl}`
}