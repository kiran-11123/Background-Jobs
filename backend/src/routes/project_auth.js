import express from 'express'
const Project_Router = express.Router();
import Authentication_token from '../middlewares/Authentication_token.js';
import { CreateProject } from '../controllers/projects.controller.js';
import { Get_Projects } from '../controllers/projects.controller.js';


Project_Router.post("/create" , Authentication_token , CreateProject )
Project_Router.post("/get_projects" ,Authentication_token , Get_Projects)








export default Project_Router;