const mongo=require('mongoose');
const schema=mongo.Schema;

const userSchema=new schema({
    email: {type: String,unique:true},
    pass:String,
    name: String
})

const userm1=mongo.model("users",userSchema);
module.exports={userm1};