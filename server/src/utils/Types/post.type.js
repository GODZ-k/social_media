import {z} from 'zod'


const createPostType = z.object({
    postTitle:z.string().optional(),
})

export {
    createPostType
}