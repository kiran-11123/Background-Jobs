import { SignInService, SignUpService } from "../services/auth.service.js";
import app_logger from "../utils/logger/App_logger.js";
import { ResetPassword } from "../services/auth.service.js";
import { VerifyCodeService } from "../services/auth.service.js";
import { ChangePassword } from "../services/auth.service.js";
// ---------------------- SIGN-IN CONTROLLER ----------------------
export const Signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Call service
        const { user, token } = await SignInService(email, password);

        app_logger.info(`Signin successful for user: ${user.username}`);

        // Set cookie token
       res.cookie("token", token, {
  httpOnly: true,
  secure: false,          // true in production
  sameSite: "lax",        // or "none" if cross-site
})

        return res.status(200).json({
            message: "Login Successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        });
    }
    catch (er) {
        app_logger.error(`Signin error for ${req.body.email}: ${er.message}`);

        if (er.message === "Email Not found") {
            return res.status(404).json({ message: "Email not found. Please register first." });
        }

        if (er.message === "Password is Wrong for the email") {
            return res.status(401).json({ message: "Incorrect password. Please try again." });
        }

        return res.status(500).json({
            message: "Internal Server Error",
            error: er.message
        });
    }
};



// ---------------------- SIGN-UP CONTROLLER ----------------------
export const Signup = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Call service
        const user = await SignUpService(email, username, password);

        app_logger.info(`Registration successful for user: ${username}`);

        return res.status(201).json({
            message: "Registration Successful"
        });
    }
    catch (er) {
        app_logger.warn(`Signup error: ${er.message}`);

        if (er.message === "Email already registered") {
            return res.status(400).json({ message: "Email already exists." });
        }

        if (er.message === "Username already taken") {
            return res.status(400).json({ message: "Username already taken." });
        }

        return res.status(500).json({
            message: "Internal Server Error",
            error: er.message
        });
    }
};


export const ResetPasswordController = async(req,res)=>{
    
    app_logger.info(`Entered into the ResetPasswordController `)
    try{

        const email = req.body.email;
        const user_id = req.user.user_id;

        const code  = await ResetPassword(email);
        
        app_logger.info(`Code sent Successfully..`)
        return res.status(200).json({
            message :"Code sent Successfully to the email"
        })

    }
    catch(er){
          
        app_logger.info(`Error Occured while sending the reset code`)

        if(er.message === 'User Not Found'){
            return res.status(400).json({
                message : "Email Not found.."
            })
        }

        return res.status(500).json({
            message: "Internal Sever Error",
            error:er
        })


    }
}
export const VerifyCodeController = async (req, res) => {
  try {
    app_logger.info(`Entered into the VerifyCodeController`);

    const { email, code } = req.body;

    const result = await VerifyCodeService(email, code);

    app_logger.info(`Code verified successfully`);
    return res.status(200).json({
      message: "Code Verified Successfully",
      result,
    });

  } catch (er) {
    app_logger.error(`Error while verifying the code: ${er.message}`);

    if (er.message === "User Not Found") {
      return res.status(400).json({ message: "Email not found" });
    }

    if (er.message === "Code Time Expired") {
      return res.status(400).json({ message: "Code expired" });
    }

    if (er.message === "Invalid Code") {
      return res.status(400).json({ message: "Code is wrong" });
    }

    // Unknown error
    return res.status(500).json({
      message: "Internal server error",
      error: er.message,
    });
  }
};


export const ChangePasswordController = async(req,res)=>{
      
    try{
          
        app_logger.info(`Entered into  the ChangePasswordService`)

        const result= await ChangePassword(req.body.email , req.body.password);

     app_logger.info(`Password changed successfully`)
     return res.status(200).json({
        message: "Password changed successfully"
     })
    } 
    catch(er){
 

        app_logger.info(`Error Occured while changing the password   ,${er}`)

        
    if (er.message === "User Not Found") {
      return res.status(400).json({ message: "Email not found" });
    }

    return res.status(500).json({
        message: "Internal Server Error",
        error:er
    })
         
    }
}