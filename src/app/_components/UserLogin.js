import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react"

function UserLogin({redirect}) {
    const [email,setEmail]= useState("");
    const [password , setPassword]= useState("");
    const router= useRouter();

    


    const handleLogin = async()=>{
      let response =await fetch("http://localhost:3000/api/users/login",{
        method: "POST",
        body:JSON.stringify({email,password})
      })
      response = await response.json();
      if(response.sucess){
        const {result}= response;
        delete result.password;
        localStorage.setItem("userData",JSON.stringify(result));
        if(redirect=="ankit"){
          router.push('/order')
        }else{
          router.push('/');
        }
        
      }else{
        console.log("failed in login")
      }
    }
  return (
    <div>
     <div>
        <div className="input-wrapper"><input className="input-field" type="text" placeholder="Enter email id" value={email} onChange={(e)=>setEmail(e.target.value)}/></div>
        <div className="input-wrapper"><input className="input-field" type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)}/></div>
        <div className="input-wrapper"><button className="button" onClick={handleLogin}>Login</button></div>
      </div>
    </div>
  )
}

export default UserLogin
