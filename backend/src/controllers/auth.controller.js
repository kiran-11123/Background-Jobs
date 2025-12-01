import { SignInService , SignUpService } from "../services/auth.service.js";
import app_logger from "../utils/logger/App_logger.js";

export const Signin = async(req,res)=>{
       

    try{

        const{email,username ,password} = req.body;

        const {user , token} = SignInService(email , username , password);
        
        app_logger.info(`Signin Successfull for the user ${username}`)
         res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
           
        })

         return res.status(200).json({
            message:"Login Successfull..",
            token:token
        })


    }
    catch(er){

            logger.error(`SignIn error for ${email}: ${err.message}`);

            if(er.message === 'Email Not found'){
                 return res.status(404).json({
                    message:"Email not found. Please register first."
                 })
            }
            else if (er.message === 'Password is Wrong for the email'){
                 return res.status(401).json({
                    message:"Incorrect password. Please try again."
                 })
            }
        return res.status(500).json({
            message:"Internal Server Error",
            error:er
        })

         
    }
}


export const Signup = async(req,res)=>{
      
    try{

        const{email,username, password} = req.body;

        const user = SignUpService(email ,username ,password);
        
        app_logger.info(`Registration completed successfully for the user ${username}`)
        return res.status(200).json({
            message : "Registration Successfull.."
        })

    }
    catch(er){

        app_logger.warn(`Error occurred while doing registration , ${er}` );

        if(er.message === 'Email already registered'){
            return res.status(400).json({
                message:"Email already exists..."
            })
        }

        else if(er.message==='Username already taken'){
            return res.status(400).json({
                message :"Username already taken"
            })
        }

        return res.status(500).json({
            message : "Internal Server Error...",
            error:er
        })



    }
}