const express = require("express")
const { createChecoutSession, getProducts, getPrice, getProductsAndProce, verifySession, CreateCustomer, getUsersLoggedIn, getOrders } = require("./stripe.controllers")

const router = express.Router()

router.post("/create-checkout-session", createChecoutSession)
router.get("/products", getProducts)
router.get("/price", getPrice)

router.post("/verify", verifySession)
router.post("/createUser", CreateCustomer)
router.get("/UserLoggedIN", getUsersLoggedIn)
router.get("/userOrders", getOrders)

module.exports= router