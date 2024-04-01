import {  createContext, useEffect, useState } from "react";
import { Layout } from "./layout";
import { Login } from "./loginPage";
import { Navigation } from "./navigaton";

interface AuthContextType{
    isLoggedIn:string;
    login:()=> void;
    logout: ()=>void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: "",
    login:()=> {},
    logout: ()=> {}
});

const AuthProvider=()=>{

    const[isLoggedIn, setIsLoggedIn]= useState<string>("");
  

    const logout = async () => {
        console.log("Ja den aropas")
        try {
            const response = await fetch("http://localhost:3001/api/auth/authorised", {
                credentials: "include",
                
            });
            const data = await response.json()
            if (response.status === 200) {
                setIsLoggedIn("")
                console.log("Utloggning lyckades" + data);
            } else {
                console.log("Utloggning misslyckades");
            }
        } catch (error) {
            console.error("Ett fel uppstod vid utloggning:", error);
        }

    };
    const login = async () => {
        console.log("Ja den aropas")
        try {
            const response = await fetch("http://localhost:3001/api/auth/authorised", {
                credentials: "include",
                
            });
            const data = await response.json()
            if (response.status === 200) {
                setIsLoggedIn(data);
                console.log("Inloggningen lyckades" + data);
            } else {
                console.log("Inloggningen misslyckades");
            }
        } catch (error) {
            console.error("Ett fel uppstod vid inloggningen:", error);
        }

    };
    useEffect(()=>{
        const authorize =async()=>{
        const response = await fetch("http://localhost:3001/api/auth/authorised",{
        credentials: "include"
        })
      
      const data = await response.json()
      if(response.status=== 200){
        setIsLoggedIn(data)
         console.log(isLoggedIn)
         console.log(data)
      }else{
         setIsLoggedIn("")
     }}
     authorize()
     }
     , [isLoggedIn])

     return(
        <AuthContext.Provider value={{isLoggedIn, login, logout}}>
           <Layout/>
           <Login/>
           <Navigation />
        </AuthContext.Provider>
     )
}

export {AuthContext, AuthProvider};
