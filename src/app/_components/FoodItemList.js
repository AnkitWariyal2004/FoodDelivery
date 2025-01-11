import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

function FoodItemList(props) {
    const router= useRouter();
    const [foodItems, setFoodItems] = useState();
    useEffect(() => {
        loadFoodItems();
    }, [])

    const handleDeleteItem = async(id)=>{
        let response= await fetch("http://localhost:3000/api/restaurant/foods/"+id,{
            method: "DELETE",
        });
        response= await response.json();
        if(response.sucess){
            loadFoodItems();
        }else{
            console.log("food Item not deleted");
        }
    }

    const loadFoodItems = async () => {
        const id= JSON.parse(localStorage.getItem("restaurantUser"));
        const resto_id=id._id;

        JSON.parse(localStorage.getItem("restaurantUser"))
        let response = await fetch("http://localhost:3000/api/restaurant/foods/"+resto_id);
        response = await response.json();
        if (response.sucess) {
            setFoodItems(response.result)
        } else {
            console.logg("food Item list not loading")
            alert("food Item list not loading")
        }
    }
    return (
        <div>
            <h1>Food Items</h1>
            <table>
                <thead>
                    <tr>
                        <td>S.N</td>
                        <td>Name</td>
                        <td>Price</td>
                        <td>Description</td>
                        <td>Image</td>
                        <td>Operations</td>
                    </tr>
                </thead>
                <tbody>

                    {
                       foodItems &&  foodItems.map((item, key=0) => (
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td><img src={item.img_path}/></td>
                                <td><button onClick={()=>handleDeleteItem(item._id)}>Delete</button><button onClick={()=>{router.push('dashboard/'+item._id)}}>Edit</button></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default FoodItemList
