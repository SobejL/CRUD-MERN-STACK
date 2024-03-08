import User from "../models/userModel.js"
import bcryptjs from "bcryptjs"
import validator from "validator"
import jwt from "jsonwebtoken"

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.JWT_SECRET, {expiresIn: '3d'})
}

// login user
export const loginUser = async (req,res) =>{
    const {email,password} = req.body

    try{

        if(!email || !password){
            throw Error("All fields must be filled")
        }

        const user = await User.findOne({email})

        if(!user){
            throw Error("Incorrect Email")
        }
    
        const match = await bcryptjs.compare(password, user.password)
        if(!match){
            throw Error('Incorrect password')
        }

        // create a token
        const token = createToken(user.id)
        res.status(200).json({email,token,})
    
    } catch (error){
        res.status(400).json({error: error.message})
    }
    
}

// register user
export const signupUser = async (req,res) =>{
    const { email, password } = req.body
   
    try{
        // validator
        if(!email || !password){
            throw Error("All fields must be field")
        }

        if(!validator.isEmail(email)){
            throw Error("Email is not Valid")
        }

        if(!validator.isStrongPassword(password)){
            throw Error("Password is not strong enough")
        }

        const exists = await User.findOne({email})

        if(exists){
            throw Error('Email already in use')
        }

        const salt = await bcryptjs.genSalt()
        const passwordHash = await bcryptjs.hash(password, salt)
    
        const user = await User.create({email,password: passwordHash})

        // create a token
        const token = createToken(user.id)
        res.status(200).json({email,token})
    } catch(error){
        res.status(400).json({error: error.message})
    }

}