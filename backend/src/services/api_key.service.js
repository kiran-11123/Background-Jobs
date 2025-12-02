import express from 'express'
import project_model from '../models/projects.js'
import app_logger from '../utils/logger/App_logger.js'
import { generateApiKey } from '../utils/generate_api_key.js'

export const Generate_API_KEY = async(user_id , project_id)=>{
        app_logger.info(`Entered into the Generate API_KEY service for project ${project_id}`)  

        try{

            const check_existing_api_key = await project_model.findOne({user_id : user_id , _id :project_id});

            if(!check_existing_api_key){
                 app_logger.info(`Project with given project_id :${project_id} is not present.`)
                 throw new Error(`Project Not Present`)
            }

            if(check_existing_api_key.api_key){
                 app_logger.info(`An API_KEY already existed for the project `)
                 throw new Error(`API_KEY already exists.`)
            }

            const key = generateApiKey();
            
            app_logger.info(`API_KEY for the project is successfully Generated.`)
            return key;



        }
        catch(er){
             app_logger.warn(`Error occured while creating the API_KEY for project : ${project_id} + er`)
             throw er;
        }
}
