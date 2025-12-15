import app_logger from '../utils/logger/App_logger.js'
import project_model from '../models/projects.js'
import redisClient from '../utils/redis/redis-client.js'
import Queue_model from '../models/queue.js'
import mongoose from 'mongoose'
export const Project_creation = async(user_id, title, description) => {
    app_logger.info(`Entered into Project_Creation service for user ${user_id}`);

    try {
        const find_project_title = await project_model.findOne({ title });

        if (find_project_title) {
            app_logger.info(`Project already exists with title "${title}" for user ${user_id}`);
            throw new Error("Project is Present");
        }

        const new_project = await project_model.create({ user_id, title, description });

        // Redis cache invalidation
        try {
            await redisClient.del(`projects_${user_id}`);
            app_logger.info(`Cache deleted for user ${user_id}`);
        } catch (redisErr) {
            app_logger.warn(`Redis invalidation error for user ${user_id}: ${redisErr.message}`);
        }

        app_logger.info(`Project "${title}" created successfully for user ${user_id}`);
        return new_project;

    } catch (er) {
        app_logger.warn(`Error occurred in Project_Creation service for user ${user_id}: ${er.message}`);
        throw er; // propagate to controller
    }
}




export const Get_Projects_Service = async(user_id)=>{

    app_logger.info(`Entered into the Find_Project Service for the user ${user_id}`)
     user_id = new mongoose.Types.ObjectId(user_id);
      
    try{

        //check in redis and get the data
        
        try{

        
        const Cached_Data  = await redisClient.get(`projects_${user_id}`)

        if(Cached_Data){
              app_logger.info(`Projects Data Fetched from the Cache`);
              return JSON.parse(Cached_Data);
        }
    }
    catch(redisErr){
         app_logger.info("Redis cache error: " + redisErr.message)
    }
        const find_projects = await project_model.find({user_id : user_id})

        if(!find_projects){
             app_logger.warn(`Error Occured while fecthing the project`)
             throw new Error("Error Occured while Fetching the project")
        }
         

        try{

            await redisClient.setEx(`projects_${user_id}` , 3600 , JSON.stringify(find_projects) );
            app_logger.info(`Projects are added into the cache..`)

        }
        catch(redisErr){
                     app_logger.info("Redis cache error: " + redisErr.message)

        }

         
       
        return find_projects;

    }
    catch(er){
        app_logger.warn(`Error occured while Fetching the project details for user ${user_id} : ${er}`)
        throw er;
    }

}

export const Get_Project_By_Id_Service = async(user_id , project_id)=>{

    user_id = new mongoose.Types.ObjectId(user_id)
    project_id = new mongoose.Types.ObjectId(project_id)
       
    try{

      
        const find_Project_with_id  = await project_model.findOne({user_id : user_id , _id : project_id})

        if(!find_Project_with_id){
             app_logger.warn(`Project Not Found with projectId ${project_id}`)
             throw new Error(`Project Not Found`)
        }

         

        return find_Project_with_id;

    }
    catch(er){
        app_logger.warn(`Error occured while Fetching the project with Id ${project_id}`)
        throw er;
    }
}
export const Delete_Project_Service = async (user_id , project_id) => {
  app_logger.info(`Entered into Delete_Project_Service for the user ${user_id}`);

  try {
    // Keep _id as ObjectId
    const project_id_new = new mongoose.Types.ObjectId(project_id);

    // Delete the project
    const delete_Project_with_id = await project_model.deleteOne({ _id: project_id_new });
    const delete_queues = await Queue_model.deleteMany({ projectId: project_id_new });

    if (delete_Project_with_id.deletedCount === 0) {
      app_logger.warn(`Project Not Found with projectId ${project_id} for Deletion`);
      throw new Error(`Project Not Found for Deletion`);
    }

    // Invalidate cache
    try {
      await redisClient.del(`projects_${user_id}`);
      const queue_cache_keys = await redisClient.keys(`queue_${project_id_new}`);
      if(queue_cache_keys.length > 0){
        await redisClient.del(queue_cache_keys);
      }
      app_logger.info("Cache deleted for the user");
    } catch (redisErr) {
      app_logger.warn("Redis invalidation error: " + redisErr.message);
    }

    return delete_Project_with_id;
  } catch (er) {
    app_logger.warn(`Error occurred while Deleting the project with Id ${project_id}: ${er.message}`);
    throw er;
  }
};
