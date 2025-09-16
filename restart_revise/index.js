const express = require("express");
const app = express();
const {router}=require("./auth");
const mongo = require("mongoose");
const { model } = require("./db");  // Changed this line

app.use("/user",router);





app.listen(3000);