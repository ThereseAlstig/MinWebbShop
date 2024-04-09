import {   useEffect, useState } from "react"






export const MyOrder =()=>{
const [user, setUser]=useState<string | null>(null)




useEffect(()=>{

    const customerIdFromStorage = localStorage.getItem('customerId');
    

    if (customerIdFromStorage !== null) {
        // Sätt customerId från local storage till state
        setUser(customerIdFromStorage);
       
    console.log(customerIdFromStorage)
    }
}, [])





   
   
  

    return(
        <>
     
        <h2>My orders</h2>
        {user ? (

            <p>Här är din beställning</p>
        ): (<p>Du måste vara inloggad för att se din beställning</p>)}
        </>
    )
}