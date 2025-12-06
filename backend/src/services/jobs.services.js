import mongoose from "mongoose";
import Jobs_model from "../models/jobs.js";
import Queue_model from "../models/queue.js";
import app_logger from "../utils/logger/App_logger.js";
import { getOrCreateQueue } from "../utils/bullmq/queue.js";

export const CreateJobService = async(data)=>{
    app_logger.info(`Entered into CreateJobService.`)  
    try{

        const job  = await  Jobs_model.create({
             queueId : data.queueId,
             name :data.name ,
             payload : data.payload || {},
             delay : data.delay,
                priority: data.priority || 5,
        attemptsLimit: data.attemptsLimit || 3
        })

        const get_queue_name = await Queue_model.findById(data.queueId);

         const bullQueue = getOrCreateQueue(get_queue_name.name);
        await bullQueue.add(
            data.name,
            data.payload,
            {
                delay: data.delay || 0,
                priority: data.priority || 5,
                attempts: data.attemptsLimit || 3
            }
        );
         return job;


    }
    catch(er){ 
        throw er;
    }
}


export const GetJobsService = async(queueId)=>{
    
    app_logger.info(`Entered into GetJobsService`)
    try{

        const queue_id = new mongoose.Types.ObjectId(queueId)
        
        const find_jobs = await Jobs_model.find({
            queueId : queue_id
        })
        
        if(!find_jobs){
             throw new Error(`QueueId is wrong`)
        }
        return find_jobs;

    }
    catch(er){
         throw er;
    }
}


export const GetJobsServiceForId = async(queueId , jobId)=>{

    try{

        const new_queueId=  new mongoose.Types.ObjectId(queueId);
        const new_jobId = new mongoose.Types.ObjectId(jobId)

        const find_job = await Jobs_model.findOne({queueId : new_queueId , _id : new_jobId})

        if(!find_job){
            throw new Error(`Job Not found..`)
        }

        return find_job;

    }
    catch(er){
        throw er;
    }

}

export const  retryJobService = async(jobId)=>{

    app_logger.info(`Entered into retryJobService` )
      
    try{
         
        const new_jobId = new mongoose.Types.ObjectId(jobId)
        const find_job = await Jobs_model.findOne({_id :new_jobId })

        
    if (!job) throw new Error("Job not found");

    job.status = "waiting";
    job.attempts = 0;
    job.failedReason = null;

    return await job.save();

    }
    catch(er){
          
        throw er;
    }
}

export const UpdateJobService = async(jobId , data)=>{
     app_logger.info(`Entered into UpdateJobService`) 
    try{
        
          const new_jobId = new mongoose.Types.ObjectId(jobId)
        const find_job = await Jobs_model.findOne({_id :new_jobId })

        
    if (!job) throw new Error("Job not found");

         return await Job_model.findByIdAndUpdate(
        jobId,
        {
            priority: data.priority,
            delay: data.delay,
            payload: data.payload,
        },
        { new: true }
    );

    }
    catch(er){
        throw er;
    }
}

export const DeleteJobService = async(jobId)=>{
     app_logger.info(`Entered into DeleteJobService`)


     try{

        const new_job_id = new mongoose.Types.ObjectId(jobId);

        const find_job = await Jobs_model.findOne({_id : new_job_id});

        if(!find_job){
            throw new Error(`Job Not found`)
        }


     return await Job_model.findByIdAndDelete(new_job_id);


     }
     catch(er){
        throw er;
     }
}


export const JobCountSummaryService = async(queueId)=>{
     app_logger.info(`Entered into JobCountSummaryService`)

     try{

        const new_queue_id = new mongoose.Types.ObjectId;

        const find_queue = await Queue_model.findOne({_id : new_queue_id})

        if(!find_queue){
            throw new Error(`Queue not found`)
        }

       return {
        waiting: await Job_model.countDocuments({ queueId : new_queue_id, status: "waiting" }),
        delayed: await Job_model.countDocuments({ queueId : new_queue_id, status: "delayed" }),
        inProgress: await Job_model.countDocuments({ qqueueId : new_queue_id, status: "in-progress" }),
        completed: await Job_model.countDocuments({ queueId : new_queue_id, status: "completed" }),
        failed: await Job_model.countDocuments({ queueId : new_queue_id, status: "failed" })
    };
     }
     catch(er){
         
     }
}