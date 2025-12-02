import express from 'express'
import app_logger from '../utils/logger/App_logger.js'
import project_model from '../models/projects.js'

export const Project_creation = async(user_id , title,description)=>{

        app_logger.info(`Entered into the Project_Creation service for user ${user_id}`)
       
        try{

            const find_project_title = await project_model.findOne({title : title})

            if(find_project_title){
                 app_logger.info(`There is an already existing project present with current title`)
                 throw new Error("Project is Present")
            }

            const new_project = await project_model.create({
                user_id : user_id,
                title:title,
                description : description
            })

            
            app_logger.info(`Project created successfully for the user ${user_id}`)
            return new_project;

               
        }
        catch(er){
            app_logger.warn("Error Occured in Project_Creation_Service for user")
            throw er;
        }
}




export const Get_Projects_Service = async(user_id)=>{

    app_logger.info(`Entered into the Find_Project Service for the user ${user_id}`)
      
    try{

        const find_projects = await project_model.find({user_id : user_id})
  
       
        return find_projects;

    }
    catch(er){
        app_logger.warn(`Error occured while Fetching the project details for user ${req.user.username}`)
        throw er;
    }

}