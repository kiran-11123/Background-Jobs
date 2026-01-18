import {Queue , Worker   } from 'bullmq'
import IORedis from 'ioredis'
import redis_logger from '../logger/redis_logger.js';
import Jobs_model from '../../models/jobs.js';
import { jobProcessors } from '../../../jobs/processors.js';
import {emitJobUpdate}  from '../websocket.js';


export const connection =  new IORedis(process.env.REDIS_URL || "redis://localhost:6379", { maxRetriesPerRequest: null})

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

export const deleteBullQueue = async (queueName) => {
  const queue = new Queue(queueName, {
    connection: redisConnection,
  });

  try {
    await queue.pause();
    await queue.obliterate({ force: true });
  } finally {
    await queue.close();
  }
};




function createWorker(queueName) {
  redis_logger.info(`Entered into createWorker for queue: ${queueName}`);

  try {
    new Worker(
      queueName,
      async (job) => {
        redis_logger.info(`Worker started processing Job ${job.id}`);

        const dbJob = await Jobs_model.findById(job.data.dbJobId);

        if (!dbJob) {
                    redis_logger.error(`DB Job not found for jobId: ${job.data.dbJobId}`);

          throw new Error(`DB Job not found for jobId: ${job.data.dbJobId}`);
        }

    try {
  // Mark job in-progress
  dbJob.status = "in-progress";
  dbJob.startedAt = new Date();
  dbJob.progress = 0;

  // Update attempts made so far
  dbJob.attempts = job.attemptsMade + 1; // current attempt
  await dbJob.save();

  redis_logger.info(`Job ${job.id} marked as in-progress in DB`);

  // Run actual job logic
  const { type, payload } = job.data;
  if (!jobProcessors[type]) {
    throw new Error(`No processor defined for job type: ${type}`);
  }

  const result = await jobProcessors[type](payload);

  if (!result?.success) {
    throw new Error(result?.message || "Job failed");
  }

  // Update progress and mark completed
  dbJob.progress = 100;
  dbJob.status = "completed";
  dbJob.completedAt = new Date();
  dbJob.attempts = job.attemptsMade + 1; // final attempt
  await dbJob.save();

  redis_logger.info(`Job ${job.id} completed successfully`);
  return result;

} catch (err) {
  // Mark failed
  dbJob.status = "failed";
  dbJob.failedReason = err.message;
  dbJob.attempts = job.attemptsMade + 1; // failed attempt
  await dbJob.save();

  redis_logger.error(`Job ${job.id} failed: ${err.message}`);
  throw err; // Let BullMQ handle retries
}

      },
      { connection,
      attempts: 3,
      backoff: {
        type: "exponential",
        delay: 5000,
      }, }
    );

    redis_logger.info(`Worker started for queue: ${queueName}`);
  } catch (er) {
    redis_logger.error(`Error starting worker for queue ${queueName}: ${er.message}`);
  }
}
