import jwt from 'jsonwebtoken'
import app_logger from './logger/App_logger.js'
const JWT_SECRET = process.env.JWT_SECRET

function issueJWT(user_id , username , email){
      
    const token_details = {"user_id" : user_id , "username" : username , "email" :email}
    
    const token = jwt.sign(token_details , JWT_SECRET ,  {expiresIn : "1h"})

    app_logger.info("JWT token issued for the user successfully...")


    return token;
}


export default issueJWT;