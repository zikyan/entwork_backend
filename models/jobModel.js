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
    category:{
        type:String,
    },
    img: {
        type: String,
    },
    report:{
        type: Number,
        default:0
    },
    reportuser:{
        type:Array,
        unique:true,
        default:[],
    },
    count:{
        type: Number,
        default:0
    },
    vote: {
        type: Array,
        default:[],
    }
},
    {timestamps:true}
);

const Job = mongoose.model('Job',JobSchema)

export default Job;