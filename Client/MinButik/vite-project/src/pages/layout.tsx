import {  Outlet } from "react-router-dom"
import { Navigation } from "./navigaton"
import { Footer } from "./footer"





export const Layout =()=>{



    

    return(
        <div className="MainDiv">
        <h1>MC för alla</h1>
        <header>
            <Navigation/>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer>
            <Footer/>
        </footer>
        </div>
    )
}