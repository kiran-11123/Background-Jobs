import mongoose from "mongoose";

const userSchema = new mongoose.Schema({


    email :{type:String , required:true},
    username :{type:String , required:true},
    password :{type:String , required:true},
    resetPasswordToken :{type:String},
    resetPasswordExpiry :{type:Date}
    

})

const user_model = mongoose.model("Users" , userSchema)



export default user_model;