import express from 'express'
import { Project_creation } from '../services/project.service.js';
export const CreateProject = async(req,res)=>{
      
    try{

        const{title,description} = req.body;
        const user_id = req.user.user_id

        const p_data = await Project_creation(user_id , title,description);

    }
    catch(er){

    }
}