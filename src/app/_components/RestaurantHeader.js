"use client"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react"

function RestaurantHeader() {
  const [details, setDetails] = useState();
  const router = useRouter();
  const pathName= usePathname();
  useEffect(() => {
    let data = localStorage.getItem("restaurantUser");
    if (!data && pathName=="/restautant"){
      router.push('/restaurant');
    } else if(data && pathName=="/restautant"){
      router.push("/restaurant/dashboard");
    }else{
      setDetails(JSON.parse(data));
    }
  },[])

  const logout=()=>{
    localStorage.removeItem("restaurantUser");
    router.push("/restaurant");
  }
  return (
    <div className="header-wrapper">
      <div className="logo">
        <img style={{ width: 60 }} src="https://th.bing.com/th?id=OIP.KoIOlZ1D3LUqKXRa4Plx9AHaHU&w=251&h=248&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="this is an image" />
      </div>
      <ul>
        <li>
          <Link href={"/restaurant"}>Home</Link>
        </li>
        {
          details && details.name ? <>
            <li><button onClick={logout}>Logout</button></li>
            <li>
              <Link href={"/"}>Profile</Link>
            </li>
          </> :
            <li>
              <Link href={"/restaurant"}>Login/Signup</Link>
            </li>
        }

      </ul>
    </div>
  )
}

export default RestaurantHeader
