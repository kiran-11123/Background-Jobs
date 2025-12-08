import { EmailProcessor } from "./processors/emailProcessor.js";


export const jobProcessors = {
    sendEmail: emailProcessor,
    generateReport: reportGenerator,
    deleteOldJobs: deleteOldJobsProcessor,
    sendNotification: notificationProcessor
};