import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User'
    },
    text:{
        type:String,
        required:true,
    },
    tag:{
        type:Array,
        default:[],
    },
    category:{
        type:String,
    },
    img: {
        type: String,
    },
    up: {
        type: Array,
        default:[],
    },
    down: {
        type: Array,
        default:[],
    },
},
    {timestamps:true}
);

const Post = mongoose.model('Post',PostSchema)

export default Post;