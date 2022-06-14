import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Share from '../models/sharedPostModel.js';
import Saved from '../models/Saved.js';
import Comment from '../models/commentModel.js';
import Job from '../models/jobModel.js';
import SavedJob from '../models/savedJob.js';

export const deleteUser = async (req,res)=>{
    try {
        // await User.deleteOne({_id:req.params.id})
        await Post.deleteMany({user:req.params.id})
        await Share.deleteMany({user:req.params.id})
        await Saved.deleteMany({user:req.params.id})
        await Job.deleteMany({user:req.params.id})
        await SavedJob.deleteMany({user:req.params.id})
        await Comment.deleteMany({user:req.params.id})
        res.status(200).json('User Deleted Successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteComment = async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        const post = await Post.findById(comment?.post)
        const com = post?.comment-1
        await Post.findByIdAndUpdate(post?._id,{comment:com})
        await Comment.deleteOne({_id:req.params.id})
        res.status(200).json('Comment Deleted Successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllJobAdmin = async (req,res)=>{
    try {
        const jobs = await Job.find().sort({ _id: -1 });
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getAllPostAdmin = async (req,res)=>{
    try {
        const post = await Post.find().sort({ _id: -1 })
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const userWarning = async (req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        const war = user?.warning+1
        await User.findByIdAndUpdate(req.params.id,{warning:war})
        res.status(200).json("Warned Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}