const express =require("express");
const app = express();
const {coureRouter}=require("./routs/courses");
const {userRouter}= require ("./routs/users");
app.use("/user", userRouter);
app.use("/course", coureRouter);
app.listen(8001);