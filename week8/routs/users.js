const router= require("express");
const userRouter=router();
const z= require("zod");
const bcrypt=require("bcrypt");



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
    res.json({
        message:" now you are at signin page"
    })
})

module.exports={ userRouter};