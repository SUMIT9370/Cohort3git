const router= require("express");
const coursesrouter=router();
const auth=require("../middleware/teacher")
const {couresdb}=require("../db");
const mongo=require("mongoose");
const e = require("express");
require("dotenv").config();

mongo.connect(process.env.MONGO_URL);
coursesrouter.get("/allcourse", async function (req, res){
    try{
    const cources= await couresdb.find({})
    res.status(200).json({
        message:"here is our all cources ",cources
    })
}catch(e){
    res.status(400).json({
        message: " there might problem form loading the code "
    })
}
})
coursesrouter.get("/freecources",async function (req, res){
    res.json({
        message:"you are at all free coureses"
    });
})

coursesrouter.post("/addcourse", auth.auth,async function(req,res){
    console.log("we are at add course endpoint");

    const teacherId = req.teacherId;
    const {title,price,image ,discription}=req.body;
    try{
         const coures= await couresdb.create({
        title,price,image,discription,teacher: teacherId });
       

    res.status(200).json({
        message: "coures are created"
    })
     throw new Error(e.message);
    }
    catch(e){
        
        res.status(500).json({
            message: "Unable to create course",error: e.message
        });
    }
  
       
    
} )

module.exports={coureRouter: coursesrouter};


