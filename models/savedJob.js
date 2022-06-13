import mongoose from "mongoose";

const SavedJobSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User',
    },
    saved:{
        type:String,
        required:true,
    },
    job:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    des:{
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
},
    {timestamps:true}
);

const SavedJob = mongoose.model('SavedJob',SavedJobSchema)

export default SavedJob;