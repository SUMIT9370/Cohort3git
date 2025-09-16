const express = require("express");

const router= express.Router();
require("dotenv").config();

const jwt = require("jsonwebtoken");
const secret = process.env.jwtsecret;
const {model}=require("./db.js");
const bcrypt=require("bcrypt");
const z=require("zod");
router.use(express.json());


router.post("/login", async function (req , res){


const zodboj=z.object({
    email:z.string().email(),
    pass: z.string()
})

    const veryfy = zodboj.safeParse(req.body);
    if (!veryfy.success){
        res.status(400).json({
            message: "invalid input"
        })
    }
    const {email,password}=req.body;
try{
    
    const user = model.findOne({
    email:email
})
const passveryfy= await bcrypt.compare(password,user.pass);

if (passveryfy){

    console.log("you are now pass is correct" );
        const token=jwt.sign({
            name:email
        },secret);
        res.json({
            message: "you are now loged in ", token: token
        })
    }else{
        res.json({
            message: "your password is not maching"
        })
    }
}catch(e){
    res.json(
    {
        message:"unable to fetch the user"
    }
    )
}







})

router.post("/signup", async function(req, res){

    
const zodboj=z.object({
    email:z.string().email(),
    pass: z.string().min(6).max(100),
    name: z.string().min(3).max(20)
})

const veryfy= zodboj.safeParse(req.body);
if (!veryfy.success){
    res.status(400).json({
        message: " you input is invalid"
    })


}
const {email, password, name}=req.body;

const hashpass= await bcrypt.hash(password,2);
const isuser= await model.findOne({
    email:email
})
if (isuser){
    res.status(400).json({
        message: "email is already exist"
    })
}
try{
    const user= await model.create({
        email:email,
        pass:hashpass,
        name:name
    })
    res.status(200).json({
        message:"your account is been created "
    })
}catch(e){
    res.status(500).json({
        message:"unable t creat accunt"
    }
    )
}

})




module.exports={
    router
}