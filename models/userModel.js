import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    report:{
      type:Number,
      default:0
    },
    warning:{
      type:Number,
      default:0
    },
    profilePicture: {
        type: String,
        default: "",
      },
      coverPicture: {
        type: String,
        default: "",
      },
      followers: {
        type: Array,
        default: [],
      },
      followings: {
        type: Array,
        default: [],
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      bio: {
        type: String,
        default:''
      },
      about: {
        type: String,
        default:''
      }
},
{timestamps:true}
)
const User = mongoose.model('User', UserSchema);

export default User;