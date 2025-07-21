const express=require("express");
const app=express();
const jwt= require("jsonwebtoken");
const secret="sumitatgoogle"
const mongo = require("mongoose");
const bcrypt=require("bcrypt");
app.use(express.json());
const {userm1}=require("./mongo");
const {z}=require("zod");

mongo.connect("mongodb+srv://sumitpatil9370:ghosthock@cluster0.f6d07ui.mongodb.net/ZODTODO");

app.post("/signup",async function(req, res){
    const requirebody=z.object({
        email:z.string().email().max(50).min(4),
        pass:z.string().min(3).max(100),
        name:z.string().max(100).min(5)

    })
    const inputverying= requirebody.safeParse(req.body);
    if(!inputverying.success){
        res.status(301).json({
            message: "wrong input",  
        })
    }

    const {email,pass,name} =req.body;
    const hashpass=await bcrypt.hash(pass,3);

    try{
        const check=await userm1.create({
        email:email,pass:hashpass,name:name
    })
    if (check){
        res.status(200).json({
            message:"you accout are being creatd"
        })
    }else{
        res.status(401).json({
            message: "error while time of signup"
        })
    }
    }catch(e){
        res.status(401).json({
            message:"our surver currently down"
        })
    }

})

app.post("/login",async function(req, res){
    const requirebody=z.object({
        email:z.string().email().max(50).min(4),
        pass:z.string().min(3).max(100)

    })
    const bodydata= requirebody.safeParse(req.body);
    if(!bodydata.success){
         res.status(301).json({
            message: "wrong credencials",error: bodydata.error
        })
    }
    

    const user=await userm1.findOne({
        email:req.body.email

    })

    if(user){
        const passverify=  bcrypt.compare( req.body.pass,user.pass);
        if (passverify){
            try{
                const token=jwt.sign({
                id:user.name
            },secret)
            res.status(200).json({
                message:"now you are logged in ", token: token
            })
            }catch(e){
                res.status(500).json({
                    message: "error at time signing token"
                })
            }
        }else{
            res.status(301).json({
                message:"wrong password"
            })
        }
        
    }else{
        res.status(401).json({
            message:"user not found "
        })
    }
});

app.listen(3001);