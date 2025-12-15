import express from 'express'
const Queue_Router = express.Router();
import Authentication_token from '../middlewares/Authentication_token.js';
import { GetQueueContoller , CreateQueueController ,getSpecificQueueDetailContoller ,DeleteQueueController ,updateQueueSettingsContoller} from '../controllers/queue_controller.js';

Queue_Router.post("/create" , Authentication_token , CreateQueueController );
Queue_Router.get("/get_all_queues" ,Authentication_token ,  GetQueueContoller);
Queue_Router.post("/get_queue" ,  Authentication_token ,getSpecificQueueDetailContoller)
Queue_Router.delete("/delete_queue" , Authentication_token , DeleteQueueController);
Queue_Router.post("/update_queue" ,Authentication_token ,  updateQueueSettingsContoller);











export default Queue_Router;