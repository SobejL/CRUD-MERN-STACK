import express from 'express'
import { getAllPosts,getSinglePost,deletePost,updatePost } from '../controllers/postController.js'
import {requireAuth} from '../middleware/requireAuth.js'

const router = express.Router()

//Require Authorization for all paths
router.use(requireAuth)

// GET all posts
router.get('/', getAllPosts, () => {
    res.json({msg: 'GET all posts'})
})

// GET a single posts
router.get('/:id', getSinglePost, (req,res) =>{
    res.json({msg: 'GET a single workout'})
})

// DELETE a workout
router.delete('/:id', deletePost, (req,res) =>{
    res.json({msg:"DELETE a post"})
})


export default router