import { connectionStr } from "@/app/lib/db";
import { foodSchema } from "@/app/lib/foodsModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";



export async function GET(request,content){
    let sucess=false;
    await mongoose.connect(connectionStr);
    const id=await content.params;
    const resto_id= id.id
    const data = await foodSchema.find({resto_id});
    if(data){
        sucess=true;
    }
    return NextResponse.json({result:data,sucess});
}


export async function DELETE(req, content){
    const urlid= await content.params
    const id= urlid.id;
    let sucess= false;
    await mongoose.connect(connectionStr);
    let result = await foodSchema.deleteOne({_id:id})
    if(result.deletedCount>0){
        sucess=true
    }
    return NextResponse.json({result, sucess});
}

