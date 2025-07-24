const router= require("express");
const coursesrouter=router();

coursesrouter.get("/allcourse",async function (req, res){
    res.json({
        message:"you are at all coureses"
    })
})
coursesrouter.get("/freecources",async function (req, res){
    res.json({
        message:"you are at all free coureses"
    });
})

module.exports={coureRouter: coursesrouter
};


// hi i am sumit 