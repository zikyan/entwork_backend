import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    text:{
        type:String,
    }
},
    {timestamps:true}
);

const Post = mongoose.model('Post',PostSchema)

export default Post;