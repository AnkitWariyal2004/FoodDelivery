import { foodSchema } from "@/app/lib/foodsModel";

const { connectionStr } = require("@/app/lib/db");
const { default: mongoose } = require("mongoose");
const { NextResponse } = require("next/server");



export async function POST(req){
    let sucess=false;
    const payload= await req.json();
    await mongoose.connect(connectionStr);
    const food = new foodSchema(payload);
    const result = await food.save();
    if(result){
        sucess=true;
    }
    return NextResponse.json({result, sucess});
}