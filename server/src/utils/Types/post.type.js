import {z} from 'zod'



const createPostType = z.object({
    postTitle:z.string().max(300).optional(),
})

const updatePostType = z.object({
    postTitle:z.string().max(300).optional(),
})

const createCommentType = z.object({
    comment:z.string().max(300),
})

export {
    createPostType,
    updatePostType,
    createCommentType
}