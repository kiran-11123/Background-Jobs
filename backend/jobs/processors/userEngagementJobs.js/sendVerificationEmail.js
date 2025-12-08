import app_logger from "../../../src/utils/logger/App_logger.js"
import jobs_logger from "../../../src/utils/logger/jobs_logger.js"
import transporter from "../../../src/utils/Nodemailer.js"


export const SendVerificationCode = async(data)=>{
    
    jobs_logger.info("Entered into the SendVerificationCode jobs")
    try{
          
        const email  = data.email;
         let code = Math.floor(Math.random()*900000 + 100000);

          let mailoptions = {

            from :"eventnest.official.main@gmail.com",
            to:email,
            subject : " Verification Code ",
            text : "Please find the Verification code ",
            html :`
               
           <div style="font-family: Arial, sans-serif; padding: 20px; border: 2px solid #4CAF50; border-radius: 10px; max-width: 600px; margin: auto; background-color: #f9f9f9;">
      
      <h1 style="color: #4CAF50; text-align: center;margin-bottom:20px;">
        Enter this code to reset your password
      </h1>

      <div style="text-align:center;">
        <div style="
          display: inline-block;
          padding: 12px 25px;
          background-color: #ffffff;
          border: 2px dashed #4CAF50;
          border-radius: 8px;
          font-size: 22px;
          letter-spacing: 4px;
          font-weight: bold;
          color: #333;">
          ${code}
        </div>
      </div>

      <p style="color:#555; text-align:center; margin-top:25px; font-size: 14px;">
        If you did not request this, you can safely ignore this email.
      </p>

    </div>
            `
        }

        await transporter.sendMail(mailoptions);

        jobs_logger.info(`Verificaiton code sent successfully`)

  return {success:true  ,message : "Verification Code Sent"}


    }
    catch(er){
        
        jobs_logger.info(`Error in Sending the verification code job ${er}`)
    }
}