import { backendApiUrl } from "../../config";


const authApiUrl = `${backendApiUrl}/auth/user`

export const ApiURL ={
    registerUser:`${authApiUrl}/register`,
    loginUser:`${authApiUrl}/login`,
    currentUser:`${authApiUrl}/profile`
}