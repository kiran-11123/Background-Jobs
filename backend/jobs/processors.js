import { EmailProcessor } from "./processors/emailProcessor.js";
import { DeleteOldJobs } from "./processors/deleteOldjobsProcessor.js";
import { SendVerificationCode } from "./processors/sendVerificationEmail.js";


export const jobProcessors = {
    sendEmail: EmailProcessor,
    sendCode : SendVerificationCode,
    DeleteJobs : DeleteOldJobs
  
};