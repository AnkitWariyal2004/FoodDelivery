"use client"
import { useEffect, useState } from "react";
import CustomerHeader from "./_components/CustomerHeader";
import Footer from "./_components/Footer";
import { useRouter } from "next/navigation";

export default function Home() {

  const [locations, setLocations] = useState([])
  const [selectedlocations, setSelectedLocations] = useState();
  const [showlocation, setShowLocation] = useState(false);
  const [restaurants, setRestaurants] = useState([]);
  const router= useRouter()
  useEffect(() => {
    loadLocations();
    loadRestaurants();
  }, [])

  const loadLocations = async () => {
    let response = await fetch("http://localhost:3000/api/customer/locations")
    response = await response.json();
    if (response.sucess) {
      setLocations(response.result)
    }
  }


  const loadRestaurants = async (params) => {
    let url = "http://localhost:3000/api/customer";
    if (params?.location) {
      url = url + "?location=" + params.location;
    } else if (params?.restaurant) {
      url = url + "?restaurant=" + params.restaurant;
    }
    let response = await fetch(url)
    response = await response.json();
    if (response.sucess) {
      setRestaurants(response.result)
    }

  }

  const handleListItem = (item) => {
    setSelectedLocations(item)
    setShowLocation(false)
    loadRestaurants({ location: item });

  }
  return (
    <main>
      <CustomerHeader />
      <div className="main-page-banner">
        <h1 style={{ textAlign: "center" }}>Food Delivery App</h1>
        <div className="input-wrapper">

          <input type="text" placeholder="Select place" className="select-input" value={selectedlocations} onClick={() => setShowLocation(true)} />
          <ul className="location-list">
            {
              showlocation && (locations.map((item, key = 0) => (
                <li key={key + 1} onClick={() => handleListItem(item)}>{item}</li>
              )))
            }
          </ul>


          <input type="text" placeholder="Enter food or restaurant name" className="select-search" onChange={(event) => loadRestaurants({restaurant:event.target.value})} />
        </div>
      </div>
      <div className="restaurant-list-container">
        {
          restaurants.map((item, key) => (
            <div className="restaurant-wraper" key={key + 1} onClick={()=>router.push(`explore/${item.name}/.?id=${item._id}`)}>
              <div className="heading-wrapper">
                <h3>{item.name}</h3>
                <h5>Contanct: {item.contact}</h5>
              </div>
              <div className="addresss-wrapper">
                <div>
                  {item.city},
                </div>
                <div className="address">
                  {item.address}, Email: {item.email}
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <Footer />
    </main>

  );
}
