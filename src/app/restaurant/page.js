'use client'
import './style.css'
import { useState } from "react"
import RestaurantLogin from "../_components/RestaurantLogin"
import RestaurantSignUp from "../_components/RestaurantSignUp"
import RestaurantHeader from "../_components/RestaurantHeader"
import Footer from '../_components/Footer'

const Restaurant = () => {
    const [login, setlogin] = useState(false);
    return (
        <>  
        <RestaurantHeader/>
        <div className="container">
            <h1>This is Restaurant page (login and sign up page)</h1>
            {
                login ? <RestaurantLogin /> : <RestaurantSignUp />
            }
            <div>
                <button className="button-link" onClick={() => setlogin(!login)}>{
                    login ? "Do not have account? SignUp" : "Already have account. Login"
                }</button>
            </div>
        </div>
        <Footer/>
        </>

    )
}

export default Restaurant