"use client"
import { useState } from "react";
import CustomerHeader from "../_components/CustomerHeader";
import Footer from "../_components/Footer";
import UserSignup from "../_components/UserSignup";
import UserLogin from "../_components/UserLogin";
import {useParams, useSearchParams } from "next/navigation";

function UserAuth() {
    const redirect= useSearchParams().get("order")
    const [login, setLogin]= useState(true);
    return (
        <div>
            <CustomerHeader />
            <div className="container">
                <h1>{login ? "User Login": "User SignUp"}</h1>
                {
                    login ? <UserLogin redirect={redirect}/> : <UserSignup redirect={redirect}/>
                }
                <button className="button" style={{width:"20%"}} onClick={()=>setLogin(!login)}>{login?"DO not have Account? Sign up":"Already have Account? Login"}</button>
            </div>
            <Footer />
        </div>
    )
}

export default UserAuth;
