import { connectionStr } from "@/app/lib/db";
import { DeliveryPartnerSchema } from "@/app/lib/deliverypartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function POST(req){
    const payload = await req.json();
    let sucess =false;
    await mongoose.connect(connectionStr);
    const result = await DeliveryPartnerSchema.findOne({contact:payload.loginphone,password:payload.loginpassword});
    if(result){
        sucess=true
        return NextResponse.json({result,sucess});
    }else{
        return NextResponse.json({result:"nothing came", sucess})
    }

}