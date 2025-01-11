import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

function CustomerHeader({ cartData, removeCartData, removeCartFullData}) {
    const cartStorage = localStorage.getItem("cart") && JSON.parse(localStorage.getItem("cart"));
    const [cartNumber, setCartNumber] = useState(cartStorage?.length);
    const [cartItem, setCartItem] = useState(cartStorage);
    const userStorage = localStorage.getItem("userData") && JSON.parse(localStorage.getItem("userData"));
    const [user, setUser] = useState(userStorage ? userStorage : undefined)
    const router=useRouter();
    useEffect(() => {
        if (cartData) {
            if (cartNumber) {
                if (cartItem[0].resto_id != cartData.resto_id) {
                    localStorage.removeItem("cart");
                    setCartNumber(1)
                    setCartItem([cartData])
                    localStorage.setItem("cart", JSON.stringify([cartData]))

                } else {
                    let localCartItem = cartItem;
                    localCartItem.push(JSON.parse(JSON.stringify(cartData)));
                    setCartItem(localCartItem)
                    setCartNumber(cartNumber + 1)
                    localStorage.setItem("cart", JSON.stringify(localCartItem))
                }
            } else {
                setCartNumber(1);
                setCartItem([cartData])
                localStorage.setItem("cart", JSON.stringify([cartData]))
            }
        }
    }, [cartData])

    useEffect(() => {
        if (removeCartData) {
            let localCartItem = cartItem.filter((item) => {
                return item._id != removeCartData
            })
            setCartItem(localCartItem);
            setCartNumber(cartNumber - 1);
            localStorage.setItem("cart", JSON.stringify(localCartItem))
            if (localCartItem.length == 0) {
                localStorage.removeItem("cart");
            }
        } else {
            return
        }
    }, [removeCartData])

    const logout =()=>{
        localStorage.removeItem("userData");
        router.push('/user-auth')
    }

    useEffect(()=>{
        if(removeCartFullData){
            setCartItem([]);
            setCartNumber(0);
            localStorage.removeItem("cart");
        }
    },[removeCartFullData])
    return (
        <div className="header-wrapper">
            <div className="logo">
                <img src="https://media.istockphoto.com/id/981368726/vector/restaurant-food-drinks-logo-fork-knife-background-vector-image.jpg?s=612x612&w=0&k=20&c=9M26CBkCyEBqUPs3Ls5QCjYLZrB9sxwrSFmnAmNCopI=" style={{ width: 80 }} alt="" />
            </div>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                {
                    user ? <>
                        <li>
                            <Link href='/myprofile'>{user?.name}</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </> :
                        <>
                            <li>
                                <Link href='/user-auth'>Login</Link>
                            </li>
                            <li>
                                <Link href='/user-auth'>Signup</Link>
                            </li>
                        </>
                }
                <li>
                    <Link href={cartNumber ? "/cart" : "#"}>Cart({cartNumber ? cartNumber : 0})</Link>
                </li>
                <li>
                    <Link href={'/restaurant'}>Add Restaurant</Link>
                </li>
                <li>
                    <Link href={'deliverypartner'}>Delivery Partner</Link>
                </li>
            </ul>
        </div>
    )
}

export default CustomerHeader
