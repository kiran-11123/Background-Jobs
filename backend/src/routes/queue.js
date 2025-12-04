import express from 'express'
const Queue_Router = express.Router();
import { GetQueueContoller , CreateQueueController } from '../controllers/queue_controller.js';

Queue_Router.post("/create" , CreateQueueController );
Queue_Router.post("/get_queues" , GetQueueContoller);











export default Queue_Router;