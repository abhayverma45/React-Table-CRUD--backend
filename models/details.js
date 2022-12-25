const mongoose=require("mongoose");

const UserSchema=mongoose.Schema({
 Name:String,
 Phone:Number,
 Email:String,
 Hob:String,
});

const userModel=mongoose.model("datails",UserSchema);
module.exports=userModel;