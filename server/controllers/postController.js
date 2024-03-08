import Post from "../models/postModel.js"
import mongoose from "mongoose"

// import fs from "fs"

// // GET all Posts with Auth
export const getAllPosts = async (req,res) =>{
    const user_id = req.user._id

    // .sort({createdAt: -1}) will render the newest posts on top of list
    const posts = await Post.find({user_id}).sort({createdAt: -1})
    
    res.status(200).json(posts)

}

// GET a single workout
export const getSinglePost = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findById(id)

    if (!post){
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(post)
}

// Create/POST a new workout
export const createPost = async (req,res) =>{
    // const {title, load, reps} = req.body
    const {title, load, reps, picturePath} = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }

    if(!load){
        emptyFields.push('load')
    }

    if(!reps){
        emptyFields.push('reps')
    }

    if(!picturePath){
        emptyFields.push('picturePath')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }

    
    // add doc to db
    try{
        const user_id = req.user._id
        // const post = await Post.create({title,load,reps,user_id})
        const post = await Post.create({title,load,reps,picturePath,user_id})
        res.status(200).json(post)
    } catch(error){
        res.status(400).json({error: error.message})
    }

}

// DELETE a post
export const deletePost = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such post'})
    }

    const post = await Post.findOneAndDelete({_id: id})

    if(!post){
        return res.status(404).json({error: "No such post"})
    }

    res.status(200).json(post)

}

// UPDATE a workout

export const updatePost = async (req,res) =>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const post = await Post.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!post){
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(post)

}

