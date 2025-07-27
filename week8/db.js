const mongo=require("mongoose");
const users = require("./routs/users");
const Schema= mongo.Schema;
require("dotenv").config();

mongo.connect(process.env.MONGO_URL)


const ObjectId=Schema.ObjectId;
const user= new Schema({
    email:{type: String, unique: true},name: String,pass:String
})

const teacher= new Schema({
    email:{type: String, unique: true},name: String,pass:String
})

const coures=new Schema({
    title:{type:String,unique:true},price:String,image:String ,discription:String,teacher:ObjectId
})
const purches= new Schema({
    course:ObjectId,user:ObjectId
})
const userdb =mongo.model("users",user);
const teacherdb=mongo.model("teachers",teacher);
const couresdb=mongo.model("courses",coures);
const purchesdb=mongo.model("Purches",purches);

module.exports={userdb,teacherdb, couresdb,purchesdb};