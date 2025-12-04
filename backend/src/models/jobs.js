import mongoose  from "mongoose";



const Jobs_Schema  = new mongoose.Schema({
    queueId : {type:mongoose.Schema.Types.ObjectId , ref:'Queue'},

    name: {type:String , required:true},
    status:{type:String  , default:"waiting"},
    attempts : {type:Number  , default:0}
}, {timestamps:true})


const Jobs_model = mongoose.model("Jobs" , Jobs_Schema);


export default Jobs_model;