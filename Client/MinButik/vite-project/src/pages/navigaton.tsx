
import  { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"





export const Navigation =()=>{
   
   const [user, setUser]= useState<string>("");



useEffect(()=>{
   
    const authorize =async()=>{
    const response = await fetch("http://localhost:3001/api/auth/authorised",{
    credentials: "include"
    })
  
  const data = await response.json()
  if(response.status=== 200){
    setUser(data)
     
     console.log(data)
  }else{
     setUser("")
 }}
 authorize()
 }
 , [user])

    


   const Logout =async ()=>{

        const response = await fetch('http://localhost:3001/api/auth/logout',{
            method: "POST",
            credentials: "include",
    })
    const data = await response.json()
    if(response.status===200){   
      
       setUser("")
       console.log(user)
       console.log("Loged out "+ data )
    }else{
        console.log("You are not loged out")
    }
   }
   
    return(
        <>
    <nav>
        <ul>
            <li><NavLink to="/Home">HEM</NavLink></li>
            <li><NavLink to="/MyOrder">Kundkorg</NavLink></li>
            <li><button onClick={Logout}>Logga ut</button></li>
            <li><NavLink to="/Register">Registrera dig</NavLink></li>
            <li><NavLink to="/Login">Logga in</NavLink></li>
            <li><NavLink to="/Contacts">Kontakta oss</NavLink></li>
        </ul></nav></>
    )
}