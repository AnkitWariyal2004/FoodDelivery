import { useRouter } from "next/navigation";
import { useState } from "react"

function AddFootItem({setAddItem}) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [path, setPath] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError]= useState(false);
    const router = useRouter();
    const handleAddFoodItem = async () => {
        if(!name || !price || !path || !description){
            setError(true)
            return false;
        }else{
            setError(false);
        }
        const restaurantData = JSON.parse(localStorage.getItem("restaurantUser"))
        let resto_id;
        if (restaurantData) {
            resto_id = restaurantData._id
        }
        let response = await fetch("http://localhost:3000/api/restaurant/foods", {
            method: "POST",
            body: JSON.stringify({ name, price, img_path: path, resto_id,description})
        });
        response = await response.json();
        if (response.sucess) {
            console.log("Food Item sucessfully added")
            setAddItem(false)
            
        }else{
            console.log("food Item not added")
        }
    }
    return (
        <div className="container">
            <h1>Add New Food Item</h1>
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
                <button className="button" onClick={handleAddFoodItem}>Add Food Item</button>
            </div>
        </div>
    )
}

export default AddFootItem
