const express = require("express")
const { getUsers } = require("./users.controllers")
const router = express.Router()
const {loggedIn} = require("../../middleware/loddegin")
router.get("/", loggedIn, getUsers)


module.exports= router