import express from "express";
import { getRequest } from "../Controllers/postController.js";

const route=express.Router();

route.get('/',getRequest);

route.post('/',(req,res)=>{
    res.status(200).json({message:'post request'});
});

route.put('/:id',(req,res)=>{
    res.status(200).json({message:`update ${req.params.id}`});
});

route.delete('/:id',(req,res)=>{
    res.status(200).json({message:`delete ${req.params.id}`});
});


export default route;