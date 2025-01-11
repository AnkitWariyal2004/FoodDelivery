"use client"
import { useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"
import { DELIVERY_CHARGES, TAX } from "../lib/constant"
import { useRouter } from "next/navigation"

function CartPage() {
    const [cartStorage, setCartStorage] = useState(JSON.parse(localStorage.getItem("cart")))
    const router= useRouter();

    const [total] = useState(cartStorage.length == 1 ? cartStorage[0].price : cartStorage.reduce((a, b) => {
        return a.price + b.price
    }))

    const [userdata, setUserData]= useState(JSON.parse(localStorage.getItem("userData")));

    const orderNow =()=>{
        if(userdata){
            router.push("/order");
        }else{
            router.push('/user-auth/?order=ankit')
        }
    }
    return (
        <div>
            <CustomerHeader />
            <div className="food-item-wrapper">
                {
                    cartStorage.length > 0 ? cartStorage.map((item, key) => (
                        <div key={key + 1} className="list-item">
                            <div className="list-item-block-1"><img style={{ width: 200 }} src={item.img_path} alt="image" /></div>
                            <div className="list-item-block-2">
                                <div>{item.name}</div>
                                <div className="description">{item.description}</div>
                                {
                                    <button onClick={() => removeFromCart(item._id)}>Remove to Cart</button>
                                }
                            </div>
                            <div className="list-item-block-3">Price :{item.price}</div>
                        </div>
                    )) : <h1>No food Item added now.</h1>
                }
            </div>

            <div className="total-wrapper">
                <div className="block-1">
                    <div className="row">
                        <span>Food Charges: </span>
                        <span>{total}</span>
                    </div>
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
                </div>
                <div className="block-2">
                    <button onClick={orderNow}>Order Now</button>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CartPage
