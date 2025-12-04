import Queue_model from '../models/queue.js'
import Jobs_model from '../models/jobs.js'
import app_logger from '../utils/logger/App_logger.js'

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