import {Queue , Worker , QueueScheduler  } from 'bullmq'
import IORedis from 'ioredis'
import redis_logger from '../logger/redis_logger.js';

export const connection =  new IORedis(process.env.REDIS_URL || "redis://localhost:6379")

//store all queues in the map


const queueMap = new Map();


export function getOrCreateQueue(queueName){
    
    try{

    
    redis_logger.info(`Entered into getOrCreateQueue for queue ${queueName}`)
    if(queueMap.has(queueName)){
        
        redis_logger.info(`Queue Added successfully to the Queue map`)
        return queueMap.get(queueName);
    }

    const queue = new Queue(queueName , {connection});
     
    new QueueScheduler(queueName , {connection});

     redis_logger.info("BullMQ Queue Created:", queueName);


     createWorker(queueName);
     redis_logger.info(`Worker created for the queue ${queueName}`)
     queueMap.set(queueName , queue)


     return queue;


}
catch(er){
     redis_logger.info(`Error Occured while getting data from getOrCreateQueue..`)
}

}

function createWorker(queueName){
    
    redis_logger.info(`Entered into the createWorker function`)
    try{


        new Worker(queueName , async(job)=>{
            redis_logger.info(`Worker processing Job ${job.id} in Queue ${queueName}`)
            
            //simulate doing work

            await new Promise(resolve=>setTimeout(resolve , 2000))

            redis_logger.info(`Job ${job.id} Completed!`);

        return { success: true };
        },{connection})

        redis_logger.info(`Worker Started for the queue ${queueName}`)

    }
    catch(er){

    }
}
