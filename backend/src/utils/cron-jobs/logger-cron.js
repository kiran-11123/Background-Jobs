import cron from 'node-cron'
import app_logger from '../logger/App_logger.js';

async function deleteOldLogs() {
    // Logic to delete or archive old logs
    try {

        app_logger.info("Cron Job: Log maintenance started");

        fs.unlink("src/utils/logs/app.log", (err) => {
            if (err) {
                console.error("Error deleting log file:", err);
            } else {
                console.log("Log file deleted successfully!");
            }
        });

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