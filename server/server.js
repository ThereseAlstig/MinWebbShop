const express = require('express');
const cookieSession = require("cookie-session")
const cors = require("cors")
require("dotenv").config()


const authRouter=require("./resorces/auth/auth.router")
const usersRouter = require("./resorces/users/users.rauter");
const stripeRouter = require("./stripe/stripe.router")
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true  
}));
  
app.use(express.json());
app.use(cookieSession({
secret: "sdr456",
maxAge: 1000* 60* 60, // 1 h

}))

app.use("/payments", stripeRouter)
app.use("/api/users", usersRouter)
app.use("/api/auth", authRouter)



app.listen(3001, ()=>{
    console.log('Server is up on port 3001...')
})