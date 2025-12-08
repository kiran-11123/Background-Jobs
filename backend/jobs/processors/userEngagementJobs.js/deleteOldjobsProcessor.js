import jobs_logger from "../../../src/utils/logger/jobs_logger.js";
import Jobs_model from "../../../src/models/jobs.js";
import mongoose from "mongoose";


export const DeleteOldJobs = async(queueId)=>{
      
    try{

        const queue_id =new mongoose.Types.ObjectId(queueId);
          
    //this will remove the jobs which are completed 30 days ago
        await Jobs_model.deleteMany({
            status:"completed",
             completedAt: { $lt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }


        })
      
        jobs_logger.info(`Jobs Deleted Successfully`)

          return {success:true  ,message : "Jobs Deleted Successfully."}



    }
    catch(er){
         jobs_logger.info(`Error while deleting the old jobs ${er}`)
    }
}