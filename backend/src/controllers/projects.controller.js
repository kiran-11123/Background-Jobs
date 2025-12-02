import express from 'express'
import { Project_creation } from '../services/project.service.js';
import app_logger from '../utils/logger/App_logger.js';
import { error } from 'console';
import { Get_Projects_Service } from '../services/project.service.js';
import { Get_Project_By_Id_Service } from '../services/project.service.js';

export const CreateProject = async (req, res) => {

    app_logger.warn(`Entered into CreatedProject controller for user ${req.body.username} `)

    try {


        const { title, description } = req.body;
        const user_id = req.user.user_id

        const p_data = await Project_creation(user_id, title, description);

        app_logger.info(`Project ${title} created successfully for the user ${req.user.username}`)
        return res.status(200).json({
            message: "Project Created Successfully..."
        })

    }
    catch (er) {
        app_logger.warn(`Error occured while creating the project`)

        if (er.message === 'Project is Present') {
            return res.status(400).json({
                message: "There is an already existing project present with current title"
            })
        }

        return res.status(500).json({
            message: "Internal server Error",
            error: er
        })

    }
}

export const Get_Projects = async (req, res) => {
    app_logger.info(`Entered into Get_Projects controller for the user ${req.user.username}`)

    try {

        const user_id = req.user.user_id;

        const { projects } = await Get_Projects_Service(user_id);


        app_logger.info(`Fetched projects successfully for the user ${req.user.username}`)
        return res.status(200).json({
            message: "Projects Fetched successfully...",
            projects: projects
        })


    }
    catch (er) {

        app_logger.warn(`Error occured while Fetching the projects`)

        if(er.message==='Error Occured while Fetching the project'){
            return res.status(400).json({
                message : "Error Occured while Fetching the project"
            })
        }


        return res.status(500).json({
            message: "Internal Server Error..",
            error: er
        })

    }
}

export const Get_Project_By_Id = async(req , res)=>{
    app_logger.info(`Entered into Get_Project_By_Id controller for the user ${req.user.username}`)

    try{

        const user_id = req.user.user_id;
        const project_id =  req.params.project_id;
        const Project_Details = await Get_Project_By_Id_Service(user_id , project_id);

        app_logger.info(`Fetched project by Id successfully for the user ${req.user.username}`)
        return res.status(200).json({
            message: "Project Fetched successfully...",
            project : Project_Details
        })

    }
    catch(er){
        app_logger.warn(`Error occured while Fetching the project by Id`)

        if(er.message==='Error Occured while Fetching the project by Id'){
            return res.status(400).json({
                message : "Error Occured while Fetching the project by Id"
            })
        }

        return res.status(500).json({
            message : "Internal Server Error..",
            error : er
        })
    }
}


export const deleteProject = async(req , res)=>{
     
    try{

        const user_id = req.user.user_id;
        const project_id = req.params.project_id;

        const delete_response = await Delete_Project_Service(user_id , project_id); 

        return res.status(200).json({
            message : "Project Deleted Successfully"
        })

    }
    catch(er){
         if(er.message==='Error Occured while Deleting the project'){ 

            return res.status(400).json({
                message : "Error Occured while Deleting the project"
            })
        }

         }

         return res.status(500).json({
            message : "Internal Server Error..",
            error : er
        })  
    }
