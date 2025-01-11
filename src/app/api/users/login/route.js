import { connectionStr } from "@/app/lib/db";
import { UserSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";




export async function POST(req){
    const payload = await req.json();
    let sucess =false;
    await mongoose.connect(connectionStr);
    const result = await UserSchema.findOne({email:payload.email,password:payload.password});
    if(result){
        sucess=true
    }
    return NextResponse.json({result,sucess});
}