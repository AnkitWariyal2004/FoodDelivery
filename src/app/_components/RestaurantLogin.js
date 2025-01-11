import { useRouter } from "next/navigation";
import { useState } from "react"


function RestaurantLogin() {
  const[email, setEmail]= useState("");
  const[password, setPassword]= useState("");
  const[error, setError]= useState(false);
  const router= useRouter();

  const handleLogin = async()=>{
    if(!email || !password){
      setError(true);
    }else{
      setError(false);
    }
    let response =await fetch("http://localhost:3000/api/restaurant",{
      method: "POST",
      body:JSON.stringify({email,password,login:true})
    })

    response= await response.json();
    if(response.sucess){
      const {result}= response;
      delete result.password;
      localStorage.setItem("restaurantUser",JSON.stringify(result));
      router.push('/restaurant/dashboard');
    }else{
      console.log("sucess not come")
    }
  }

  return (
    <>
      <h3>Login component</h3>
      <div>
        <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter email id" value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
        <div className="input-wrapper"><input className="input-field" type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/></div>
        <div className="input-wrapper"><button className="button" onClick={handleLogin}>Login</button></div>
      </div>
    </>
  )
}

export default RestaurantLogin
