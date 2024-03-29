
import { NavLink } from "react-router-dom"

export const Navigation =()=>{

    return(
        <>
    
        <button> <NavLink to="/">HEM</NavLink></button>
        <button> <NavLink to="/MyOrder">Kundkorg</NavLink></button>
        <button> <NavLink to="/Contacts">Kontakta oss</NavLink></button>
        <button><NavLink to="/Register">Registrera dig</NavLink></button>
        <button> <NavLink to="/Login">Logga in</NavLink></button>
        <button>Logga ut</button>
        </>
    )
}