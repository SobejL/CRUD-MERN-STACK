import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    getPosts: (state, action) => {
      // state.posts = action.payload.map(post => {
      //   return {id: post._id, title: post.title, load: post.load, reps: post.reps}
      // })
      state.posts = action.payload;
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(w => w._id !== action.payload._id) 
    },
    createPost: (state, action) => {
      state.posts = [action.payload, ...state.posts]

      window.location.reload();

    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(x => x.id === action.payload.id)
      state.posts[index] = {
        id: action.payload.id,
        title: action.payload.title,
        load: action.payload.load,
        reps: action.payload.reps
      }
    },
  },
});


export const { getPosts, deletePost, createPost, updatePost} = postsSlice.actions;
export default postsSlice.reducer;
