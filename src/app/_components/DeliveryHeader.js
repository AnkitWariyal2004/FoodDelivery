import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

function DeliveryHeader({name}) {
   
    return (
        <div className="header-wrapper">
            <div className="logo">
                <img src="https://media.istockphoto.com/id/981368726/vector/restaurant-food-drinks-logo-fork-knife-background-vector-image.jpg?s=612x612&w=0&k=20&c=9M26CBkCyEBqUPs3Ls5QCjYLZrB9sxwrSFmnAmNCopI=" style={{ width: 80 }} alt="" />
            </div>
            <ul>
                <li>
                    <Link href="#">{name}</Link>
                </li>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href={'/restaurant'}>Add Restaurant</Link>
                </li>
            </ul>
        </div>
    )
}

export default DeliveryHeader
