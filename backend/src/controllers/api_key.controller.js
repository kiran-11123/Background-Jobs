import express from 'express'
import { Generate_API_KEY } from '../services/api_key.service.js'
import app_logger from '../utils/logger/App_logger.js'
import { Get_API_KEY_service } from '../services/api_key.service.js'
import { Delete_api_key_Service } from '../services/api_key.service.js'
export const  Generate_API_KEY_controller = async(req,res)=>{
    
    app_logger.info(`Entered into the Generate_API_KEY_controller with user_id ${req.user.user_id} `)
    try{

        const user_id = req.user.user_id;
        const project_id = req.body.project_id  ;
        console.log("Project ID in controller :" , project_id);

         if (!project_id) {
      return res.status(400).json({ message: "project_id is required" });
    }

        const api_key = await Generate_API_KEY(user_id , project_id);

        app_logger.info(`API KEY Created  and returned  successfully`)

        return res.status(200).json({
            message:"API_KEY Generated successfully",
            api_key :api_key
        })

    }
    catch(er){

        if(er.message === 'Project Not Present'){
            return res.status(400).json({
                message : "Project Not Found .."
            })
        }
        else if(er.message === 'API_KEY already exists.'){

            return res.status(400).json({
                message:"API_KEY Already Exists for this project"
            })
        }
        
        app_logger.warn(`Error Occured while generating the API_KEY : ${er}`)
        return res.status(500).json({
            message : "Internal Server Error",
            error:er
        })

    }
     
}

export const Get_API_KEY_controller = async(req,res)=>{
    app_logger.info(`Entered into Get_API_KEY_controller`)   
    try{

        const user_id = req.user.user_id;
        const { project_id } = req.query;

         if (!project_id) {
      return res.status(400).json({ message: "project_id is required" });
    }

        const api_key = Get_API_KEY_service(user_id , project_id);
          
    if(!api_key){
        return res.status(400).json({
            message : "API_KEY not found for this project"
        })
    }

        return res.status(200).json({
            message:"API Key returned successfully",
            api_key :api_key
        })

    }
    catch(er){

        
        app_logger.info(`Error occured while getting the api_key`)
        return res.status(500).json({
            message:`Error occured while getting api_key ${er}`
        })
         
    }
}

export const Delete_api_key_controller = async(req,res)=>{
    app_logger.info(`Entered into Delete_api_key_controller to delete the API_KEY`)
    try{

        const user_id = req.user_id;
        const project_id = req.params.project_id;

        const response  = await Delete_api_key_Service(user_id , project_id);
        
        app_logger.info(`API_KEY deleted successfully for the project ${project_id}`)
        return res.status(200).json({
            message : "API_KEY deleted successfully."
        })

    }
    catch(er){

         if(er.message === 'Project Not Found'){
            app_logger.info(`Project Not Found.`)
             return res.status(400).json({
                message : "Project Not Found..."
             })
        }
        else if(er.message === 'API_KEY not found'){
            app_logger.info(`API_KEY not found for this queue`)
             return res.status(400).json({
                message : "API_KEY not found for this queue"
             })
        }
        
        app_logger.info(`Error occured while getting the api_key`)
        return res.status(500).json({
            message:`Error occured while getting api_key ${er}`
        })
         
    
         
    }
}