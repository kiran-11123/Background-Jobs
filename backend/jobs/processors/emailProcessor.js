import jobs_logger from '../../src/utils/logger/jobs_logger.js'
import dotenv from 'dotenv'
dotenv.config({ path: "../../.env" });
import transporter from '../../src/utils/Nodemailer.js';



export  const EmailProcessor = async(data)=>{
    jobs_logger.info(`Entered into the EmailProcessor job..`)
        try{
           
        
        const toemail = data.job.data.email;
      
      const subject = data.job.data.subject;

      const message = data.job.data.message;

        let mailoptions = {
            from: "eventnest.official.main@gmail.com",
            to: toemail,
            subject: subject,
            text: "",
            html: `
    <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f9f9f9;">

     

      <p style="font-size: 15px; color:#444; text-align:center; margin-bottom: 15px;">
        Here is the note content:
      </p>

      <div style="
        white-space: pre-wrap;
        padding: 15px;
        background-color: #ffffff;
        border-left: 5px solid #4CAF50;
        border-radius: 6px;
        font-size: 16px;
        line-height: 1.6;
        color: #111;
      ">
        ${message}
      </div>

      <p style="color:#666; font-size: 14px; text-align:center; margin-top: 25px;">
        Sent via SwiftQueue Sharing System.
      </p>

    </div>
  `
        };

        await transporter.sendMail(mailoptions);

           jobs_logger.info(`Mail sent to ${email} by ${username}`);


    

      return {success:true  ,message : "Email Sent"}

        }
        catch(er){
           jobs_logger.info(`Error occured while sending the email ${er}`)
           
        }

}

