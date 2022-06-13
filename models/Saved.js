import mongoose from "mongoose";

const SavedSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User'
    },
    saved:{
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

const Saved = mongoose.model('Saved',SavedSchema)

export default Saved;