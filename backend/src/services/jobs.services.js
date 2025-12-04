import mongoose from "mongoose";
import Jobs_model from "../models/jobs.js";
import Queue_model from "../models/queue.js";
import app_logger from "../utils/logger/App_logger.js";


export const CreateJobService = async(data)=>{
    app_logger.info(`Entered into CreateJobService.`)  
    try{

        const job  = new Jobs_model({
             queueId : data.queueId,
             name :data.name ,
             payload : data.payload || {},
             delay : data.delay,
                priority: data.priority || 5,
        attemptsLimit: data.attemptsLimit || 3
        })

        return await job.save();

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