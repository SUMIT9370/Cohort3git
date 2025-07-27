const jwt= require("jsonwebtoken");
require("dotenv").config();


const usersecret=process.env.USER_JWT_SECRET;


function auth(req, res,next){
    const verifytoken=jwt.verify(req.headers.token,usersecret);
    if (verifytoken){
        const userId=verifytoken._id
        req.userId=userId;
        next();
    }
    else{
        res.status(400).json({
            message:"you sent wrong token"
        })
    }
    
}

module.exports={auth};