import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protect = async (req, res, next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Get the token from the header

            token = req.headers.authorization.split(' ')[1];

            // Verify the token

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token, bcz it has the user in its payload

            req.user= await User.findById(decoded.id).select('-password');

            next();

        } catch (error) {
            res.status(400).json("Not Authorized");
        }
    }
    if(!token){
        res.status(400).json("No Token");
    }
}