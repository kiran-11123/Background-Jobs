import mongoose from "mongoose";

const userSchema = new mongoose.Schema({


    email :{type:String , required:true},
    username :{type:String , required:true},
    password :{type:String , required:true}
    

})

const user_model = mongoose.model("Users" , userSchema)



export default user_model;