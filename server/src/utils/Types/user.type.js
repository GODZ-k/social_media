import {z} from 'zod'


const signUpSchema = z.object({
    username:z.string(),
    email:z.string().email(),
    password:z.string().min(6).max(20)
})

const signInSchema = z.object({
    email:z.string().email(),
    password:z.string()
})


const updateProfileType = z.object({
    username:z.string().optional(),
    name:z.string().optional(),
    bio:z.string().max(300).optional()
})


const updatePasswordType = z.object({
    oldPassword:z.string(),
    newPassword:z.string(),
    confirmPassword:z.string()
})

export {
    signInSchema,
    signUpSchema,
    updateProfileType,
    updatePasswordType
}