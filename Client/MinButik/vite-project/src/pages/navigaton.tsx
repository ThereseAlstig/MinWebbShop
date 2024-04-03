

import { NavLink } from "react-router-dom"





export const Navigation =()=>{



   
    return(
        <>
    <nav>
        <ul>
            <li><NavLink to="/Home">HEM</NavLink></li>
            <li><NavLink to="/MyOrder">BETÄLLNIGNAR</NavLink></li>
            <li><NavLink to="/Contacts">Kontakta oss</NavLink></li>
        </ul></nav>





</>
       
    )
}