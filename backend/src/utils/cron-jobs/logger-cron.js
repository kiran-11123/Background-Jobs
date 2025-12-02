import cron from 'node-cron'
import app_logger from '../logger/App_logger.js';
import fs from 'fs'
import path from 'path';

const LOG_FILE_PATH = path.join("src", "utils", "logs", "app.log");

async function deleteOldLogs() {
    // Logic to delete or archive old logs
    try {

        app_logger.info("Cron Job: Log maintenance started");

       if (fs.existsSync(LOG_FILE_PATH)) {
            fs.unlinkSync(LOG_FILE_PATH);   // delete the file
            app_logger.info("Log file deleted successfully");
        }

        app_logger.info("Cron Job: Log maintenance completed");


    }
    catch (er) {
        app_logger.error("Error in cron job for Log maintenance: " + err.message);
    }
}

cron.schedule('*/30 * * * *', () => {
    deleteOldLogs();
    logger.info("Scheduled log maintenance job executed.");
});

export default cron;