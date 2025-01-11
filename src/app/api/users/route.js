import { connectionStr } from "@/app/lib/db";
import { UserSchema } from "@/app/lib/userModel";
import mongoose, { trusted } from "mongoose";
import { NextResponse } from "next/server";
import { GET } from "../customer/route";


export async function POST(req){
    const payload = await req.json();
    let sucess= false;
    await mongoose.connect(connectionStr);
    const user= new UserSchema(payload);
    const result = await user.save();
    if(result){
        sucess=true
    }
    return NextResponse.json({result, sucess});
}

