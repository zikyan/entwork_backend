import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User',
    },
    post:{
        type:String,
        required:true,
        ref:'Post',
    },
    commentText:{
        type:String,
        required:true
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

const Comment = mongoose.model('Comment',CommentSchema)

export default Comment;