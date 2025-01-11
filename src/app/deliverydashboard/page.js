"use client"
import { useEffect, useState } from "react"
import DeliveryHeader from "../_components/DeliveryHeader"
import { useRouter } from "next/navigation"
import Footer from "../_components/Footer"

function Page() {
  const [deliveryData, setDeliveryData]= useState(localStorage.getItem("delivery") && JSON.parse(localStorage.getItem("delivery")))
  const router = useRouter()
  useEffect(()=>{
          if(!deliveryData){
              router.push("deliverypartner")
          }else{
            getMyOrders();
          }
        },[])
  const name= deliveryData.name


  const [myOrders,setMyOrders]= useState([]);
  const getMyOrders =async()=>{
    const deliveryStorage= deliveryData

    let response= await fetch("http://localhost:3000/api/deliverypartner/orders/"+deliveryStorage._id)
    response= await response.json();
    if(response.sucess){
      setMyOrders(response.result);
    }
  }


  return (
    <div>
      <DeliveryHeader name={name}/>
      <h3 style={{textAlign:"center"}}>Order List</h3>
      {
        myOrders && myOrders.map((item, key=0) => (
          <div key={key+1} className="restaurant-wraper" style={{marginLeft:"auto", marginRight:"auto"}}>
            <h4>{item.data.name}</h4>
            <div>Ammount: {item.ammount}</div>
            <div>Address: {item.data.address}</div>
            <div>Status: {item.status}</div>
            <div>
              Update Status
              <select onChange={(e)=>updateStatus(item._id,e.target.value)}>
                <option value="pending">Pending</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      }
      <Footer/>
    </div>
  )
}

export default Page
