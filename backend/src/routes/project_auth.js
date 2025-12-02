import express from 'express'
const Project_Router = express.Router();
import Authentication_token from '../middlewares/Authentication_token.js';
import { CreateProject } from '../controllers/projects.controller.js';


Project_Router.post("/create" , Authentication_token , CreateProject )








export default Project_Router;