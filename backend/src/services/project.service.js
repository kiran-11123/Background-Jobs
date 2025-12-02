import express from 'express'
import app_logger from '../utils/logger/App_logger.js'


export const Project_creation = async(user_id , title,description)=>{
       
        try{


               
        }
        catch(er){
            app_logger.warn("Error Occured in Project_Creation_Service for user")
            throw er;
        }
}