const loggedIn = (req, res, next)=> {

    if(!req.session.customers){
        return res.status(401).json("You are not logged in")
    }
    next()
}
module.exports= {loggedIn}