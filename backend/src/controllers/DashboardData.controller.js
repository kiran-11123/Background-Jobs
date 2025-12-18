import { DashBoardService } from "../services/DashboardData.service.js"
import app_logger from "../utils/logger/App_logger.js";
export const DashBoardController = async(req,res)=>{

    app_logger.info(`Entered into the DashBoard Controller `)
       
    try{
        
        const {find_projects , find_queues , find_jobs , find_jobs_completed} = await DashBoardService();

        const data = {
            find_projects,
            find_queues,
            find_jobs,
            find_jobs_completed
        }

        app_logger.info(`Data Feteched successfully in the Dashboard service`)

        return res.status(200).json({
            message : "Data Fetched Successfully",
            data : data
        })





    }
    catch(er){
        app_logger.error(`Got Error while Fetching the data in the DashBoard controller ${er}`)

        return res.status(500).json({
            message : "Internal Sever Error..",
            error:er
        })

    }
}