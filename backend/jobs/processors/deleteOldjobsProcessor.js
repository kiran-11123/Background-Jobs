import jobs_logger from "../../src/utils/logger/jobs_logger.js";
import Jobs_model from "../../src/models/jobs.js";
import mongoose from "mongoose";


export const DeleteOldJobs = async(payload)=>{
      
    try{
        console.log("Deleting old jobs for queueId: " + payload.job.data.queueId + " older than " + payload.job.data.days + " days.");

         const days_new = Number(payload.job.data.days);
    if (isNaN(days_new) || days_new  <= 0) {
      throw new Error("Invalid number of days");
    }

        const queue_id =new mongoose.Types.ObjectId(payload.job.data.queueId);
        console.log("queue id in delete old jobs processor " + queue_id);
        
        console.log("Deleting jobs older than " + days_new + " days for queue " + payload.job.data.queueId);
          
    //this will remove the jobs which are completed 30 days ago
        await Jobs_model.deleteMany({
            queueId:queue_id,
            status:"completed",
             completedAt: { $lt: new Date(Date.now() - (days_new) * 24 * 60 * 60 * 1000) }


        })
      
        jobs_logger.info(`Jobs Deleted Successfully`)

          return {success:true  ,message : "Jobs Deleted Successfully."}



    }
    catch(er){
         jobs_logger.info(`Error while deleting the old jobs ${er}`)
    }
}