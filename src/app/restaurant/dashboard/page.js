"use client"
import RestaurantHeader from "@/app/_components/RestaurantHeader"
import './../style.css';
import AddFootItem from "@/app/_components/AddFootItem";
import { useState } from "react";
import FoodItemList from "@/app/_components/FoodItemList";
function Dashboard() {
  const [addItem, setAddItem] = useState(false);
  return (
    <div>
      <RestaurantHeader />
      <button onClick={()=>setAddItem(true)}>Add Food</button>
      <button onClick={()=>setAddItem(false)}>Dashboard</button>
      {
        addItem ? <AddFootItem setAddItem={setAddItem}/> : <FoodItemList/>

      }
    </div>
  )
}

export default Dashboard
