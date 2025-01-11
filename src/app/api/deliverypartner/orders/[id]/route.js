
import { connectionStr } from "@/app/lib/db";
import { orderSchema } from "@/app/lib/ordersModel";
import { Restaurant } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function GET(req,content){
    const params= await content.params;
    const Id = params.id;
    await mongoose.connect(connectionStr);
    let sucess=false
    let result = await orderSchema.find({deliveryBoy_id:Id});
    if(result){
        let restoData= await Promise.all(
            result.map(async(item)=>{
                let restoInfo={}
                restoInfo.data= await Restaurant.findOne({_id:item.resto_id})
                restoInfo.ammount= item.ammount
                restoInfo.status= item.status
                return restoInfo
            })
        )
        result = restoData
        sucess=true
    }
    return NextResponse.json({result,sucess})
}