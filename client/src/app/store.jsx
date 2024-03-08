import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../state/authSlice"
import postsReducer from "../state/postsSlice.jsx"


const store = configureStore({
    reducer: {
        auth: authReducer,
        posts: postsReducer,
    },
})

export default store