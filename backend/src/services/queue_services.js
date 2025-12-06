import Queue_model from '../models/queue.js'
import Jobs_model from '../models/jobs.js'
import app_logger from '../utils/logger/App_logger.js'
import mongoose from 'mongoose'
import { truncate } from 'fs'

export const createQueueService = async(projectId , data)=>{
    app_logger.info(`Entered into createQueueService to create the Queue`)     
    try{

        const queue_name  = data.name;

        const find_queue = await Queue_model.findOne({name :queue_name , projectId : projectId})

        if(find_queue){
             throw new Error('Queue Already exists...')
        }


        const queue = await Queue_model.create({
             name :queue_name,
             projectId,
             concurrency : data.concurrency || 5,
             retryLimit : data.retryLimit || 3,
             rateLimit : data.rateLimit || null
        })



        getOrCreateQueue(data.name);
        app_logger.info(`Created the bullMq queue dynamically`)

        return queue;

         

    }
    catch(er){
        throw er
    }
}




export const GetQueueService = async(projectId)=>{
    
    app_logger.info(`Entered into the GetQueueService for projectID ${projectId}`)
    try{

        const projectId_new = new mongoose.Types.ObjectId(projectId);
          
        try{

        
        const Cached_Data  = await redisClient.get(`queue_${projectId_new}`)

        if(Cached_Data){
              app_logger.info(`Queues Data for this project is Fetched from the Cache`);
              return Cached_Data;
        }
    }
    catch(redisErr){
         app_logger.info("Redis cache error: " + redisErr.message)
    }


        const find_queues = await Queue_model.find({projectId : projectId_new})

          try{
        
                    await redisClient.setEx(`queue_${projectId_new}` , 3600 , JSON.stringify(find_queues) );
                    app_logger.info(`Queues for the project are added into the cache..`)
        
                }
                catch(redisErr){
                             app_logger.info("Redis cache error: " + redisErr.message)
        
                }

        return find_queues;

    }
    catch(er){
         throw er;
    }
}

export const getSpecificQueueDetailsService = async(queue_id)=>{
    
    app_logger.info(`Entering into the getSpecificQueueDetailService`)
    try{
        
        const queue_id_new = new mongoose.Types.ObjectId(queue_id)
        
         try{

        
        const Cached_Data  = await redisClient.get(`queue_id_${queue_id_new}`)

        if(Cached_Data){
              app_logger.info(`Queue Data for specific queue_id is  Fetched from the Cache`);
              return Cached_Data;
        }
    }
    catch(redisErr){
         app_logger.info("Redis cache error: " + redisErr.message)
    }

        const queue_data = await Queue_model.findOne({_id : queue_id_new});

        if(!queue_data){
            throw new Error(`queue not found` )
        }

         try{
        
                    await redisClient.setEx(`queue_id_${queue_id_new}` , 3600 , JSON.stringify(queue_data) );
                    app_logger.info(`Queues data for this queue id is added into the cache..`)
        
                }
                catch(redisErr){
                             app_logger.info("Redis cache error: " + redisErr.message)
        
                }

        return queue_data;

    }
    catch(er){
        throw er;
    }
}

export const DeleteQueueService = async(projectId , queue_id)=>{
    app_logger.info(`Entered into DeleteQueueService`) 
    try{

        const new_queue_id  = new mongoose.Types.ObjectId(queue_id);
         const projectId_new = new mongoose.Types.ObjectId(projectId)
        const find_queue = await Queue_model.findOne({ _id: new_queue_id, projectId:projectId_new })

        if(!find_queue){
            throw new Error(`Queue Not found`)
        }

        //delete the queue and all the jobs related to the queue
        
        await Jobs_model.deleteMany({queueId: new_queue_id});

        await Queue_model.findByIdAndDelete(new_queue_id);

        
        try {
            await redis_client.del(`queue_${projectId_new}`);
            app_logger.info("Cache deleted for the Queue");
        } catch (redisErr) {
            logger.warn("Redis invalidation error: " + redisErr.message);
        }   


    }
    catch(er){
        throw er
    }
}


export const updateQueueSettingsService= async(queueId , data)=>{
    
    try{
         
        
        const queue_id = new mongoose.Types.ObjectId(queueId);

          if (data.concurrency < 1) throw new Error("Concurrency must be >= 1");
        if (data.retryLimit < 0) throw new Error("Retry limit must be >= 0");


         try {
            await redis_client.del(`queue_id_${queue_id}`);
            app_logger.info("Cache deleted for the Queue");
        } catch (redisErr) {
            logger.warn("Redis invalidation error: " + redisErr.message);
        }   

        return  await Queue_model.findByIdAndUpdate(
             
            queue_id,
            {
                concurrency : data.concurrency,
                retryLimit:data.retryLimit,
                rateLimit : data.rateLimit,
                status : data.status
            },{
                new :true
            }
        )
         
      
        
    

    }

    catch(er){
         throw er;
    }
   
}