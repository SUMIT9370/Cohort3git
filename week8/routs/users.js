const router= require("express");
const userRouter=router();

userRouter.post("/signup", async function(req, res){
    res.json({
        message: "now you are at signup page "
    })
})
userRouter.post("/signin",async function(req, res){
    res.json({
        message:" now you are at signin page"
    })
})

module.exports={ userRouter:userRouter};