import mongoose from 'mongoose'


const Queue_Schema = new mongoose.Schema({
     
    name :{type:String , required:true},
    user_id : {type:mongoose.Schema.Types.ObjectId , ref:'Users' , required:true},  
    projectId : {type:String , required:true},

    concurrency : {type:Number , default:5},
    retryLimit : {type:Number , default:3},
    rateLimit : {type:Number , default:null},
    status : {type:Number  , default:null},
    api_key : {type:String  , default:null}
,
},{timestamps:true})


const Queue_model = mongoose.model("Queue" , Queue_Schema);


export default Queue_model;