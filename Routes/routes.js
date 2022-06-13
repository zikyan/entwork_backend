import express from "express";
import { getAllPost, updateRequest, deleteRequest, timelinePosts, getPostById, createPost, getPostByIdOne, getAllPostAdmin, deletePost, editPost, sharePost, getSharePost, savePost, getSavePost, deleteSavedPost } from "../controllers/postController.js";
import { registerUser, loginUser, getUserById, followUser, getUserByUsername, unfollowUser, editProfile, getAllUser } from "../controllers/userController.js";
import { postComment, getComment, getCommentByUsername, getAllComment } from "../controllers/commentController.js";
import { createJob, getAllJob, getJobByUser, saveJob, getSaveJob, deleteSavedJob, deleteJob, getJobById } from "../controllers/jobController.js";
import { postConversation, getConversation, postMessage, getMessage } from "../controllers/chatController.js";
import { tweetsData } from "../controllers/twitterController.js";
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
route.get('/post/getallpostadmin', getAllPostAdmin);
route.delete('/post/deletepost/:id', deletePost);
route.put('/post/editpost/:id', editPost);
route.post('/post/sharepost', sharePost);
route.get('/post/getsharepost/:id', getSharePost);
route.post('/post/savepost', savePost);
route.get('/post/getsavepost/:id', getSavePost);
route.delete('/post/deletesavedpost/:id', deleteSavedPost);

// User Controller Routes

route.post('/users/register',registerUser);
route.post('/users/login',loginUser);
route.put('/users/follow/:id', followUser);
route.put('/users/unfollow/:id', unfollowUser);
route.get('/users/getuserbyusername/:username', getUserByUsername);
route.put('/users/editprofile/:username', editProfile)
route.get('/users/getalluser', getAllUser);

// Job Controller Routes

route.post('/job/create', createJob);
route.get('/job/getalljob', getAllJob);
route.get('/job/getjobbyuser/:id', getJobByUser);
route.post('/job/savejob', saveJob);
route.get('/job/getsavejob/:id', getSaveJob);
route.delete('/job/deletesavedjob/:id', deleteSavedJob);
route.delete('/job/deletejob/:id', deleteJob);
route.get('/job/getjobbyid/:id', getJobById);

// Chat Conversation Controller Routes

route.post('/chat/postconversation', postConversation);
route.get('/chat/getconversation/:id', getConversation);

// Chat Message Controller Routes

route.post('/chat/postmessage', postMessage);
route.get('/chat/getmessage/:conversationId', getMessage);

// Comment Controller Routes

route.post('/post/postcomment', postComment);
route.get('/post/getcomment/:id', getComment);
route.get('/post/getcommentbyusername/:username', getCommentByUsername);
route.get('/post/getallcomment', getAllComment);


route.get('/twitter/get', tweetsData);


export default route;