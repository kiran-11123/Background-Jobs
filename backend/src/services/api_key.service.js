import express from 'express'
import project_model from '../models/projects.js'
import app_logger from '../utils/logger/App_logger.js'
import { generateApiKey } from '../utils/generate_api_key.js'
import mongoose from 'mongoose'

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

            await check_existing_api_key.updateOne({
                $set : { api_key : key }
            })
            check_existing_api_key.save();
            
            app_logger.info(`API_KEY for the project is successfully Generated.`)
            return key;



        }
        catch(er){
             app_logger.warn(`Error occured while creating the API_KEY for project : ${project_id} + er`)
             throw er;
        }
}



export const Get_API_KEY_service = async(user_id , project_id)=>{
    
    app_logger.info(`Entered into  the the api_key service to get the api_key for project : ${project_id}`)
    try{


      
        const find_project = await project_model.findOne({user_id : user_id , _id :project_id})

       

        return find_project.api_key ; 

    }
    catch(er){
         throw er;
    }
}


export const Delete_api_key_Service = async(user_id , project_id)=>{

    app_logger.info(`Entered into Delete api_key service `)

    const project_id_new = new mongoose.Types.ObjectId(project_id);
        
    try{

       const find_project = await project_model.findOne({user_id : user_id , _id :project_id_new})

        if(!find_project){
             throw new Error(`Project Not Found`)

        }

        if(!find_project.api_key){
             throw new Error(`API_KEY not found`)
        }

        await project_model.updateOne(
            {_id:project_id},
            {$unset :{api_key : ""}}
        )

        

        return "API KEY deleted successfully.." ; 

    }
    catch(er){
        throw er;
    }
}