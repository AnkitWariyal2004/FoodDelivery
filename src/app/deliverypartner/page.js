"use client"
import React, { useEffect, useState } from 'react'
import DeliveryHeader from '../_components/DeliveryHeader';
import { useRouter } from 'next/navigation';

function Page() {
    const [loginphone, setLoginPhone] = useState("");
    const [loginpassword, setLoginPassword] = useState("");
    const [login, setLogin] = useState(false);

const router= useRouter()



    const [password, setPassword] = useState('');
    const [c_password, setc_Password] = useState('')
    const [city, setCity] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleSignup = async () => {
        if (password != c_password) {
            setPasswordError(true);
            return false;
        } else {
            setPasswordError(false);
        }
        if (!password || !c_password || !name || !city || !address || !contact) {
            setError(true);
            return false;
        } else {
            setError(false);
        }
        let response = await fetch("http://localhost:3000/api/deliverypartner/signup", {
            method: "POST",
            body: JSON.stringify({password, city, address, name, contact })
        })
        response = await response.json();
        if (response.sucess) {
            const { result } = response;
            delete result.password;
            localStorage.setItem("delivery", JSON.stringify(result));
            router.push("deliverydashboard")
        }
    }


    const handleLogin = async()=>{
        let response =await fetch("http://localhost:3000/api/deliverypartner/login",{
          method: "POST",
          body:JSON.stringify({loginphone,loginpassword})
        })
        response = await response.json();
        console.log(response)
        if(response.sucess){
          const {result}= response;
          delete result.password;
        localStorage.setItem("delivery", JSON.stringify(result));
          router.push("deliverydashboard")

        }else{
          console.log("failed in login")
        }
      }


      useEffect(()=>{
        if(localStorage.getItem("delivery")){
            router.push("deliverydashboard")
        }
      },[])

    return (
        <div>
            <DeliveryHeader/>
            <h4 style={{ textAlign: "center" }}>Delivery Partner</h4>
            <div className='auth-container'>

                {
                    login ? (
                        <div className='login-wrapper'>
                            <div>
                                <div className="input-wrapper"><input className="input-field" type="number" placeholder="Enter Mobile Number" value={loginphone} onChange={(e) => setLoginPhone(e.target.value)} /></div>
                                <div className="input-wrapper"><input className="input-field" type="password" placeholder="Enter password" value={loginpassword} onChange={(e) => setLoginPassword(e.target.value)} /></div>
                                <div className="input-wrapper"><button className="button" onClick={handleLogin} >Login</button></div>
                            </div>
                        </div>
                    ) : (
                        <div className='signup-wrapper'>


                            <div>

                                <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} /></div>
                                {
                                    error && !name && <span className="input-error">Enter valid Name</span>
                                }

                                <div className="input-wrapper"><input className="input-field" type="Number" placeholder="Enter Contant number" value={contact} onChange={(e) => setContact(e.target.value)} /></div>
                                {
                                    error && !contact && <span className="input-error">Enter valid Contact Number</span>
                                }
                                <div className="input-wrapper"><input className="input-field" type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
                                {
                                    error && !password && <span className="input-error">Enter valid Password</span>
                                }
                                {
                                    passwordError && <span style={{ color: 'red' }}>Passwords do not match</span>
                                }
                                <div className="input-wrapper"><input className="input-field" type="password" placeholder="Confirm Password" value={c_password} onChange={(e) => setc_Password(e.target.value)} /></div>
                                {
                                    error && !c_password && <span className="input-error">Enter valid Confirm Password</span>
                                }
                                {
                                    passwordError && <span style={{ color: 'red' }} className="input-error">Passwords do not match</span>
                                }
                                <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter City" value={city} onChange={(e) => setCity(e.target.value)} /></div>
                                {
                                    error && !city && <span className="input-error">Enter valid City</span>
                                }
                                <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter Full address" value={address} onChange={(e) => setAddress(e.target.value)} /></div>
                                {
                                    error && !address && <span className="input-error">Enter valid Address</span>
                                }
                                <div className="input-wrapper"><button className="button" onClick={handleSignup}>{login ? "Login" : "SignUp"}</button></div>
                            </div>
                        </div>
                    )
                }
                <div style={{ display: "flex", justifyContent: "center" }}>

                    <button onClick={() => setLogin(!login)} className='button' style={{ width: "20%", textAlig: "center" }}>{login ? "Do not have account?SignUp" : "Already Have an Account? Login"}</button>
                </div>

            </div>
        </div>
    )
}

export default Page
