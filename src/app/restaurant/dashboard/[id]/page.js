"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react"

function EditFootItem(props) {
    const params= useParams();
    const id= params?.id
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError]= useState(false);
    const router = useRouter();


    useEffect(()=>{
        handleLoadFoodItem();
    },[])

    const handleLoadFoodItem = async ()=>{
        let response = fetch("http://localhost:3000/api/restaurant/foods/edit/"+id);
        const data = await (await response).json();
        console.log(data);
        if(data.sucess){
            setName(data.result.name); 
            setPrice(data.result.price);
            setPath(data.result.img_path);
            setDescription(data.result.description);
        }
    }
    const handleEditFoodItem = async () => {
        if(!name || !price || !path || !description){
            setError(true)
            return false;
        }else{
            setError(false);
            console.log(id)
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods/edit/"+id,{
            method: "PUT",
            body:JSON.stringify({name,price,img_path:path,description})
        })
        const data = await response.json();

        if(data.sucess){
            console.log("data updated");
            alert("data updated with these valuses: "+name+" "+price+" "+ path+" "+description)
            router.push('./')

        }else{
            console.log("data not upated");
        }
    }
    return (
        <div className="container">
            <h1>Update Food Item</h1>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="enter food name" value={name} onChange={(e) => setName(e.target.value)} />
                {
                    error && !name && <span className="input-error">Please Enter Name</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="Number" className="input-field" placeholder="Enter Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                {
                    error && ! price && <span className="input-error">Please Enter Price</span>
                }
            </div>
            <div className="input-wrapper">
                <input type="link" className="input-field" placeholder="Enter Image path" value={path} onChange={(e) => setPath(e.target.value)} />
                {
                    error && !path && <span className="input-error">Please Enter Image path </span>
                }
            </div>
            <div className="input-wrapper">
                <input type="text" className="input-field" placeholder="Enter Descriptions" value={description} onChange={(e) => setDescription(e.target.value)} />
                {
                    error && !description && <span className="input-error">Please Enter Description</span>
                }
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={()=>handleEditFoodItem()}>Update Item</button>
            </div>
            <div className="input-wrapper">
                <button className="button" onClick={()=>router.push('../dashboard')}>Back to Dashboard</button>
            </div>
        </div>
    )
}

export default EditFootItem
