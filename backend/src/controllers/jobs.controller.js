import { CreateJobService , GetJobsService, 
    GetJobsServiceForId , retryJobService 
     ,UpdateJobService , DeleteJobService
     ,JobCountSummaryService
    } from "../services/jobs.services.js";
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

        const queueId = req.query.queueId;

        const data= await GetJobsService(queueId);

        return res.status(200).json({
            message : "Jobs Feteched successfully",
            jobs : data
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

        const data = await GetJobsServiceForId(queueId , jobId);
         
        app_logger.info(`Job Details feteched successfully`)
        return res.status(200).json({
            message : "Job Fetched successfully",
            job_data : data
        })

    }
    catch(er){
         
        app_logger.info(`Error occured while fetching the job ${er}`)
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
export const retryJobController = async(req,res)=>{
    
    app_logger.info(`Entered into retryJobController`)
    try{
          
        const jobId =req.body.jobId;

        const data  = await retryJobService(jobId);
        
        app_logger.info("Retrying the Job")
        return res.status(200).json({
            message :"Retrying the job"
        })

    }
    catch(er){
        app_logger.info(`Error occured while retrying the job..`)

        if(er.message === 'Job not found'){
             return res.status(400).json({
                 message : "Job not found"
             })
        }

        return res.status(500).json({
            message : "Internal Server Error..",
            error:er
        })
         
    }
}

export const UpdateJobContoller = async(req,res)=>{
    app_logger.info(`Entered into UpdateJobController`)

    try{

        const data  =req.body.data;
        const jobId = req.body.jobId;

        const update_job =await UpdateJobService(jobId , data);
        
        app_logger.info(`Job updated successfully...`)
        return res.status(200).json({
            message : "Job Updated Successfully.."
        })


    }
    catch(er){
          
                app_logger.info(`Error occured while updating the job..`)

         if(er.message === 'Job not found'){
             return res.status(400).json({
                 message : "Job not found"
             })
        }

        return res.status(500).json({
            message : "Internal Server Error..",
            error:er
        })

    }
}

export const DeleteJobController = async(req,res)=>{
    app_logger.info(`Entered into DeleteJobController`)
    try{

        const jobId= req.body.jobId;

        const Delete =await DeleteJobService(jobId);
        
        app_logger.info(`Job Deleted Successfully`)
        return res.status(200).json({
            message : "Job Deleted Successfully.."
        })

    }
    catch(er){

        app_logger.info(`Error occured while deleting the job ${er}`)

        if(er.message === 'Job Not found'){
            return res.status(400).json({
                message : "Job Not found"
            })
        }


        return res.status(500).json({
            message : 'Internal Server Error..',
            error:er
        })

    }
}

export const JobCountSummaryController = async (req, res) => {
    app_logger.info(`Entered into JobCountSummaryController`)
  try {
    const { queueId } = req.body.queueId;

    const jobCounts = await JobCountSummaryService(queueId);
     
    app_logger.info(`Data returned successully.`)
    return res.status(200).json({
      message : "Data returned successfully",
      data: jobCounts,
    });

  } catch (er) {

    app_logger.info(`Error Occured while Fecthing the Jobsummary ${er}`)

    if(er.message === 'Queue not found'){
         return res.status(400).json({
            message  :"Queue not found"
         })
    }

    return res.status(500).json({

        message : "Internal Server Error",
        error:er
     
    });
  }
};