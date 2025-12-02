import express from 'express';
import rateLimit from 'express-rate-limit'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import ConnectDB from './config/db.js';
import app_logger from './utils/logger/App_logger.js';
import Auth_Router from './routes/user_auth.js';
import cron from './utils/cron-jobs/logger-cron.js';
import redis_cron from './utils/cron-jobs/redis-cron.js';
dotenv.config();
const app = express();
ConnectDB();
const PORT = process.env.PORT || 5000;

const CorsOptions = {
    origin :[
        'http://localhost:3000'
    ],
    credentials:true,
    methods:["GET" , "POST",'PUT','DELETE' ,'OPTIONS'],
      allowedHeaders:['Content-Type','Authorization']

}
app.use(cors(CorsOptions))

const limiter = rateLimit({
    windowMs:15*60*1000,
    max:1000,
    message : "Too Many Requests , Please try again later."
})
app.use(express.json());
app.use(limiter);
app.use(cookieParser());

app.use("/api/user" , Auth_Router)










app.use((err, req, res, next) => {
    app_logger.info("Error occurred while connecting " + err.message)
  res.status(500).json({ message: "Internal Server Error" });
});



app.listen(PORT , ()=>{
    app_logger.info(`Server Started at Port ${PORT}`)
    console.log(`Server Started at Port ${PORT}`)
})