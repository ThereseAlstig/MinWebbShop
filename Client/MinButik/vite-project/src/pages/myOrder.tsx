import {   useEffect, useState } from "react"
import { OrderProducts } from "../class/order";






export const MyOrder =()=>{
const [user, setUser]=useState<string | null>(null)
const [products, setProducts]= useState<OrderProducts[]>([]);





useEffect(()=>{

    const customerIdFromStorage = localStorage.getItem('customerId');
    

    if (customerIdFromStorage !== null) {
        // Sätt customerId från local storage till state
        setUser(customerIdFromStorage);
       
    console.log(customerIdFromStorage)
    }
}, [])






    const fetchProducts = async () => {

              try {

                if(user !==null){


                
                const response = await fetch(`http://localhost:3001/payments/userOrders/${user}`, {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  credentials: "include",
                
                });
        
                if (!response.ok) {
                  throw new Error('Failed to fetch products');
                  
                }
        
                const data = await response.json(); 
               setProducts(data)
                console.log(products, "din beställning");
            }
            } catch (error) {
                console.error('Error fetching products:', error);
              }
            };
        
      
       
       


   
  

    return(
        <div className="MyOrder">
     
        <h2>My orders</h2>
        {user ? (
<>
            <button onClick={fetchProducts}>Tidigare beställningar</button>
            
<ul><div className="myOrder">
{products.map((product, index)=>(
<li key={index}>
<p>Order nr: {product.orderNumber}</p>
<p>Beställt: {product.date}</p>
<div>
{Array.isArray(product.products) ? (
product.products.map((pro, innerIndex)=> (
   <div key={innerIndex}><p >{pro.description}</p>
            <p>{pro.amount_total} kr</p>
            <p>Antal: {pro.quantity}</p>
            
            </div> 
            ))
):(<p>Inga produkter tillgängliga för denna order</p>
)}
</div>

<h3>Summa beställningar{product.total} kr </h3>

</li>
))}</div>
</ul>
      </>  
        ): (<p>Du måste vara inloggad för att se din beställning</p>)}
        </div>
    )
}