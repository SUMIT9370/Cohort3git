const mongo=require("mongoose");
const users = require("./routs/users");
const Schema= mongo.Schema;
mongo.connect("mongodb+srv://sumitpatil9370:ghosthock@cluster0.f6d07ui.mongodb.net/")


const ObjectId=mongo.ObjectId;
const user= new Schema({
    email:{type: String, unique: true},name: String,pass:String
})

const teacher= new Schema({
    email:{type: String, unique: true},name: String,pass:String
})

const coures=new Schema({
    titel:String,price:int,image:url ,discription:String,teacher:ObjectId
})

const purches= new Schema({
    course:ObjectId,user:ObjectId
})
const userSchema=mongo.model("users",users);
const teacherSchema=mongo.model("teachers",teacher);
const couressSchema=mongo.model("courses",coures);
const purchesSchema=mongo.model("Purches",purches);

module.exports={userdb:userSchema,teacherdb: teacherSchema, couresdb: couressSchema,purchesdb:purchesSchema};