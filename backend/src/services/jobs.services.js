import mongoose, { mongo } from "mongoose";
import Jobs_model from "../models/jobs.js";
import Queue_model from "../models/queue.js";
import app_logger from "../utils/logger/App_logger.js";
import { getOrCreateQueue } from "../utils/bullmq/queue.js";
import redisClient from "../utils/redis/redis-client.js";

export const CreateJobService = async(data)=>{
    app_logger.info(`Entered into CreateJobService.`)  
    try{

        const queue_id =new mongoose.Types.ObjectId(data.queueId);

        const job  = await  Jobs_model.create({
             queueId : queue_id,
             name :data.name,
             type:data.type,
             status : data.status || "waiting",
             payload : data.payload.job.data || {},
             delay : data.delay || 0,
                priority: data.priority || 5,
        attemptsLimit: data.attemptsLimit || 3
        })

        const get_queue_name = await Queue_model.findById(queue_id);

         const bullQueue = getOrCreateQueue(get_queue_name.name);
       await bullQueue.add(
    data.name,                     // Job name
    {                              // Job data (this is what the worker receives as job.data)
        dbJobId: job._id,   
        type: data.type,       // MongoDB job reference
        payload: data.payload || {} // Actual payload
    },
    {
        starttsAt: Date.now() + (data.delay || 0), // Delay in milliseconds
        status: "waiting",
        delay: data.delay || 0,
        priority: data.priority || 5,
        attempts: data.attemptsLimit || 3
    }
);

 try {
            await redisClient.del(`Jobs_${queue_id}`);
            app_logger.info(`Cache deleted for jobs Jobs_${queue_id}`);
        } catch (redisErr) {
            app_logger.warn(`Redis invalidation error for user : ${redisErr.message}`);
        }


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

     /*   const Cached_Data  = await redisClient.get(`Jobs_${queue_id}`)
    try{
        if(Cached_Data){
              app_logger.info(`Jobs Data Fetched from the Cache`);
              return JSON.parse(Cached_Data);
        }
    }

    catch(redisErr){
         app_logger.info("Redis cache error: " + redisErr.message)
    }   */
    try {
            await redisClient.del(`Jobs_${queue_id}`);
            app_logger.info(`Cache deleted for jobs Jobs_${queue_id}`);
        } catch (redisErr) {
            app_logger.warn(`Redis invalidation error for user : ${redisErr.message}`);
        }
        const find_jobs = await Jobs_model.find({
            queueId : queue_id
        })
        
        if(!find_jobs){
             throw new Error(`QueueId is wrong`)
        }

        
        try{

            await redisClient.setEx(`Jobs_${queue_id}` , 100 , JSON.stringify(find_jobs) );
            app_logger.info(`jobs are added into the cache..`)

        }
        catch(redisErr){
                     app_logger.info("Redis cache error: " + redisErr.message)

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

export const UpdateJobService = async(jobId , queue_id , data)=>{
     app_logger.info(`Entered into UpdateJobService`) 
    try{
         
        const new_queue_id = new mongoose.Types.ObjectId(queue_id)
          const new_jobId = new mongoose.Types.ObjectId(jobId)
        const find_job = await Jobs_model.findOne({_id :new_jobId })

        
    if (!job) throw new Error("Job not found");

     try {
            await redisClient.del(`Jobs_${new_queue_id}`);
            app_logger.info(`Cache deleted for jobs Jobs_${new_queue_id}`);
        } catch (redisErr) {
            app_logger.warn(`Redis invalidation error for user : ${redisErr.message}`);
        }

         return await Jobs_model.findByIdAndUpdate(
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

export const DeleteJobService = async(jobId , queue_id)=>{
     app_logger.info(`Entered into DeleteJobService`)


     try{
            const new_queue_id = new mongoose.Types.ObjectId(queue_id)
        const new_job_id = new mongoose.Types.ObjectId(jobId);

        const find_job = await Jobs_model.findOne({_id : new_job_id});

        if(!find_job){
            throw new Error(`Job Not found`)
        }


         try {
            await redisClient.del(`Jobs_${new_queue_id}`);
            app_logger.info(`Cache deleted for jobs Jobs_${new_queue_id}`);
        } catch (redisErr) {
            app_logger.warn(`Redis invalidation error for user : ${redisErr.message}`);
        }

        

    
     return await Jobs_model.findByIdAndDelete(new_job_id);


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
        waiting: await Jobs_model.countDocuments({ queueId : new_queue_id, status: "waiting" }),
        delayed: await Jobs_model.countDocuments({ queueId : new_queue_id, status: "delayed" }),
        inProgress: await Jobs_model.countDocuments({ queueId : new_queue_id, status: "in-progress" }),
        completed: await Jobs_model.countDocuments({ queueId : new_queue_id, status: "completed" }),
        failed: await Jobs_model.countDocuments({ queueId : new_queue_id, status: "failed" })
    };
     }
     catch(er){
         
     }
}