// import { backendApiUrl } from "../../config";


const authApiUrl = `/api/v1/auth/user`

export const ApiURL ={
    registerUser:`${authApiUrl}/register`,
    loginUser:`${authApiUrl}/login`,
    currentUser:`${authApiUrl}/profile`
}