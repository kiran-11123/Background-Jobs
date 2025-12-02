import redis_cron from 'node-cron'
import redis_logger from '../logger/redis_logger.js';
import fs from 'fs'
import path from 'path';

const LOG_FILE_PATH = path.join("src", "utils", "logs", "redis.log");
async function deleteRedisLogs() {
    // Logic to delete or archive old logs
    try {

        redis_logger.info("Cron Job: Log maintenance started");

        if (fs.existsSync(LOG_FILE_PATH)) {
            fs.unlinkSync(LOG_FILE_PATH);   // delete the file
            app_logger.info("Log file deleted successfully");
        }


        redis_logger.info("Cron Job: Log maintenance completed");


    }
    catch (er) {
        redis_logger.error("Error in cron job for Log maintenance: " + err.message);
    }
}

redis_cron.schedule('*/30 * * * *', () => {
    deleteRedisLogs();
    redis_logger.info("Scheduled log maintenance job executed.");
});

export default redis_cron;