import express from "express";
import { getAllPost, postRequest, updateRequest, deleteRequest } from "../controllers/postController.js";
import { registerUser, loginUser, getMe, getUserById } from "../controllers/userController.js";
import {protect} from "../middleware/authMiddleware.js";

const route=express.Router();

// Post Controller Routes

route.get('/post/getallpost', getAllPost);
route.post('/post/create', protect, postRequest);
route.put('/post/update/:id', protect, updateRequest);
route.delete('/post/delete/:id', protect, deleteRequest);
route.get('/me', protect, getMe);
route.get('/post/delete/:id', getUserById);

// User Controller Routes

route.post('/users/register',registerUser);
route.post('/users/login',loginUser);

export default route;