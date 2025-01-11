"use client"
import { useEffect, useState } from "react"
import CustomerHeader from "../_components/CustomerHeader"
import Footer from "../_components/Footer"

function Page() {
const [myOrders,setMyOrders]= useState([]);
  const getMyOrders =async()=>{
    const userStorage= JSON.parse(localStorage.getItem("userData"));

    let response= await fetch("http://localhost:3000/api/order?id="+userStorage._id)
    response= await response.json();
    if(response.sucess){
      setMyOrders(response.result);
    }
  }

  useEffect(()=>{
    getMyOrders();
  },[])
  return (
    <div>
      <CustomerHeader/>
      {
        myOrders && myOrders.map((item, key=0) => (
          <div key={key+1} className="restaurant-wraper" style={{marginLeft:"auto", marginRight:"auto"}}>
            <h4>{item.data.name}</h4>
            <div>Ammount: {item.ammount}</div>
            <div>Address: {item.data.address}</div>
            <div>Status: {item.status}</div>
          </div>
        ))
      }
      <Footer/>
    </div>
  )
}

export default Page
