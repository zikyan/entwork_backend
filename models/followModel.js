import mongoose from "mongoose";

const FollowSchema = mongoose.Schema({
    user:{
        type:String,
        unique:true,
        required:true
  },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
},
{timestamps:true}
)
const Follow = mongoose.model('Follow', FollowSchema);

export default Follow;