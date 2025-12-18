
import Queue_model from "../models/queue.js";
import project_model from "../models/projects.js";
import Jobs_model from "../models/jobs.js";
import app_logger from "../utils/logger/App_logger.js";


export const DashBoardService = async()=>{
        
    try{

        const find_projects = await project_model.find();
        const find_queues = await Queue_model.find();
        const find_jobs = await Jobs_model.find();

        const find_jobs_completed = await Jobs_model.find({status :"completed"})
         
        app_logger.info(`Data Fetched successfully for the DashBoard from DashBoard Service`)
        
       return {
      totalProjects: find_projects.length,
      totalQueues: find_queues.length,
      totalJobs: find_jobs.length,
      totalJobsCompleted: find_jobs_completed.length
    };

        
    }
    catch(er){
        app_logger.info(`Error occured on DashBoardService  ${er}`)
         throw er;
    }
}