
const mongo= require("mongoose");
const userid=mongo.ObjectId;

const userSchem = new mongo.Schema({
    name : String,
    email: {type:String,unique:true},
    pass: String

});

const todoSchema = new mongo.Schema({
    title: String,
    status: Boolean,
    _id: userid

});

const userModel1= mongo.model("Users",userSchem);
const todoModel1= mongo.model("todo", todoSchema)
module.exports={userModel1,todoModel1};