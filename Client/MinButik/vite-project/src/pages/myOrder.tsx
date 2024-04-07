import {   useState } from "react"






export const MyOrder =()=>{
const [user, setUser]=useState("")




   
   
  

    return(
        <>
     
        <h2>My orders</h2>
        {user ? (

            <p>Här är din beställning</p>
        ): (<p>Du måste vara inloggad för att se din beställning</p>)}
        </>
    )
}