const express = require("express")
const { createChecoutSession, getProducts, getPrice } = require("./stripe.controllers")

const router = express.Router()

router.post("/create-checkout-session", createChecoutSession)
router.get("/products", getProducts)
router.get("/price", getPrice)

module.exports= router