import { useEffect, useState } from "react"

export const ConfirmOrder=()=>{
  
        const [verified, setVerified] = useState(false)
        const [isLoading, setIsLoading] = useState(true)
    
        useEffect(() => {
            if (!verified) {
                
                const verifySession = async () => {
                    
                    let sessionId;
                    const dataFromLs = localStorage.getItem("sessionId")
                    console.log(sessionId)
    
                    if (dataFromLs) {
                        sessionId = JSON.parse(dataFromLs)
                    }
    
                    const response = await fetch("http://localhost:3001/payments/verify", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ sessionId })
                    })
    
                    const data = await response.json()
    
                    if (response.ok) {
                        setVerified(data.verified)
                        setIsLoading(false)
                    }
                }
    
                verifySession()
            }
        }, [verified])
    
    
        return (
            <div>
                <div>{verified && !isLoading ? (
                    <>
                    <h2>TACK FÖR DITT KÖP VI LEVERERAR SÅ SNART VI KAN </h2> 
                    <img src="./public/cartoon-574_256.gif" alt="loading"/></>
                    ):(<img src="./public/loading-7528_512.gif" alt="loading"/>) }</div>
            </div>
        )
    }

 