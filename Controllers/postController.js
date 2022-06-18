import Post from '../models/postModel.js';
import User from '../models/userModel.js';
import Share from '../models/sharedPostModel.js';
import Saved from '../models/Saved.js';
import Comment from '../models/commentModel.js';
import ContentBasedRecommender from 'content-based-recommender';

export const createPost = async (req,res)=>{
    try {
        const newPost = await new Post(req.body)
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error.message);
    }
}


export const getAllPost = async (req,res)=>{
    try {
        if(req.query.tag){
            const tagPost = await Post.find({tag:req.query.tag}).sort({ _id: -1 });
            res.status(200).json(tagPost);
        }
        else if(req.query.category){
            const categoryPost = await Post.find({category:req.query.category}).sort({ _id: -1 });
            res.status(200).json(categoryPost);
        }
        else{
            const post = await Post.find().sort({ _id: -1 });
            res.status(200).json(post);
        }
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
        const userPosts = await Post.find({ user: currentUser._id }).sort({ _id: -1 });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ user: friendId }).sort({ _id: -1 });
          })
        );
        res.status(200).json(userPosts.concat(...friendPosts));
      } catch (err) {
        res.status(500).json(err);
      }
}

export const getPostById = async (req,res)=>{
    try {
        const posts = await Post.find({user:req.params.id}).sort({ _id: -1 })
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

export const deletePost = async (req,res)=>{
    try {
        await Post.deleteOne({_id:req.params.id})
        await Saved.deleteOne({post:req.params.id})
        await Comment.deleteMany({post:req.params.id})
        res.status(200).json('Post Deleted Successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const editPost = async (req,res)=>{
    try {
        const post = await Post.findOne({_id:req.params.id})
        if(post){
            post.text = req.body.text || post.text
            post.tag = req.body.tag || post.tag
            post.img = req.body.img || post.img
            post.category = req.body.category || post.category
        }
        // const updateUser = await user.updateOne({$set:req.body});
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const sharePost = async (req,res)=>{
    try {
        const newPost = await new Share(req.body)
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getSharePost = async (req,res)=>{
    try {
        const posts = await Share.find({share:req.params.id}).sort({ _id: -1 })
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const savePost = async (req,res)=>{
    try {
        const newPost = await new Saved(req.body)
        await newPost.save()
        res.status(200).json(newPost)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getSavePost = async (req,res)=>{
    try {
        const posts = await Saved.find({saved:req.params.id}).sort({_id:-1})
        res.status(200).json(posts)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const deleteSavedPost = async (req,res)=>{
    try {
        await Saved.deleteOne({_id:req.params.id})
        res.status(200).json('Post Deleted Successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const reportPost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        const rep = post?.report+1
        await Post.findByIdAndUpdate(req.params.id,{report:rep, $push :{reportuser:req.body.currentUser}})
        // $push: { followers: req.body.user
        await User.findByIdAndUpdate(post?.user,{report:rep})
        // await Post.findByIdAndUpdate(req.params.id,{reportuser:post?.user})

        res.status(200).json("Reported Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getReportPost = async (req,res)=>{
    try {
        const post = await Post.findById(req.params.id)
        const rep = post?.report
        res.status(200).json(rep)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const addPostLike = async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post.vote.includes(req.body.userId)) {
        await post.updateOne({ $push: { vote: req.body.userId } });
        const voteCount = post?.count+1
        await post.updateOne({count:voteCount})
        res.status(200).json("The post has been liked");
      } else {
        await post.updateOne({ $pull: { vote: req.body.userId } });
        const voteCount = post?.count-1
        await post.updateOne({count:voteCount})
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}

export const getPostByCount = async (req,res)=>{
    try {
        const post = await Post.find(req.params.count)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getTopPost = async (req,res)=>{
    try {
        const allposts = await Post.find()
        let max = allposts?.reduce((voteCount, singlePost) => voteCount = voteCount > singlePost?.count ? voteCount : singlePost?.count, 0);
        const topPosts = await Post.find({count:max})
        res.status(200).json(topPosts)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getRecommendedPostOne = async (req,res)=>{
    try {
        const allposts = await Post.find()
        let max = allposts?.reduce((voteCount, singlePost) => voteCount = voteCount < singlePost?.count ? voteCount : singlePost?.count, 0);
        const topPosts = await Post.find({count:max})
        res.status(200).json(topPosts)
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getRecommendedPost = async (req,res)=>{
    const recommender = new ContentBasedRecommender({
        minScore: 0.1,
        maxSimilarDocuments: 100
      });
    try {
        const allPosts = await Post.find({user:id})
        const id=allPosts?._id
        recommender.train(allPosts);
        const similarDocuments = recommender.getSimilarDocuments(id, 0, 10);
        const currentUser = await User.findById(req.params.user);
        const userPosts = await Post.find({ user: currentUser._id }).sort({ _id: -1 });
        const friendPosts = await Promise.all(
          currentUser.followings.map((friendId) => {
            return Post.find({ user: friendId }).sort({ _id: -1 });
          })
        );
        res.status(200).json(userPosts.concat(...friendPosts));

        
        res.status(200).json(similarDocuments)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getWeeklyWinner = async (req,res)=>{
    try {
        var topPosts=[]
        const allPosts = await Post.find()
        let max = allPosts?.reduce((voteCount, singlePost) => voteCount = voteCount > singlePost?.count ? voteCount : singlePost?.count, 0);
        for (let i = 0; i < 10; i++){
            if(max-i>0){
                topPosts[i] = await Post.find({count:max-i})
            }
        }
        res.status(200).json(topPosts)
    } catch (error) {
        res.status(400).json(error.message)
    }
}

export const getPostByText = async (req,res)=>{
    try {
        const allposts = await Post.find({text:'google'})
        res.status(200).json(allposts)
    } catch (error) {
        res.status(500).json(error);
    }
}