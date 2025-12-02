import express from 'express'
import { Generate_API_KEY } from '../services/api_key.service'
import app_logger from '../utils/logger/App_logger'
import { getEnabledCategories } from 'trace_events'


export const  Generate_API_KEY_controller = async(req,res)=>{
    
    app_logger.info(`Entered into the Generate_API_KEY_controller with user_id ${req.user.user_id} `)
    try{

        const user_id = req.user.user_id;
        const project_id = req.params.project_id;

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