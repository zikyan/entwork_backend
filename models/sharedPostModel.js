import mongoose from "mongoose";

const ShareSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User'
    },
    share:{
        type:String,
        required:true,
    },
    post:{
        type:String,
        unique:true,
        required:true,
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

const Share = mongoose.model('Share',ShareSchema)

export default Share;