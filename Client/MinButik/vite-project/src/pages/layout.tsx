import {  Outlet } from "react-router-dom"
import { Navigation } from "./navigaton"
import { Footer } from "./footer"

export const Layout =()=>{
    return(
        <>
        <header>
            <Navigation/>
        </header>
        <main>
            <Outlet/>
        </main>
        <footer>
            <Footer/>
        </footer>
        </>
    )
}