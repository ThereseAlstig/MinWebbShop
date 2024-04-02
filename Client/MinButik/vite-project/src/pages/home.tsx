import { useState } from "react"
import { LoggInLoggUt } from "./loginLogut"

export const Home =()=>{

    const [user, setUser]=useState("")
    const updateUser = (newUser: string)=>{
        setUser(newUser)
    }
const HandlePayment=async()=>{

    const response= await fetch("http://localhost:3001/payments/create-checkout-session",{
        
    method: "POST"

})
const data = await response.json()
window.location=data.url
    console.log(data)
}

    return (
        <>
        <LoggInLoggUt updateUser={updateUser}/>
        <h2>Home</h2>
        <p>Produkter</p>
        <button onClick={HandlePayment}>Genomför köp</button>
        </>
    )
}