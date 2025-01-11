const { default: mongoose } = require("mongoose");


const UserModel= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    city:String,
    address:String,
    contact:Number
})

export const UserSchema= mongoose.models.users || mongoose.model('users',UserModel)