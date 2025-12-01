import cron from 'node-cron'


async function deleteOldLogs() {
    // Logic to delete or archive old logs
    try {

        logger.info("Cron Job: Log maintenance started");

        fs.unlink("src/utils/logs/app.log", (err) => {
            if (err) {
                console.error("Error deleting log file:", err);
            } else {
                console.log("Log file deleted successfully!");
            }
        });

        logger.info("Cron Job: Log maintenance completed");


    }
    catch (er) {
        logger.error("Error in cron job for Log maintenance: " + err.message);
    }
}

cron.schedule('*/30 * * * *', () => {
    deleteOldLogs();
    logger.info("Scheduled log maintenance job executed.");
});

export default cron;