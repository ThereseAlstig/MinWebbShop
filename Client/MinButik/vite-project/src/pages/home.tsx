import { useState } from "react"
import { LoggInLoggUt } from "./loginLogut"

export const Home =()=>{

    const [user, setUser]=useState("")
    const updateUser = (newUser: string)=>{
        setUser(newUser)
    }


    return (
        <>
        <LoggInLoggUt updateUser={updateUser}/>
        <h2>Home</h2>
        <p>Produkter</p>
        </>
    )
}