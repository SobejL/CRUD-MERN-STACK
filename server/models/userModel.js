import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true // if user attempts to sign up with same email mongoose will not allow
    },
    password: {
        type: String,
        required: true 
    }
})

const User = mongoose.model('user', userSchema)

export default User
