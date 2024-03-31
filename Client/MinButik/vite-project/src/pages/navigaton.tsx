
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"

export const Navigation =()=>{
   const [user, setUser]= useState<string>("");

useEffect(()=>{
   const authorize =async()=>{
   const response = await fetch("http://localhost:3001/api/auth/authorize",{
   credentials: "include"
   })
 
 const data = await response.json()
 if(response.status=== 200){
    setUser(data)
    console.log(user)
 }else{
    setUser("")
}}
authorize()
}
, [])

   const Logout =async ()=>{

        const response = await fetch('http://localhost:3001/api/auth/logout',{
            method: "POST",
            credentials: "include",
            
    })
    if(response.status===200){
        setUser("")
       console.log("Loged out ")
    }else{
        console.log("You are not loged out")
    }
   }
    return(
        <>
    
        <button> <NavLink to="/">HEM</NavLink></button>
        <button> <NavLink to="/MyOrder">Kundkorg</NavLink></button>
        <button> <NavLink to="/Contacts">Kontakta oss</NavLink></button>
        <button><NavLink to="/Register">Registrera dig</NavLink></button>
        <button> <NavLink to="/Login">Logga in</NavLink></button>
        <button onClick={Logout}>Logga ut</button>
        </>
    )
}