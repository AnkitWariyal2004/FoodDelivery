import { connectionStr } from "@/app/lib/db";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req){
    let queryParams= req.nextUrl.searchParams
    let filter={}
    if(queryParams.get("location")){
        let city=queryParams.get("location")
        filter={city:{$regex: new RegExp(city,'i')}}
    }else if(queryParams.get("restaurant")){
        let name=queryParams.get("restaurant")
        filter={name:{$regex: new  RegExp(name, 'i')}}
    }
    await mongoose.connect(connectionStr)
    let result =await Restaurant.find(filter)
    return NextResponse.json({result,sucess:true})
}