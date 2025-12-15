import express from 'express'
import project_model from '../models/projects.js'
import app_logger from '../utils/logger/App_logger.js'
import { generateApiKey } from '../utils/generate_api_key.js'
import Queue_model from '../models/queue.js'

export const Generate_API_KEY = async(user_id , queue_id)=>{
        app_logger.info(`Entered into the Generate API_KEY service for queue ${queue_id}`)  

        try{

            const check_existing_api_key = await Queue_model.findOne({user_id : user_id , _id :queue_id});

            if(!check_existing_api_key){
                 app_logger.info(`Project with given project_id :${queue_id} is not present.`)
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
             app_logger.warn(`Error occured while creating the API_KEY for project : ${queue_id} + er`)
             throw er;
        }
}



export const Get_API_KEY_service = async(user_id , queue_id)=>{
    
    app_logger.info(`Entered into  the get_api_key service to get the api_key for queue : ${queue_id}`)
    try{

        const find_project = await Queue_model.findOne({user_id : user_id , _id :queue_id})

        if(!find_project){
             throw new Error(`queue Not Found`)

        }

        if(!find_project.api_key){
             throw new Error(`queue not found`)
        }

        return find_project.api_key ; 

    }
    catch(er){
         throw er;
    }
}


export const Delete_api_key_Service = async(user_id , queue_id)=>{

    app_logger.info(`Entered into Delete api_key service `)
        
    try{

       const find_project = await Queue_model.findOne({user_id : user_id , _id :queue_id})

        if(!find_project){
             throw new Error(`queue Not Found`)

        }

        await Queue_model.updateOne(
            {_id:queue_id},
            {$unset :{api_key : ""}}
        )

        

        return "API KEY deleted successfully.." ; 

    }
    catch(er){
        throw er;
    }
}