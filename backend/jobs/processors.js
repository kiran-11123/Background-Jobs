import { EmailProcessor } from "./processors/userEngagementJobs.js/emailProcessor.js";
import { DeleteOldJobs } from "./processors/userEngagementJobs.js/deleteOldjobsProcessor.js";
import { SendVerificationCode } from "./processors/userEngagementJobs.js/sendVerificationEmail.js";


export const jobProcessors = {
    sendEmail: EmailProcessor,
    sendCode : SendVerificationCode,
    DeleteJobs : DeleteOldJobs
  
};