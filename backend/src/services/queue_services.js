import Queue_model from '../models/queue.js'
import Jobs_model from '../models/jobs.js'
import app_logger from '../utils/logger/App_logger.js'
import mongoose from 'mongoose'

export const createQueueService = async(projectId , data)=>{
    app_logger.info(`Entered into createQueueService to create the Queue`)     
    try{

        const queue_name  = data.name;

        const find_queue = await Queue_model.findOne({name :queue_name})

        if(find_queue){
             throw new Error('Queue Already exists...')
        }


        const queue = new Queue_model({
             name :queue_name,
             projectId,
             concurrency : data.concurrency || 5,
             retryLimit : data.retryLimit || 3,
             rateLimit : data.rateLimit || null
        })

        return await queue.save();

    }
    catch(er){
        throw er
    }
}




export const GetQueueService = async(projectId)=>{
    
    app_logger.info(`Entered into the GetQueueService for projectID ${projectId}`)
    try{

        const projectId_new = new mongoose.Types.ObjectId(projectId);

        const find_queues = await Queue_model.find({projectId : projectId_new})

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
        const queue_data = await Queue_model.findOne({_id : queue_id_new});

        if(!queue_data){
            throw new Error(`queue not found` )
        }

        return queue_data;

    }
    catch(er){
        throw er;
    }
}

export const DeleteQueueService = async(projectId , queue_id)=>{
      
    try{

        const new_queue_id  = new mongoose.Types.ObjectId(queue_id);

        //delete the queue and all the jobs related to the queue
        
        await Jobs_model.deleteMany({new_queue_id});

        await Queue_model.findByIdAndDelete({new_queue_id})




    }
    catch(er){
        throw er
    }
}