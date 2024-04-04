import { useEffect, useState } from "react"

export const ConfirmOrder=()=>{
const [verified, setVerified]=useState(false)
const[isLoading, setIsLoading]=useState(true)


useEffect (()=>{
  if(!verified){
    const verifySession =async ()=>{
        let sessionId;
const dataFromLocalStorage = (localStorage.getItem("sessionId"))
if(dataFromLocalStorage){
    sessionId= JSON.parse(dataFromLocalStorage)
}

const response= await fetch("http://localhost:3001/payment/verify",
{
    method: "POST",
    headers: {
        "content_type": "application.json"
    },
    body: JSON.stringify({sessionId})
})
const data = await response.json()
    if(response.ok){
setVerified(data.verified)
setIsLoading(false)
    }

    }
    verifySession();
  }  
},[])


    return(
        <div>
<h3>{verified && !isLoading ? "Tack för ditt köp! ": "Loading..."}</h3>

        </div>
    )
}