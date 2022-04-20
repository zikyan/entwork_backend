import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const postComment = async (req,res)=>{
    try {
        const newComment = await new Comment(req.body)
        await newComment.save()
        res.status(200).json(newComment)

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getComment = async (req,res)=>{
    try {
        const comments = await Comment.find({post:req.params.id})
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getCommentByUsername = async (req,res)=>{
    try {
        const username=await User.findOne({username:req.params.username})
        const comments = await Comment.find({user:username._id})
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllComment = async (req,res)=>{
    try {
        const comments = await Comment.find()
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error);
    }
}