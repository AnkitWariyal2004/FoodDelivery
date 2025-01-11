import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET(req, content){
   let urlid= await content.params
    let id= await urlid.id
    await mongoose.connect(connectionStr) 
    const resto_details= await Restaurant.findOne({_id:id})
    const resto_foodetails= await foodSchema.find({resto_id:id})
    return NextResponse.json({sucess:true,resto_details,resto_foodetails});
}