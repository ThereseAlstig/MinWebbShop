import { NavLink } from "react-router-dom"

export const Navigation =()=>{

    return(
        <>
        <button> <NavLink to="/">HEM</>></button>
        <button>Registrera dig</button>
        <button>Logga in</button>
        <button>Logga ut</button>
        </>
    )
}