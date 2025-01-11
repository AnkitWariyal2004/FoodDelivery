const { default: mongoose } = require("mongoose");

const restaurantSchema= new mongoose.Schema({
    name: String,
    email:String,
    password:String,
    city:String,
    address:String,
    contact: Number
})

export const Restaurant = mongoose.models.restaurants || mongoose.model("restaurants", restaurantSchema);