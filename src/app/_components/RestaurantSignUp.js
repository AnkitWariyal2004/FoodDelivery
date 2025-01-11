'use client'
import { useRouter } from "next/navigation";
// import { fetchExternalImage } from "next/dist/server/image-optimizer";
import { useState } from "react"

function RestaurantSignUp() {
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [c_password, setc_Password]= useState('')
  const [city, setCity]= useState('')
  const [address, setAddress]= useState('')
  const [contact, setContact]= useState('')
  const [name, setName]= useState('');
  const router= useRouter();
  const [error, setError]= useState(false);
  const [passwordError, setPasswordError]= useState(false);

  const handleSignup =async()=>{
    if(password!=c_password){
      setPasswordError(true);
      return false;
    }else{
    setPasswordError(false);
    }
    if(!email || !password ||!c_password || !name || !city || !address || !contact){
      setError(true);
      return false;
    }else{
      setError(false);
    }
    // console.log(email, password, city, address, contact, name);
    let response =await fetch("http://localhost:3000/api/restaurant",{
      method: "POST",
      body:JSON.stringify({email,password,city,address,name,contact})
    })
    response = await response.json();
    if(response.sucess){
      const {result}= response;
      delete result.password;
      localStorage.setItem("restaurantUser",JSON.stringify(result));
      router.push('/restaurant/dashboard');
    }
  }
  return (
    <>
    <h3>Login component</h3>
    <div>
      <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter email id" value={email} onChange={(e)=>setEmail(e.target.value)} /></div>
      {
        error && !email && <span className="input-error">Enter valid email</span>
      }
      <div className="input-wrapper"><input className="input-field" type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} /></div>
      {
        error && !password && <span className="input-error">Enter valid Password</span>
      }
      {
        passwordError && <span style={{color: 'red'}}>Passwords do not match</span>
      }
      <div className="input-wrapper"><input className="input-field" type="password" placeholder="confirm password" value={c_password} onChange={(e)=>setc_Password(e.target.value)} /></div>
      {
        error && !c_password && <span className="input-error">Enter valid Confirm Password</span>
      }
      {
        passwordError && <span style={{color: 'red'}} className="input-error">Passwords do not match</span>
      }
      <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter restaurant name" value={name} onChange={(e)=>setName(e.target.value)}/></div>
      {
        error && !name && <span className="input-error">Enter valid Restaurant Name</span>
      }
      <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter city" value={city} onChange={(e)=>setCity(e.target.value)}/></div>
      {
        error && !city && <span className="input-error">Enter valid City</span>
      }
      <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter full address" value={address} onChange={(e)=>setAddress(e.target.value)}/></div>
      {
        error && !address && <span className="input-error">Enter valid Address</span>
      }
      <div className="input-wrapper"><input className="input-field" type="number" placeholder="Enter contant number" value={contact} onChange={(e)=>setContact(e.target.value)}/></div>
      {
        error && !contact && <span className="input-error">Enter valid Contact Number</span>
      }
      <div className="input-wrapper"><button className="button" onClick={handleSignup}>Login</button></div>
    </div>
    </>
  )
}

export default RestaurantSignUp
