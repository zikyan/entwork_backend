import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import User from "../models/userModel.js";
import Follow from "../models/followModel.js";


export const registerUser = async (req,res)=>{
    const {first, last, username, email, password}=req.body;
    try {
        if(!first || !last || !username || !email || !password){
            res.status(400).send("Please enter all fields");
        }

        // Check if User exists already

        const userExists = await User.findOne({email});
        const usernameExists = await User.findOne({username});
        if(userExists){
            res.status(400).send("User already exists");
        }
        if(usernameExists){
            res.status(400).send("User already exists");
        }

        // Hashing Password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create User

        const newUser = await new User({
            first,
            last,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        if(newUser){
            res.status(201).json({
                _id: newUser.id,
                first: newUser.first,
                last: newUser.last,
                username: newUser.username,
                email: newUser.email,
                token: generateToken(newUser._id),
                followings: newUser.followings,
                followers: newUser.followers,
                profilePicture: newUser.profilePicture,
                coverPicture: newUser.coverPicture,
                isAdmin: newUser.isAdmin,
                bio: newUser.bio,
                about: newUser.about,
                report: newUser.report,
                warning: newUser.warning
            });
        }else{
            res.status(400).send("Invalid Data");
        }

    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const loginUser = async (req,res) =>{
    const {email, password}=req.body;
    try {
        const user = await User.findOne({email});
        if(user && await bcrypt.compare(password, user.password)){
            res.status(201).json({
                _id: user.id,
                first: user.first,
                last: user.last,
                username: user.username,
                email: user.email,
                token: generateToken(user._id),
                followings: user.followings,
                followers: user.followers,
                profilePicture: user.profilePicture,
                coverPicture: user.coverPicture,
                isAdmin: user.isAdmin,
                bio: user.bio,
                about: user.about,
                report: user.report,
                warning: user.warning
            });
        }else{
            res.status(400).send("Wrong Credentials");
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getUserById = async (req,res)=>{
    try {
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const followUser = async (req,res)=>{
    if (req.body.user !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.user);
          if (!user.followers.includes(req.body.user)) {
            await user.updateOne({ $push: { followers: req.body.user } });
            await currentUser.updateOne({ $push: { followings: req.params.id } });
            res.status(200).json("User Has Been Followed");
          } else {
            res.status(403).json("You Already Follow This User");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You Can't Follow Yourself");
      }
}

export const unfollowUser = async (req,res)=>{
    if (req.body.user !== req.params.id) {
        try {
          const user = await User.findById(req.params.id);
          const currentUser = await User.findById(req.body.user);
          if (user.followers.includes(req.body.user)) {
            await user.updateOne({ $pull: { followers: req.body.user } });
            await currentUser.updateOne({ $pull: { followings: req.params.id } });
            res.status(200).json("User Has Been Unfollowed");
          } else {
            res.status(403).json("You Dont Follow This User");
          }
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You Cant Unfollow Yourself");
      }
}

export const getUserByUsername = async (req,res)=>{
    try {
        const user = await User.findOne({username:req.params.username})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d',
    })
}

export const editProfile = async (req,res)=>{
    try {
        const user = await User.findOne({username:req.params.username})
        if(user){
            user.first = req.body.first || user.first
            user.last = req.body.last || user.last
            user.bio = req.body.bio || user.bio
            user.about = req.body.about || user.about
            user.profilePicture = req.body.profilePicture || user.profilePicture
            user.coverPicture = req.body.coverPicture || user.coverPicture
        }
        // const updateUser = await user.updateOne({$set:req.body});
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllUser = async (req,res)=>{
    try {
        const user = await User.find().sort({ _id: -1 })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const followUserOne = async (req,res)=>{
    if (req.body.user !== req.params.id) {
        try {
            const find = await Follow.find()
            var check1 = 0
            var check2 = 0
            find?.map((item)=>{
                if (item?.user.includes(req.params.id)){
                    check1=1
                }
                else if (item?.user.includes(req.body.user)){
                    check2=2
                }
            })
            if(check2===0){
                const newUser = await new Follow({
                    user:req.body.user,
                    // followings: req.params.id
                })
                await newUser.save()
            }
            else if(check1===0){
                const newUser = await new Follow({
                    user:req.params.id,
                    // followers: req.body.user
                })
                await newUser.save()
            }
            
                const user = await Follow.findOne({user:req.params.id});
             
                const currentUser = await Follow.findOne({user:req.body.user});

        
                
                if (user?.followers.includes(req.body.user)) {
                    res.status(403).json("You Already Follow This User");
                } else {
                    
                    await user.updateOne({ $push: { followers: req.body.user } });
                    await currentUser.updateOne({ $push: { followings: req.params.id } });
                    res.status(200).json("User Has Been Followed");
                }
            

                
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You Can't Follow Yourself");
      }
}

export const unFollowUserOne = async (req,res)=>{
    if (req.body.user !== req.params.id) {
        try {
            const find = await Follow.find()
            var check1 = 0
            var check2 = 0
            find?.map((item)=>{
                if (item?.user.includes(req.params.id)){
                    check1=1
                }
                else if (item?.user.includes(req.body.user)){
                    check2=2
                }
            })
            if(check2===0){
                const newUser = await new Follow({
                    user:req.body.user,
                    followings: req.params.id
                })
                await newUser.save()
            }
            else if(check1===0){
                const newUser = await new Follow({
                    user:req.params.id,
                    followers: req.body.user
                })
                await newUser.save()
            }
                const user = await Follow.findOne({user:req.params.id});
           
                const currentUser = await Follow.findOne({user:req.body.user});

                if (!user?.followers.includes(req.body.user)) {
                    res.status(403).json("You Already Follow This User");
                    
                } else {
                    
                    await user.updateOne({ $pull: { followers: req.body.user } });
                    await currentUser.updateOne({ $pull: { followings: req.params.id } });
                    res.status(200).json("User Has Been Followed");
                }
            

                
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You Can't Follow Yourself");
      }
}

// export const unfollowUserOne = async (req,res)=>{
//     if (req.body.user !== req.params.id) {
//         try {
//           const user = await User.findById(req.params.id);
//           const currentUser = await User.findById(req.body.user);
//           if (user.followers.includes(req.body.user)) {
//             await user.updateOne({ $pull: { followers: req.body.user } });
//             await currentUser.updateOne({ $pull: { followings: req.params.id } });
//             res.status(200).json("User Has Been Unfollowed");
//           } else {
//             res.status(403).json("You Dont Follow This User");
//           }
//         } catch (err) {
//           res.status(500).json(err);
//         }
//       } else {
//         res.status(403).json("You Cant Unfollow Yourself");
//       }
// }

export const checkFollow = async (req,res)=>{
    try {
        const user = await Follow.findOne({user:req.params.id})
        res.status(200).json(user)
        
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUserByFollow = async (req,res)=>{
    try {
        const user = await Follow.findOne({user:req.params.id})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getUserByFollowFriend = async (req,res)=>{
    try {
        const user = await Follow.findOne({user:req.params.id})
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}