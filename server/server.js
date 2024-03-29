const express = require('express');
const cookieSession = require("cookie-session")
//


const authRouter=require("./resorces/auth/auth.router")
const usersRouter = require("./resorces/users/users.rauter");

const app = express();

app.use(express.json());
app.use(cookieSession({
secret: "sdr456",
maxAge: 1000* 60* 60, // 1 h

}))


app.use("/api/users", usersRouter)
app.use("/api/auth", authRouter)



app.listen(3001, ()=>{
    console.log('Server is up on port 3001...')
})