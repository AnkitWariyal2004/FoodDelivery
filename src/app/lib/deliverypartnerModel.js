const { default: mongoose } = require("mongoose");


const DeliveryModel= new mongoose.Schema({
    name:String,
    password:String,
    city:String,
    address:String,
    contact:Number
})

export const DeliveryPartnerSchema= mongoose.models.deliverypartners || mongoose.model('deliverypartners',DeliveryModel)