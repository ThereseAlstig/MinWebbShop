import { useContext } from "react"
import { AuthContext } from "./authContext"




export const MyOrder =()=>{



    return(
        <>
        <h2>My orders</h2>
        {isLoggedIn ? (

            <p>Här är din beställning</p>
        ): (<p>Du måste vara inloggad för att se din beställning</p>)}
        </>
    )
}