import Post from '../models/postModel.js';
import User from '../models/userModel.js';

export const createPost = async (req,res)=>{
    try {
        const newPost = await new Post(req.body)
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        
    }
}


export const getAllPost = async (req,res)=>{
    try {
        const post = await Post.find();
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

export const timelinePosts = async (req,res)=>{
    try {
        const currentUser = await User.findById(req.params.user);
        const userPosts = await Post.find({ user: currentUser._id });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ user: friendId });
          })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
      } catch (err) {
        res.status(500).json(err);
      }
}

export const getPostById = async (req,res)=>{
    try {
        const posts = await Post.find({user:req.params.id})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(err);
    }
}

export const getPostByIdOne = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
    }
}