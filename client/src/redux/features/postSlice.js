import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        feeds: (state, action) => {
            return state = action.payload
        },
        addPost: (state, action) => {
            state.unshift(action.payload)
        },
        deletePost: (state, action) => {
            return state = state.filter(post => post._id !== action.payload)
        },
        updatePost: (state, action) => {
            const { _id, postTitle } = action.payload
            const post = state.find((e) => e._id.toString() === _id.toString())
            post.postTitle = postTitle

        },
      
        likeDislikePost: (state, action) => {
            const { user, postId ,isLiked} = action.payload;
            const post = state.find(post => post._id === postId);

            if (isLiked) {
                    const userIndex = post.likedBy.indexOf(user._id);
                    // User has already liked the post, remove like
                    post.likedBy.splice(userIndex, 1);
                    // post.likedBy = post.likedBy.filter((post) => post.userId !== user._id)
                    // post.likes -= 1;
            } else {
                    // User is liking the post
                    post.likedBy.push(user._id);
                    // post.likes += 1;
                // }
            }
        },
    }
})



export const { feeds, addPost, deletePost, updatePost, likeDislikePost } = postSlice.actions
export default postSlice.reducer
