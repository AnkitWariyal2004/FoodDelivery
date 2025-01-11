import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req, content){
    const id=await content.params;
    const resto_id= id.id
    let sucess=false;
    await mongoose.connect(connectionStr);
    const result= await foodSchema.findOne({_id:resto_id})
    if(result){
        sucess=true
    }else{
        sucess=false
    }
    console.log(sucess)
    return NextResponse.json({result,sucess});
}


export async function PUT(req, contene){
    const urlid= await contene.params
    const id= urlid.id;
    console.log(id)
    let sucess=false;
    await mongoose.connect(connectionStr)
    const data = await req.json();
    const result = await foodSchema.findOneAndUpdate({_id:id},{$set:data})
    if(result){
        sucess=true
        }
        return NextResponse.json({result,sucess});
}

