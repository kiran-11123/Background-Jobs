import express from 'express'
import { CreateJobcontroller , GetJobsContoller ,
     GetJobsContollerForId  ,UpdateJobContoller ,
      retryJobController , DeleteJobController , JobCountSummaryController } from '../controllers/jobs.controller.js';
import { join } from 'path';
const Job_Router = express.Router();



Job_Router.post("/create-job" , CreateJobcontroller);
Job_Router.post("/get_allJobs" , GetJobsContoller);
Job_Router.post("/get_job" , GetJobsContollerForId );
Job_Router.post("/update_job" , UpdateJobContoller);
Job_Router.post("/retry_job" , retryJobController);
Job_Router.post("/delete_job" , DeleteJobController);
Job_Router.post("/jobs_summary" , JobCountSummaryController);










export default Job_Router;