"use client"
import CustomerHeader from "@/app/_components/CustomerHeader";
import Footer from "@/app/_components/Footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page(props) {
    const [restaurantDetails, setRestaurantDetails] = useState("")
    const [foodItems, setFoodItems] = useState([]);
    const [cartData, setCartData]= useState();

    const [cartStorage,setCartStorage]= useState(JSON.parse(localStorage.getItem("cart")));
    const [cartIds, setCartIds]= useState(cartStorage? ()=>cartStorage.map((item)=>{
        return item._id
    }):[])



    const[removeCartData,setRemoveCartData]= useState("");

    const name = useParams().name;
    console.log(useParams())
    useEffect(() => {
        loadRestorantDetails();
    }, [])

    const loadRestorantDetails = async () => {
        const urlid = await props.searchParams
        const id = urlid.id
        let response = await fetch(`http://localhost:3000/api/customer/${id}`)
        response = await response.json();
        if (response.sucess) {
            setRestaurantDetails(response.resto_details);
            setFoodItems(response.resto_foodetails)
        }
    }


    const addtoCart =(item)=>{
        let localCartIds=cartIds;
        localCartIds.push(item._id);
        setCartIds(localCartIds)
        setCartData(item);
        setRemoveCartData();
    }


    const removeFromCart =(id)=>{
        setRemoveCartData(id)
        let localIds= cartIds.filter(item=>item!=id);
        setCartData();
        setCartIds(localIds);
        // setCartData();
    }
    return (
        <div>
            <CustomerHeader cartData={cartData} removeCartData={removeCartData}/>
            <div className="restaurant-page-banner">
                <h1>{name}</h1>
            </div>
            <div className="detail-wrapper">
                <h4>Contact :{restaurantDetails.contact}</h4>
                <h4>Address :{restaurantDetails.address}</h4>
                <h4>Email :{restaurantDetails.email}</h4>
                <h4>City :{restaurantDetails.city}</h4>
            </div>
            <div className="food-item-wrapper">
                {
                   foodItems.length>0? foodItems.map((item, key) => (
                        <div key={key + 1} className="list-item">
                            <img style={{ width: 200 }} src={item.img_path} alt="image" />
                            <div>
                                <div>{item.name}</div>
                                <div>{item.price}</div>
                                <div className="description">{item.description}</div>
                                {
                                    cartIds.includes(item._id)?<button onClick={()=>removeFromCart(item._id)}>Remove to Cart</button>:<button onClick={()=>addtoCart(item)}>Add to Cart</button>
                                }
                            </div>

                        </div>
                    )):<h1>No food Item added now.</h1>
                }
            </div>
            <Footer />
        </div>
    )
}

export default Page
