import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User'
    },
    text:{
        type:String,
    },
    img: {
        type: String,
      },
      likes: {
        type: Array,
        default: [],
      },
},
    {timestamps:true}
);

const Post = mongoose.model('Post',PostSchema)

export default Post;