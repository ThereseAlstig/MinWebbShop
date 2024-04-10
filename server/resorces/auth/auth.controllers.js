const fetchUsers = require("../../utils/fetchUsers")
const fs = require("fs").promises
const bcrypt = require("bcrypt")



const login = async (req, res)=>{
//Skicka in lösenord och email kolla mot databasen, finns mejlen?
const {email, password} = req.body


    //Kolla så användaren inte finns 
const users = await fetchUsers()
const userExists = users.find(u=> u.email=== email)


if(!userExists|| !await bcrypt.compare(password, userExists.password)){
return res.status(400).json("Wrong user eller password")

}

req.session.user = userExists 



res.status(200).json(userExists)
}

const logout = (req, res)=>{
    req.session = null
    res.status(200).json("Succsessfully logged out")
}

const authorize = (req, res)=>{
    if(!req.session.user){
        return res.status(401).json("You are not logged in")
    }
res.status(200).json(req.session.user)

}
module.exports = { login, logout, authorize}