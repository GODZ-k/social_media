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


export {
    signInSchema,
    signUpSchema
}