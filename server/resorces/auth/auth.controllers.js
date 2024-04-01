const fetchUsers = require("../../utils/fetchUsers")
const fs = require("fs").promises
const bcrypt = require("bcrypt")

const register = async (req, res)=> {
const {email, password} = req.body


    //Kolla så användaren inte finns 
const users = await fetchUsers()
const userAllreadyExists = users.find(u=> u.email=== email)

if(userAllreadyExists){
    return res.status(400).json("User allready exist")
}

const hashedPassword = await bcrypt.hash(password, 10);
    //om vi får email och lösenord, kryptera lösenordet 
    //sparar användaren

    const newUser ={
        email, 
        password: hashedPassword
    }
    //Skicka tillbaka ett svar
users.push(newUser)
await fs.writeFile("./data/users.json", JSON.stringify(users, null, 2))
res.status(201).json(newUser.email)
}

const login = async (req, res)=>{
//Skicka in lösenord och email kolla mot databasen, finns mejlen?
const {email, password} = req.body


    //Kolla så användaren inte finns 
const users = await fetchUsers()
const userExists = users.find(u=> u.email=== email)
//Kolla så lösenordet stämmer och användaren finns

if(!userExists|| !await bcrypt.compare(password, userExists.password)){
return res.status(400).json("Wrong user eller password")

}
//Logga in användaren starta/skapa en session
req.session.user = userExists // nu görs att paketet sägger cookies och sparar infomrationen

//Skicka tillbaka ett svar

res.status(200).json(userExists.email)
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
module.exports = {register, login, logout, authorize}