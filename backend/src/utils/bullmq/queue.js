import {Queue , Worker   } from 'bullmq'
import IORedis from 'ioredis'
import redis_logger from '../logger/redis_logger.js';
import Jobs_model from '../../models/jobs.js';
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

const jobProcessors = {
     sendEmail : async(payload)=>{
           
        if(!payload.to){
             throw new Error(`No recipient email provided`)
        }
        redis_logger.info(`Sending Email to ${to} account`)

        return true;
     },

     SendReports :async(payload)=>{

          if (!payload.userId) throw new Error("No userId for report");
    
    redis_logger.info("Generating report for user:", payload.userId);
    return true;

     }
}

function createWorker(queueName){
    
    redis_logger.info(`Entered into the createWorker function`)
    try{


        new Worker(queueName , async(job)=>{
            redis_logger.info(`Worker processing Job ${job.id} in Queue ${queueName}`)
            
            //simulate doing work

             const dbJob = await Jobs_model.findById(job.data.dbJobId);

             if(!dbJob){
                return ;
             }


             try{

             
                if (dbJob) {
                    dbJob.status = "in-progress";
                    await dbJob.save();
                }

                const { type, payload } = job.data;

               if (!jobProcessors[type]) {
          throw new Error(`No processor defined for job type: ${type}`);
        }

           await jobProcessors[type](payload);

        dbJob.status = "completed";
        dbJob.progress = 100;
        await dbJob.save();

                redis_logger.info(`Job ${job.id} Completed!`);

        return { success: true };

    }
    catch(er){

        redis_logger.info(`Error occured in the job Processing rescheduling the job`)
         dbJob.attempts += 1;
        dbJob.failedReason = err.message;

        if (dbJob.attempts < dbJob.attemptsLimit) {
          dbJob.status = "waiting"; // reschedule
          await dbJob.save();

          await job.queue.add(
            job.name,
            job.data,
            { delay: 5000, attempts: dbJob.attemptsLimit - dbJob.attempts }
          );
        } else {
          dbJob.status = "failed";
          await dbJob.save();
        }

        throw err;
    }
        
        },{connection})

        redis_logger.info(`Worker Started for the queue ${queueName}`)
    }
   
    
    catch(er){
          redis_logger.info(`Error Occured for Worker job ${er}`)
    }
}
