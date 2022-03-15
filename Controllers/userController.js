import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import User from "../models/userModel.js";


export const registerUser = async (req,res)=>{
    const {username, email, password}=req.body;
    try {
        if(!username || !email || !password){
            res.status(400).send("Please enter all fields");
        }

        // Check if User exists already

        const userExists = await User.findOne({email});
        if(userExists){
            res.status(400).send("User already exists");
        }

        // Hashing Password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        // Create User

        const newUser = await new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        if(newUser){
            res.status(201).json({
                _id: newUser.id,
                username: newUser.username,
                email: newUser.email,
                token: generateToken(newUser._id)
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
                username: user.username,
                email: user.email,
                token: generateToken(user._id)
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
        const user = await User.findById(req.params.user);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json('Error : ',error.message);
    }
}

export const getMe = (req, res) => {
    res.status(200).json("Protected Route Displayed");
}

const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn:'30d',
    })
}