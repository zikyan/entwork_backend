import express from "express";
import { getAllPost, postRequest, updateRequest, deleteRequest, timelinePosts, getPostById, createPost, getPostByIdOne } from "../controllers/postController.js";
import { registerUser, loginUser, getUserById, followUser, getUserByUsername, unfollowUser, editProfile } from "../controllers/userController.js";
import { postComment, getComment } from "../controllers/commentController.js";
import { createJob, getAllJob } from "../controllers/jobController.js";
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
route.post('/post/postcomment', postComment);
route.get('/post/getcomment/:id', getComment);

// User Controller Routes

route.post('/users/register',registerUser);
route.post('/users/login',loginUser);
route.put('/users/follow/:id', followUser);
route.put('/users/unfollow/:id', unfollowUser);
route.get('/users/getuserbyusername/:username', getUserByUsername);
route.put('/users/editprofile/:username', editProfile)

// Job Controller Routes

route.post('/job/create', createJob);
route.get('/job/getalljob', getAllJob);

export default route;