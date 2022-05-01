import Job from '../models/jobModel.js';

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