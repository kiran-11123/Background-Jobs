import express from 'express'
const Queue_Router = express.Router();
import { GetQueueContoller , CreateQueueController ,getSpecificQueueDetailContoller ,DeleteQueueController ,updateQueueSettingsContoller} from '../controllers/queue_controller.js';

Queue_Router.post("/create" , CreateQueueController );
Queue_Router.post("/get_all_queues" , GetQueueContoller);
Queue_Router.post("/get_queue" , getSpecificQueueDetailContoller)
Queue_Router.post("/delete_queue" , DeleteQueueController);
Queue_Router.post("/update_queue" , updateQueueSettingsContoller);











export default Queue_Router;