import mongoose from 'mongoose';


const Project_Schema = new mongoose.Schema({
         
    title : {type:String},
    api_key :{type:String},
    created_at : {type:Date , default:Date.now}

})

const Project_Model = mongoose.model("Project" , Project_Schema);


export default Project_Model;