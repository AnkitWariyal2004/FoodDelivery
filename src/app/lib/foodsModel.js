const { default: mongoose } = require("mongoose");


const foodModel = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    img_path:String,
    resto_id:mongoose.Schema.Types.ObjectId
    });

    export const foodSchema = mongoose.models.foods || mongoose.model("foods", foodModel)