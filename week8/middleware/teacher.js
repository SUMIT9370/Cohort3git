const jwt=require("jsonwebtoken");
require("dotenv").config();



const teaachersecret=process.env.Teacher_JWT_SECRET;

function auth(req, res,next){
    console.log("auth middleware called");
    const verifytoken=jwt.verify(req.headers.token,teaachersecret);
    console.log("verifytoken is ",verifytoken);
    if (verifytoken){
        req.teacherId=verifytoken.user;
        next();
    }
    else{
        res.status(400).json({
            message:"you sent wrong token"
        })
    }
    
}

module.exports={auth};