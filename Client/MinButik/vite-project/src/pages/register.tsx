import { useState } from "react";

export const Register =()=>{
    const [user, setUser]= useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [registerDone, setRegisterDone]=useState(false)
    const [error, setError]= useState<string | null>(null)
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

try{
 const response = await fetch("http://localhost:3001/api/auth/register",
{
    method: "POST",
    credentials: "include",
    headers:{
        "Content-Type": "application/json"
    }, 
    
    body: JSON.stringify({email: email, password: password})
});

 const data = await response.json()
 console.log(data)

 if(response.ok){
    
    setRegisterDone(true);
    console.log(registerDone)
 }else if(response.status=== 400){
   setError("Användaren finns redan")
  }else{ 
   throw new Error("Ett oväntat fel inträffade, var god försök igen senare.")
  }
 }catch(error){
console.error("Error during registration:", error);
setError("Ett oväntat fel inträffade, var god försök igen senare.")
}
};

const HandleLogin =async ()=>{

    try{
const response = await fetch("http://localhost:3001/api/auth/login",
{
    
    method: "POST",
    headers:{
        "Content-Type": "application/json"
    }, 
    credentials: "include",
    body: JSON.stringify({email, password})
})
 const data = await response.json()
 console.log(data)
 console.log(user)

 if(response.ok){
    setUser(data)
 }else{
    setUser("")
 }
}catch(error){
    console.error("Error during login:", error)
}
};
    return(
        <>
        <h2>Skapa en användare:</h2>
        <form onSubmit={handleSubmit}>
        <input type="email" value ={email}onChange={handleEmailChange}/>
        <input type="password"value={password}onChange={handlePasswordChange} id="password" name="password"/>
    <button type="submit">Skapa användare</button>
    </form>
{registerDone && (
   <div>
        <h2>Du är registrerad, logga in:</h2>
        <button onClick={HandleLogin}>Logga in</button>
    </div>
)}
{user && (
    <p>Du är inloggad</p>
)}
{error && !registerDone && <p>{error}</p>}
     </>
    );
};