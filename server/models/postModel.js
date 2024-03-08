import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    picturePath:{
        type: String,
        default: "",
    },
}, 
{timestamps: true}
)

const Post = mongoose.model('Post', postSchema)

export default Post