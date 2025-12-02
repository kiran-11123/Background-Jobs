import redis_cron from 'node-cron'
import redis_logger from '../logger/redis_logger.js';

async function deleteredisLogs() {
    // Logic to delete or archive old logs
    try {

        redis_logger.info("Cron Job: Log maintenance started");

        fs.unlink("src/utils/logs/redis.log", (err) => {
            if (err) {
                console.error("Error deleting log file:", err);
            } else {
                console.log("Log file deleted successfully!");
            }
        });

        redis_logger.info("Cron Job: Log maintenance completed");


    }
    catch (er) {
        redis_logger.error("Error in cron job for Log maintenance: " + err.message);
    }
}

redis_cron.schedule('*/30 * * * *', () => {
    deleteredisLogs();
    redis_logger.info("Scheduled log maintenance job executed.");
});

export default redis_cron;