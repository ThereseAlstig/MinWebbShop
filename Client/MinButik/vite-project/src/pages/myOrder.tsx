import {   useState } from "react"
import { LoggInLoggUt } from "./loginLogut"





export const MyOrder =()=>{
const [user, setUser]=useState("")

const updateUser = (newUser: string)=>{
    setUser(newUser)
}


   
   
  

    return(
        <>
        <LoggInLoggUt updateUser={updateUser}/>
        <h2>My orders</h2>
        {user ? (

            <p>Här är din beställning</p>
        ): (<p>Du måste vara inloggad för att se din beställning</p>)}
        </>
    )
}