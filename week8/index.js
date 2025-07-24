const express =require("express");
const app = express();
const mongo=require("mongoose");
require("dotenv").config();
app.use(express.json());


const {coureRouter}=require("./routs/courses");
const {userRouter}= require ("./routs/users");
const {teacherRouter}=require("./routs/teacher");
app.use("/teacher",teacherRouter);
app.use("/user", userRouter);
app.use("/course", coureRouter);
function main(){

    try{
        mongo.connect(process.env.MONGO_URL)
    }catch(e){
        console.log("unable to connect to the database")
    }
    
}
main();
app.listen(3001)