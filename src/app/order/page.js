"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import { DELIVERY_CHARGES, TAX } from "../lib/constant"
import { useRouter } from "next/navigation";

function Page() {
    const userdata= localStorage.getItem("userData");
    const [userStorage, setUserStorage]= useState(JSON.parse(userdata));
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")))
    const [total] = useState(cartStorage?.length == 1 ? cartStorage[0].price : cartStorage?.reduce((a, b) => {
        return a.price + b.price
    }))

    const [removeCartData, setRemoveCartData]= useState(false);
    const router= useRouter();

    useEffect(()=>{
        if(!total){
            router.push('/')
        }
    },[total])

    const orderNow = async()=>{
        let user_id= JSON.parse(localStorage.getItem("userData"))._id
        let cart= JSON.parse(localStorage.getItem("cart"))
        let city= JSON.parse(localStorage.getItem("userData")).city
        let resto_id= cart[0].resto_id
        let foodItemIds= cart.map((item)=>item._id)
        foodItemIds=foodItemIds.toString();
        let result=await fetch("http://localhost:3000/api/deliverypartner/"+city);
        let deliveryboydata= result.json();
        let deliveryBoyIds= deliveryboydata.map((item)=>item._id)
        let deliveryBoy_ID= deliveryBoyIds[Math.floor(Math.random()*deliveryBoyIds.length)]
        let deliveryBoy_id= deliveryBoy_ID;
        if(!deliveryBoy_ID){
            alert("delivery partner not available")
            return false;
        }
        let collection={
            user_id,
            resto_id,
            foodItemIds,
            deliveryBoy_id,
            status:"confirm",
            ammount: total+ DELIVERY_CHARGES+(total *TAX/100)
        }

        let response= await fetch("/api/order",{
            method: 'POST',
            body: JSON.stringify(collection)
        })

        response = await response.json();
        if(response.sucess){
            alert("order confirmed")
            setRemoveCartData(true);
            router.push('myprofile');
        }else{
            alert("order failed");
        }
    }
    return (
        <div>
            <CustomerHeader removeCartFullData={removeCartData}/>
            <div className="total-wrapper">
                <div className="block-1">
                    <h2>User Details</h2>
                    <div className="row">
                        <span>Name: </span>
                        <span>{userStorage.name}</span>
                    </div>

                    <div className="row">
                        <span>Address: </span>
                        <span>{userStorage.address}</span>
                    </div>

                    <div className="row">
                        <span>Mobile: </span>
                        <span>{userStorage.contact}</span>
                    </div>

                    <h2>Ammount Details</h2>
                    <div className="row">
                        <span>Tax: </span>
                        <span>{total * TAX / 100}</span>
                    </div>
                    <div className="row">
                        <span>Delivery Charges: </span>
                        <span>{DELIVERY_CHARGES}</span>
                    </div>
                    <div className="row">
                        <span>Total Ammount: </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>

                    <h2>Payment Method:</h2>
                    <div className="row">
                        <span>Cash On Delivery </span>
                        <span>{total + DELIVERY_CHARGES + (total * TAX / 100)}</span>
                    </div>
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Place Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Page

