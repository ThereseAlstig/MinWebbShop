import { useEffect, useState } from "react";
import {useHistory} from 'react-router-dom'



export const Login =()=>{
    const [user, setUser]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
const history= useHistory();
  useEffect(()=>{
    
    const authorize =async ()=>{

        try {
            const response = await fetch("http://localhost:3001/api/auth/authorised", {
                credentials: "include",
                
            });
            const data = await response.json()
            if (response.status === 200) {
               setUser(data)
                console.log("inloggningen" + data);
               
            } else {
                console.log("Inloggningen");
            }
        } catch (error) {
            console.error("Ett fel uppstod vid inloggningen:", error);
        }}
authorize()
    },[user])
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


 const response = await fetch("http://localhost:3001/api/auth/login",
{
    
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    }, 
    credentials: "include",
    body: JSON.stringify({email: email, password: password})
})
 const data = await response.json()
 console.log(data)
 console.log(user)

 if(response.status=== 200){
    setUser(data)
history.push('/MyOrder')
   
   
 }else{
    setUser("")
 }
}

    return(

        <>
      <> <h2>Logga in</h2>
        <form onSubmit={handleSubmit}>
        <input type="email" value ={email}onChange={handleEmailChange}/>
        <input type="password"value={password}onChange={handlePasswordChange} id="password" name="password" autoComplete="new-password"/>
    <button type="submit">Logga in</button>
    </form></>
   
        
    
        </>
    )
}
