import Comment from '../models/commentModel.js';
import User from '../models/userModel.js';
import Post from '../models/postModel.js';

export const postComment = async (req,res)=>{
    try {
        if(req.body.commentText){
            const newComment = await new Comment(req.body)
            const post = await Post.findById(req.body.post)
            const com = post?.comment+1
            await Post.findByIdAndUpdate(post?._id,{comment:com})
            await newComment.save()
            res.status(200).json(newComment)
        }

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getComment = async (req,res)=>{
    try {
        const comments = await Comment.find({post:req.params.id}).sort({_id:-1})
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getCommentByUsername = async (req,res)=>{
    try {
        const username=await User.findOne({username:req.params.username})
        const comments = await Comment.find({user:username._id}).sort({ _id: -1 })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllComment = async (req,res)=>{
    try {
        const comments = await Comment.find().sort({ _id: -1 })
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const reportComment = async (req,res)=>{
    try {
        const comment = await Comment.findById(req.params.id)
        const rep = comment?.report+1
        await Comment.findByIdAndUpdate(req.params.id,{report:rep, $push :{reportuser:req.body.currentUser}})
        await User.findByIdAndUpdate(comment?.user,{report:rep})
        res.status(200).json("Reported Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getCommentByPostId = async (req,res)=>{
    try {
        const comments = await Comment.find({post:req.params.id})
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const addCommentLike = async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id);
      if (!comment.vote.includes(req.body.userId)) {
        await comment.updateOne({ $push: { vote: req.body.userId } });
        const voteCount = comment?.count+1
        await comment.updateOne({count:voteCount})
        res.status(200).json("The comment has been liked");
      } else {
        await comment.updateOne({ $pull: { vote: req.body.userId } });
        const voteCount = comment?.count-1
        await comment.updateOne({count:voteCount})
        res.status(200).json("The comment has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}