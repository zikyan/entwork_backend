import express from "express";
import { getAllPost, postRequest, updateRequest, deleteRequest, timelinePosts, getPostById, createPost, getPostByIdOne } from "../controllers/postController.js";
import { registerUser, loginUser, getUserById, followUser, getUserByUsername } from "../controllers/userController.js";
import {protect} from "../middleware/authMiddleware.js";

const route=express.Router();

// Post Controller Routes

route.get('/post/getallpost', getAllPost);
route.post('/post/create', createPost);
route.put('/post/update/:id', protect, updateRequest);
route.delete('/post/delete/:id', protect, deleteRequest);
// route.get('/post/delete/:id', getUserById);
route.get('/post/getuserbyid/:id', getUserById);
route.get('/post/timeline/:user', timelinePosts);
route.get('/post/getpostbyid/:id', getPostById);
route.get('/post/getpostbyidOne/:id', getPostByIdOne);

// User Controller Routes

route.post('/users/register',registerUser);
route.post('/users/login',loginUser);
route.put('/users/follow/:id', followUser);
route.get('/users/getuserbyusername/:username', getUserByUsername);

export default route;