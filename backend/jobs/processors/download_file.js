import express from 'express';
import jobs_logger from '../../src/utils/logger/jobs_logger.js';
import mongoose from 'mongoose';
import app_logger from '../../src/utils/logger/App_logger.js';
import fs from 'fs'
import archiver  from 'archiver'
import path from 'path'


export const DownloadProcessor = async(payload)=>{

    app_logger.info(`Entered into file download job processor`);
      
    try{

        const data_file = payload.data.data_file;

        // Process the file download logic here

        



       



       

    }
    catch(er){
         app_logger.info(`Error in Downloading the file , ${er}`);
         return {success:false , message : "Error in Downloading the file."}
    }
}