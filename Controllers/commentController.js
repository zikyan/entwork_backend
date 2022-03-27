import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';

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