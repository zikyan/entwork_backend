import mongoose from "mongoose";

const FollowSchema = mongoose.Schema({
    first:{
        type:String,
        required:true
  },
    last:{
        type:String,
        required:true
  },
    username:{
        type:String,
        unique:true,
        required:true
    },
},
{timestamps:true}
)
const Follow = mongoose.model('Follow', FollowSchema);

export default Follow;