import express from 'express'
import { createQueueService , GetQueueService , getSpecificQueueDetailsService , DeleteQueueService} from '../services/queue_services.js'
import app_logger from '../utils/logger/App_logger.js';

export const CreateQueueController = async(req,res)=>{
    app_logger.info(`Entered into CreateQueueController for the projectId : ${req.projectId}`)
    try{
         
        const projectId = req.projectId;
        const data = req.data;

        const CreateQueue = await createQueueService(projectId , data);
        
        
        app_logger.info(`Queue For the project is created successfully`)
        return res.status(200).json({
            message : "Queue Created Successfully.."
        })
    }
    catch(er){

        app_logger.info(`Error occured while creating the Queue`)

        if(er.message === 'Queue Already exists...'){
             app_logger.info(`Queue with the name Already exists..`)
             return res.status(400).json({
                message:"Queue Already Exists.."
             })
        }
         
        return req.status(500).json({
            message:"Internal Server Error...",
            error:er
        })
    }
}


export const GetQueueContoller = async(req,res)=>{
    
    app_logger.info(`Entered into the GetQueueController for the projectid ${req.projectId}`)
    try{

        const projectId  = req.projectId;

        const GetQueues = await GetQueueService(projectId);
       
        app_logger.info(`Queues for the project retrived successfully..`)
        return res.status(200).json({
            message : "Data fetched successfull...",
            queues: GetQueues
        })

    }
    catch(er){
         
        app_logger.info(`Error occured while fetching the queues ${er}`)
        return res.status(500).json({
            message : "Internal Server Error..",
            error:er
        })
    }
}

export const getSpecificQueueDetailContoller = async(req,res)=>{
       
    try{
          
        const queue = req.queue_id;

        const Queue_data = await getSpecificQueueDetailsService(queue);

        return res.status(200).json({
            message : "Details Fetching successfully.",
            queue_details :Queue_data

        })

    }
    catch(er){
         
        app_logger.info(`Error occured while fetching the details for the queue..`)


        if(er.message === 'queue not found'){
            app_logger.info('Queue with the given Id is not found...')
            return res.status(400).json({
                 
                message : "Queue Not found...",
                

            })
        }

        return res.status(500).json({
            message : "Internal Server Error..",
            error:er
        })
    }
}

export const DeleteQueueController = async(req,res)=>{
       
    try{

        const queue = await req.queue_id;
        const project = await req.projectId;

        const data = DeleteQueueService(project , queue);

        return res.status(200).json({
            message : "Queue Deleted successfully.."
        })


    }
    catch(er){
        
        app_logger.info(`Error While deleting the Queue`)
        return res.status(500).json({
            message : "Internal Server Error..",
            error:er
        })
    }
}