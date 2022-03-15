import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const getAllPost = async (req,res)=>{
    try {
        const post = await Post.find();
        // post.map((zik)=>{
        //     const user = User.find();
        //     console.log(user)
        // })

        
        // await Promise.all(post.map(zik=>{
        //     const user=User.findById(zik.user)
        //     console.log(user)
        // }))
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json(error.message);
    }
    
}
export const postRequest = async (req,res)=>{
    try {
        const newPost = await new Post({
            text:req.body.text,
            user:req.user.id
        });
        await newPost.save();
        res.status(200).json(newPost);
    } catch (error) {
        res.status(400).json(error.message);
    }
}
export const updateRequest = async (req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(401).json("Post not found");
        }

        if(!req.user){
            res.status(401).json("User not found");
        }

        // check for only those users update whose has posted that post

        if(post.user.toString() !== req.user.id){
            res.status(401).json("User not authorized");
        }

        const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body,{
            new:true
        })
    } catch (error) {
        res.status(400).json(error.message);
    }
}
export const deleteRequest = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            res.status(401).json("Post not found");
        }

        if(!req.user){
            res.status(401).json("User not found");
        }

        // check for only those users update whose has posted that post

        if(post.user.toString() !== req.user.id){
            res.status(401).json("User not authorized");
        }

        await post.remove();
        res.status(200).json("Post Deleted");

    } catch (error) {
        res.status(400).json(error.message);
    }
}