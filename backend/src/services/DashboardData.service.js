
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
        return (find_projects , find_queues , find_jobs , find_jobs_completed);

        
    }
    catch(er){
        app_logger.info(`Error occured on DashBoardService  ${er}`)
         throw er;
    }
}