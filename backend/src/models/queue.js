import mongoose from 'mongoose'


const Queue_Schema = new mongoose.Schema({
     
    name :{type:String , required:true},
    user_id : {type:mongoose.Schema.Types.ObjectId , ref:'Users' , required:true},  
     projectId: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects', required: true },

    concurrency : {type:Number , default:5},
    retryLimit : {type:Number , default:3},
    rateLimit : {type:Number , default:1000}, // jobs per second
    status : {type:Number  , default:2} // 0 - Disabled , 1 - Enabled , 2 - Pending

},{timestamps:true})


const Queue_model = mongoose.model("Queue" , Queue_Schema);


export default Queue_model;