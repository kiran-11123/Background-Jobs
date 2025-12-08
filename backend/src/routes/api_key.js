import express from 'express'
const API_KEY_ROUTER = express.Router();
import { Generate_API_KEY_controller } from '../controllers/api_key.controller.js';
import { Get_API_KEY_controller } from '../controllers/api_key.controller.js';
import { Delete_api_key_controller } from '../controllers/api_key.controller.js';
import Authentication_token from '../middlewares/Authentication_token.js';

API_KEY_ROUTER.post("/generate_key" ,Authentication_token ,  Generate_API_KEY_controller)
API_KEY_ROUTER.post("/get_key" , Authentication_token,Get_API_KEY_controller);
API_KEY_ROUTER.delete("/delete_key"  ,Authentication_token ,  Delete_api_key_controller);





export default API_KEY_ROUTER;