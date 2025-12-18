import express from 'express'
import { DashBoardController } from '../controllers/DashboardData.controller.js';
import Authentication_token from '../middlewares/Authentication_token.js';
const Dashboard_Router  = express.Router();


Dashboard_Router.get("/get-data" , Authentication_token , DashBoardController);











export default Dashboard_Router;