import express from 'express'
import Authentication_token from '../middlewares/Authentication_token.js';
import { CreateJobcontroller , GetJobsContoller ,
     GetJobsContollerForId  ,UpdateJobContoller ,
      retryJobController , DeleteJobController , JobCountSummaryController } from '../controllers/jobs.controller.js';
const Job_Router = express.Router();



Job_Router.post("/create-job" ,Authentication_token ,  CreateJobcontroller);
Job_Router.get("/get_allJobs" ,Authentication_token , GetJobsContoller);
Job_Router.post("/get_job" ,Authentication_token ,  GetJobsContollerForId );
Job_Router.post("/update_job" , Authentication_token , UpdateJobContoller);
Job_Router.post("/retry_job" ,Authentication_token , retryJobController);
Job_Router.delete("/delete_job" ,Authentication_token ,  DeleteJobController);
Job_Router.post("/jobs_summary" ,Authentication_token ,  JobCountSummaryController);










export default Job_Router;