import { useEffect, useState } from "react";
 interface MyLoggInProps{
   updateUser: (user:string) =>void
 }


export const LoggInLoggUt = ({ updateUser }: MyLoggInProps)=>{


   
    const [user, setUser] = useState("");
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [registerDone, setRegisterDone]=useState(false)
    const [error, setError]= useState<string | null>(null)
   
 useEffect(()=>{
    
    try{
     const authorize =async()=>{
     const response = await fetch("http://localhost:3001/api/auth/authorised",{
     credentials: "include"
     })
   
   const data = await response.json()
   if(response.status=== 200){
    updateUser(data)
    setUser(data)
      console.log(data.email)
      console.log(data)
   }else{
   
  }}
  authorize()
  }catch(error){
    console.error("Någonting misslyckades")
  } }
  , [])
 
     
  const handleEmailChange = (e) => {
     setEmail(e.target.value);
 };
 
 const handlePasswordChange = (e) => {
     setPassword(e.target.value);
 };
 
 const handleSubmit = async (e) => {
     e.preventDefault();
 
 try{
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

 
 if(response.status=== 200){
 updateUser(data);
 setUser(data)
 
 
 
 }else{
 updateUser("")
 setUser("")
 setError("Fel vid inloggning")
 }
 }catch(error){
    console.error("Fel vid inloggning:", error)
setError("Ettoväntat fel inträffade")
}}
 
 
 
 
    const Logout =async ()=>{
 
         const response = await fetch('http://localhost:3001/api/auth/logout',{
             method: "POST",
             credentials: "include",
     })
     const data = await response.json()
     if(response.status===200){   
       setUser("")
       updateUser("")
        
        console.log("Loged out "+ data )
     }else{
         console.log("You are not loged out")
     }
    }
 
    const CreateUser = async (e) => {
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
 




return(
    <>

{!user ? (<><h2>Logga in</h2>
<form onSubmit={handleSubmit}>
<input type="email" value ={email}onChange={handleEmailChange}/>
<input type="password"value={password}onChange={handlePasswordChange} id="password" name="password" autoComplete="new-password"/>
<button type="submit">Logga in</button>
<button onClick={CreateUser}>Skapa användare</button>
</form>
{error && <p>{error}</p>}</>):(<>
<button onClick={Logout}>Logga ut</button>
    <h1>Du är inloggad</h1>
    </>)}
</>
)

}