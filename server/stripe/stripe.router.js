const express = require("express")
const { createChecoutSession } = require("./stripe.controllers")

const router = express.Router()

router.post("/create-checkout-session", createChecoutSession)

module.exports= router