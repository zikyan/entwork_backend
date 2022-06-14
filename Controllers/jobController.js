import Job from '../models/jobModel.js';
import SavedJob from '../models/savedJob.js';
import User from '../models/userModel.js';

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
            const tagJobs = await Job.find({tag:req.query.tag}).sort({ _id: -1 });
            res.status(200).json(tagJobs);
        }
        else if(req.query.category){
            const categoryJobs = await Job.find({category:req.query.category}).sort({ _id: -1 });
            res.status(200).json(categoryJobs);
        }
        else{
            const jobs = await Job.find().sort({ _id: -1 });
            res.status(200).json(jobs);
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
}

export const getJobByUser = async (req,res)=>{
    try {
        const jobs = await Job.find({user:req.params.id}).sort({ _id: -1 });
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
        const jobs = await SavedJob.find({saved:req.params.id}).sort({ _id: -1 })
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

export const editJob = async (req,res)=>{
    try {
        const job = await Job.findOne({_id:req.params.id})
        if(job){
            job.caption = req.body.caption || job.caption
            job.des = req.body.des || job.des
            job.tag = req.body.tag || job.tag
            job.category = req.body.category || job.category
        }
        // const updateUser = await user.updateOne({$set:req.body});
        await job.save()
        res.status(200).json(job)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const reportJob = async (req,res)=>{
    try {
        const job = await Job.findById(req.params.id)
        const rep = job?.report+1
        await Job.findByIdAndUpdate(req.params.id,{report:rep, $push :{reportuser:req.body.currentUser}})
        await User.findByIdAndUpdate(job?.user,{report:rep})
        res.status(200).json("Reported Successfully")
    } catch (error) {
        res.status(500).json(error)
    }
}

export const addJobLike = async (req, res) => {
    try {
      const job = await Job.findById(req.params.id);
      if (!job.vote.includes(req.body.userId)) {
        await job.updateOne({ $push: { vote: req.body.userId } });
        const voteCount = job?.count+1
        await job.updateOne({count:voteCount})
        res.status(200).json("The job has been liked");
      } else {
        await job.updateOne({ $pull: { vote: req.body.userId } });
        const voteCount = job?.count-1
        await job.updateOne({count:voteCount})
        res.status(200).json("The job has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
}