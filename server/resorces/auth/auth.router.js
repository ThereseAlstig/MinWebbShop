const express = require('express')
const { login, logout, authorize } = require('./auth.controllers')


const router = express.Router()


router.post("/login", login)
router.post("/logout", logout)
router.get("/authorised", authorize)


module.exports= router