import { CreateJobService , GetJobsService, GetJobsServiceForId } from "../services/jobs.services.js";
import app_logger from "../utils/logger/App_logger.js";


export const CreateJobcontroller = async(req,res)=>{
      
    app_logger.info(`Entered into  CreateJobService`);

    try{

        const data = req.body.data;

        const Create_Job = await CreateJobService(data);

        return res.status(200).json({
            message : "Job created Successfully.."
        })

    }
    catch(er){

        app_logger.info(`Error while Creating the job ${er}`)
        return res.status(500).json({
            message : "Internal Server Error...",
            error :er
        })
    }
}

export const GetJobsContoller = async(req,res)=>{
     app_logger.info(`Entered into GetJobsContoller`) 
    try{

        const queueId = req.body.queueId;

        const data= await GetJobsService(queueId);

        return res.status(200).json({
            message : "Jobs Feteched successfully",
            job_data : data
        })

    }
    catch(er){
        
        app_logger.info(`Error while getting all jobs ${er}`)

        if(err.message ==='QueueId is wrong'){
             return res.status(400).json({
                message : "QueueId is wrong"
             })
        }
         return res.status(500).json({
            message : "Internal Server Error...",
            error:er
         })
    }
}


export const GetJobsContollerForId = async(req,res)=>{
    
    app_logger.info(`Entered into the GETJobsContollerForId`)
    try{

        const queueId = req.body.queueId;
        const jobId = req.body.jobId;

        const data = await GetJobsContollerForId(queueId , jobId);

        return res.status(200).json({
            message : "Job Fetched successfully",
            job_data : data
        })

    }
    catch(er){

        if(er.message === 'Job Not found..'){
            return res.status(400).json({
                message : 'Job Not found'
            })
        }

       return res.status(500).json({
            message : "Internal Server Error...",
            error:er
         })
         
    }
}