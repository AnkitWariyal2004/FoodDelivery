import { connectionStr } from "@/app/lib/db"
import mongoose from "mongoose"
import { Restaurant } from "@/app/lib/restaurantModel";
import { NextResponse } from "next/server";
export const GET = async () => {
    await mongoose.connect(connectionStr);
    const data = await Restaurant.find();

    return NextResponse.json({ result: data });

}

export const POST = async (req) => {
    let payload = await req.json();
    await mongoose.connect(connectionStr);
    let data;
    let sucess=false;
    if (payload.login) {
        //use it for login api
        data = await Restaurant.findOne({ email: payload.email, password: payload.password});
        if(data){
            sucess=true;
        }
    } else {
        //use it for register(signup) api
        data = new Restaurant(payload);
        await data.save();
        if(data){
            sucess=true;
        }
    }
    return NextResponse.json({ result: data, sucess});
}

