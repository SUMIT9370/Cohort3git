const mongo=require("mongoose");
require("dotenv").config();
mongo.connect(process.env.mongourl);
const schema=mongo.Schema;


const user=new schema({
    "email": String,
    "pass": String,
    "name": String
    

})

const model=mongo.model("user",user);

module.exports={
    model
}
