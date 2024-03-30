import { useState } from "react";

export const Login =()=>{
    const [user, setUser]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    
    
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
 }else{
    setUser("")
 }

}

    return(

        <>
        <h2>Register:</h2>
        <form onSubmit={handleSubmit}>
        <input type="email" value ={email}onChange={handleEmailChange}/>
        <input type="password"value={password}onChange={handlePasswordChange} id="password" name="password"/>
    <button type="submit">Logga in</button>
    </form>
        
        </>
    )
}
