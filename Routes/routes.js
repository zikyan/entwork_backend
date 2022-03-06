import express from "express";
import { getRequest, postRequest, updateRequest, deleteRequest } from "../controllers/postController.js";
import { registerUser, loginUser, getMe } from "../controllers/userController.js";
import {protect} from "../middleware/authMiddleware.js";

const route=express.Router();

// Post Controller Routes

route.get('/post/get', protect, getRequest);
route.post('/post/create', protect, postRequest);
route.put('/post/update/:id', protect, updateRequest);
route.delete('/post/delete/:id', protect, deleteRequest);
route.get('/me', protect, getMe);

// User Controller Routes

route.post('/user/register',registerUser);
route.post('/user/login',loginUser);

export default route;