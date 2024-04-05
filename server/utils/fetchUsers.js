const fs = require("fs").promises

const fetchUsers= async ()=>{
    
const data= await fs.readFile("./data/users.json")
const costumers = JSON.parse(data)
return costumers
}
module.exports = fetchUsers