import express from 'express'
import { createQueueService , GetQueueService , getSpecificQueueDetailsService , DeleteQueueService , updateQueueSettingsService} from '../services/queue_services.js'
import app_logger from '../utils/logger/App_logger.js';
import { getOrCreateQueue } from '../utils/bullmq/queue.js';

export const CreateQueueController = async(req,res)=>{
    app_logger.info(`Entered into CreateQueueController for the projectId : ${req.body.projectId}`)
    try{
         
        const projectId = req.body.projectId;
        const name = req.body.name;
        const user_id = req.user.user_id;


        if(!projectId){
            return res.status(400).json({
                message : "ProjectId not found.."
            })
        }


        const CreateQueue = await createQueueService(projectId , name ,user_id);
        
        
        app_logger.info(`Queue For the project is created successfully`)

      
        return res.status(200).json({
            message : "Queue Created Successfully..",
            queue: CreateQueue
        })
    }
    catch(er){

        app_logger.info(`Error occured while creating the Queue` , er.message)

        if(er.message === 'Queue Already exists...'){
             app_logger.info(`Queue with the name Already exists..`)
             return res.status(400).json({
                message:"Queue Already Exists.."
             })
        }
         
        return res.status(500).json({
            message:"Internal Server Error...",
            error:er
        })
    }
}


export const GetQueueContoller = async(req,res)=>{
    
    app_logger.info(`Entered into the GetQueueController for the projectid ${req.query.projectId}`)
    try{

        const { projectId } = req.query;;

        const GetQueues = await GetQueueService(projectId);
       
        app_logger.info(`Queues for the project retrived successfully..`)
        return res.status(200).json({
            message : "Data fetched successfull...",
            queue: GetQueues
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
          
        const queue = req.body.queue_id;

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

        const queue = await req.body.queue_id;
        const project = await req.body.projectId;

        const data = await DeleteQueueService(project , queue);

        return res.status(200).json({
            message : "Queue Deleted successfully.."
        })


    }
    catch(er){
        
        app_logger.info(`Error While deleting the Queue`)

        if(er.message === 'Queue Not found'){
            return res.status(400).json({
                message : "Queue Not found.."
            })
        }
        return res.status(500).json({
            message : "Internal Server Error..",
            error:er
        })
    }
}

export const updateQueueSettingsContoller = async(req,res)=>{
       
    try{

        const queue_id =req.body.queueId;
        const data = req.body.data;

      


        const queue_update = await updateQueueSettingsService(queue_id , data);

        return res.status(200).json({
            message : "Queue Updated Sucessfully.."
        })

    }
    catch(er){

        if(er.message ==='Concurrency must be >= 1'){
            return res.status(400).json({
                message : "Concurrency must be greater than 0"
            })
        }

        else if (er.message === 'Retry limit must be >= 0'){
            return res.status(400).json({
                message : "Retry limit must be greater than 0"
            })
        }
         
        return res.status(500).json({
            message : "Internal Server Error...",
            error:er
        })
    }
}