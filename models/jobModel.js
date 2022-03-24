import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        ref:'User',
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
    img: {
        type: String,
    },
},
    {timestamps:true}
);

const Job = mongoose.model('Job',JobSchema)

export default Job;