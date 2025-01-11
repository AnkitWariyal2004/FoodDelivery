import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(){
    await mongoose.connect(connectionStr)
    let result = await Restaurant.find()
    result= result.map((item)=>item?.city?.charAt(0).toUpperCase()+item?.city?.slice(1));
    result =[...new Set(result.map((item)=>item))]
    return NextResponse.json({result, sucess:true});
}