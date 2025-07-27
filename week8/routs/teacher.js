const teacher=require("express");
const teacherRouter=teacher();
const z=require("zod");
const jwt=require("jsonwebtoken");
const bcrypt= require("bcrypt");
require("dotenv").config();
const jwtsecret=process.env.Teacher_JWT_SECRET;
const {coureRouter}= require ("../routs/courses");
teacherRouter.use("/course",coureRouter);


const {teacherdb}=require ("../db");

teacherRouter.post("/signup", async function (req, res) {
    const requirezod= z.object({
        email:z.string().email().max(100).min(10),
        name : z.string().max(100).min(2),
        pass: z.string().max(50).min(6)

    })
//dfldks


//jkfsdhf


    const bodycheck=requirezod.safeParse(req.body);
    if (!bodycheck.success){
        res.status(300).json({
            message: "invalid input", error : bodycheck.error
        })
    }

   

    const { email, pass, name } = req.body;

    try {
        const hashpass = await bcrypt.hash(pass, 2);
        const data = await teacherdb.create({
            email,
            name,
            pass: hashpass
        });

        return res.status(200).json({
            message: "Your account was created as teacher "
        });

    } catch (e) {
        console.error("Signup error:", e);
        return res.status(500).json({
            message: "Unable to create account"
        });
    }
    
})

teacherRouter.post("/signin",async function(req, res){
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
      const user=await teacherdb.findOne({
        email: email
    })

    if (user){
        const passverify= bcrypt.compare(user.pass,pass)
        if (passverify){
            try{
                const token=jwt.sign({
                    user:user._id
                },jwtsecret);
                res.status(200).json({
                    message: "Your now logged in as teacher", verifytoken: token
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


module.exports={teacherRouter};

//new changes for test
