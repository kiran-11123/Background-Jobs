import express from 'express'
const Project_Router = express.Router();
import Authentication_token from '../middlewares/Authentication_token.js';
import { CreateProject } from '../controllers/projects.controller.js';
import { Get_Projects } from '../controllers/projects.controller.js';
import { Get_Project_By_Id } from '../controllers/projects.controller.js';
import { deleteProject } from '../controllers/projects.controller.js';

Project_Router.post("/create" , Authentication_token , CreateProject )
Project_Router.get("/get_projects" ,Authentication_token , Get_Projects)
Project_Router.post("/get_project_by_id" , Authentication_token , Get_Project_By_Id)
Project_Router.post("/delete_project" , Authentication_token , deleteProject)








export default Project_Router;