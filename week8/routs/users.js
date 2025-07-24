const router= require("express");
const userRouter=router();
const z= require("zod");
const bcrypt=require("bcrypt");
const jwt =require("jsonwebtoken");
const  jwtsecret="this is user secret";



// DATABASE IMPORT 
const {userdb}= require("../db");


userRouter.post("/signup", async function(req, res){
    const requirebody = z.object({
        email: z.string().email().max(100).min(5),
        pass: z.string().max(100).min(5),
        name: z.string().max(100).min(2)
    });

    const bodyParseSuccess = requirebody.safeParse(req.body);
    if (!bodyParseSuccess.success){
        return res.status(400).json({
            message: "Invalid input"
        });
    }

    const { email, pass, name } = req.body;

    try {
        const hashpass = await bcrypt.hash(pass, 2);
        const data = await userdb.create({
            email,
            name,
            pass: hashpass
        });

        console.log("User created:", data);
        return res.status(200).json({
            message: "Your account was created"
        });

    } catch (e) {
        console.error("Signup error:", e);
        return res.status(500).json({
            message: "Unable to create account"
        });
    }
});

userRouter.post("/signin",async function(req, res){
    //input validation
    const requirezod= z.object({
        email:z.string().email().max(100).min(10),
        name : z.string().max(100).min(2),
        pass: z.string().max(50).min(6)

    })
    const bodycheck=requirezod.safeParse(req.body);
    if (!bodycheck.success){
        res.status(300).json({
            message: "invalid input", error : bodycheck.error
        })
    }

    const {email,pass}=req.body;

  try{
      const user=await userdb.findOne({
        email: email
    })

    if (user){
        const passverify= bcrypt.compare(user.pass,pass)
        if (passverify){
            try{
                const token=jwt.sign({
                    user:user.email
                },jwtsecret);
                res.status(200).json({
                    message: "Your now logged in as student", verifytoken: token
                })

            }catch(e){
                res.status(400).json({
                    message:"unable to sign the jwt"
                })
            }
        }else{
            res.status(301).json({
                message:"wrong password "
            })
        }
    }else{
        res.status(300).json({
            message:`NO user found of this email ${req.body.email}`
        })
    }
  }catch(e){
    res.status(500).json({
        message:"sorry our backed is down "
    })
  }

})

module.exports={ userRouter};