import { connectionStr } from "@/app/lib/db";
import { DeliveryPartnerSchema } from "@/app/lib/deliverypartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content){
    let city=  content.params.city;
    let sucess= false;
    mongoose.connect(connectionStr);
    let filter= {city :{$regex: new RegExp(city,'i')}}
    let result = await DeliveryPartnerSchema.find(filter);
    if(result){
        sucess = true
        return NextResponse.json({ sucess , result });
    }else{
        return NextResponse.json({result:"data not fethched", sucess:false})
    }
}