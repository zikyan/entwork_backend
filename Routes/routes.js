import express from "express";
import { getAllPost, updateRequest, deleteRequest, timelinePosts, getPostById, createPost, getPostByIdOne, deletePost, editPost, sharePost, getSharePost, savePost, getSavePost, deleteSavedPost, reportPost, getReportPost, addPostLike, getPostByCount, getTopPost, getRecommendedPost, getWeeklyWinner, getPostByText, getRecommendedPostOne } from "../controllers/postController.js";
import { registerUser, loginUser, getUserById, followUser, getUserByUsername, unfollowUser, editProfile, getAllUser } from "../controllers/userController.js";
import { postComment, getComment, getCommentByUsername, getAllComment, reportComment, getCommentByPostId, addCommentLike, getTopComment } from "../controllers/commentController.js";
import { createJob, getAllJob, getJobByUser, saveJob, getSaveJob, deleteSavedJob, deleteJob, getJobById, editJob, reportJob, addJobLike, getThreeJob, getJobByIdSaved } from "../controllers/jobController.js";
import { postConversation, getConversation, postMessage, getMessage, getAllConversation } from "../controllers/chatController.js";
import { deleteUser, deleteComment, getAllJobAdmin, getAllPostAdmin, userWarning } from "../controllers/adminController.js";
import { tweetsData } from "../controllers/twitterController.js";
import {protect} from "../middleware/authMiddleware.js";
import { getSearch } from "../controllers/SearchBarController.js";

const route=express.Router();

// Post Controller Routes

route.get('/', getSearch);

route.get('/post/getallpost', getAllPost);
route.post('/post/create', createPost);
route.put('/post/update/:id', protect, updateRequest);
route.delete('/post/delete/:id', protect, deleteRequest);
// route.get('/post/delete/:id', getUserById);
route.get('/post/getuserbyid/:id', getUserById);
route.get('/post/timeline/:user', timelinePosts);
route.get('/post/getpostbyid/:id', getPostById);
route.get('/post/getpostbyidOne/:id', getPostByIdOne);
route.get('/post/getpostbytext', getPostByText);

route.delete('/post/deletepost/:id', deletePost);
route.put('/post/editpost/:id', editPost);
route.post('/post/sharepost', sharePost);
route.get('/post/getsharepost/:id', getSharePost);
route.post('/post/savepost', savePost);
route.get('/post/getsavepost/:id', getSavePost);
route.delete('/post/deletesavedpost/:id', deleteSavedPost);

route.put('/post/reportpost/:id', reportPost)
route.get('/post/getreportpost/:id', getReportPost)

route.put('/post/addpostlike/:id', addPostLike)

route.get('/post/getpostbycount/:count', getPostByCount);
route.get('/post/gettoppost', getTopPost);
route.get('/post/getrecommendedpost/:id', getRecommendedPost);
route.get('/post/getWeeklyWinner', getWeeklyWinner);
route.get('/post/getrecommendedpostone', getRecommendedPostOne);

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
route.get('/job/getjobbyid/:id', getJobByIdSaved);
route.put('/job/editjob/:id', editJob);
route.put('/job/reportjob/:id', reportJob)
route.put('/job/addjoblike/:id', addJobLike)
route.get('/job/getthreejob', getThreeJob);

// Chat Conversation Controller Routes

route.post('/chat/postconversation', postConversation);
route.get('/chat/getconversation/:id', getConversation);
route.get('/chat/getallconversation', getAllConversation);

// Chat Message Controller Routes

route.post('/chat/postmessage', postMessage);
route.get('/chat/getmessage/:conversationId', getMessage);

// Comment Controller Routes

route.post('/post/postcomment', postComment);
route.get('/post/getcomment/:id', getComment);
route.get('/post/getcommentbyusername/:username', getCommentByUsername);
route.get('/post/getallcomment', getAllComment)
route.put('/post/reportcomment/:id', reportComment)
route.get('/post/getcommentbypostid/:id', getCommentByPostId);
route.put('/post/addcommentlike/:id', addCommentLike)
route.get('/post/gettopcomment', getTopComment);

// Twitter Route

route.get('/twitter/get', tweetsData);

// Admin routes

route.delete('/admin/deleteuser/:id', deleteUser);
route.get('/post/getallpostadmin', getAllPostAdmin);
route.get('/job/getalljobadmin', getAllJobAdmin);
route.delete('/post/deletecomment/:id', deleteComment);
route.put('/user/userwarning/:id', userWarning)

export default route;