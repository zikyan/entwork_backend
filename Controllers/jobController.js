import Job from '../models/jobModel.js';
import SavedJob from '../models/savedJob.js';

export const createJob = async (req,res)=>{
    try {
        const newJob = await new Job(req.body)
        await newJob.save()
        res.status(200).json(newJob)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getAllJob = async (req,res)=>{
    try {
        if(req.query.tag){
            const tagJobs = await Job.find({tag:req.query.tag});
            res.status(200).json(tagJobs);
        }
        else if(req.query.category){
            const categoryJobs = await Job.find({category:req.query.category});
            res.status(200).json(categoryJobs);
        }
        else{
            const jobs = await Job.find();
            res.status(200).json(jobs);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getJobByUser = async (req,res)=>{
    try {
        const jobs = await Job.find({user:req.params.id});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const saveJob = async (req,res)=>{
    try {
        const newJob = await new SavedJob(req.body)
        await newJob.save()
        res.status(200).json(newJob)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getSaveJob = async (req,res)=>{
    try {
        const jobs = await SavedJob.find({saved:req.params.id})
        res.status(200).json(jobs)
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const deleteSavedJob = async (req,res)=>{
    try {
        await SavedJob.deleteOne({_id:req.params.id})
        res.status(200).json('Job Deleted Successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteJob = async (req,res)=>{
    try {
        await Job.deleteOne({_id:req.params.id})
        await SavedJob.deleteOne({job:req.params.id})
        res.status(200).json('Job Deleted Successfully');
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getJobById = async (req,res)=>{
    try {
        const jobs = await Job.findOne({_id:req.params.id});
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json(error.message);
    }
}