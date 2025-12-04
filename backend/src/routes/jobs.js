import express from 'express'
import { CreateJobcontroller , GetJobsContoller , GetJobsContollerForId } from '../controllers/jobs.controller.js';
import { join } from 'path';
const Job_Router = express.Router();



Job_Router.post("/create-job" , CreateJobcontroller);
Job_Router.post("/get_allJobs" , GetJobsContoller);
Job_Router.post("/get_job" , GetJobsContollerForId );










export default Job_Router;