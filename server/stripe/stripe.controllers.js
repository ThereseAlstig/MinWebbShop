
const initStripe =require("../stripe")
const fs=require("fs").promises
const fetchUsers = require("../utils/fetchUsers")
const bcrypt = require("bcrypt")



const createChecoutSession =async(req, res)=>{
  
   const {cartItem, customerId} = req.body;
 
   const stripe = initStripe()
   try{
   const session = await stripe.checkout.sessions.create({
      
      mode:"payment",
      customer: customerId,
      line_items:cartItem.map(item=>{
         return{
            price: item.default_price.id,
            quantity: item.quantity,
            
         }
      }),
   allow_promotion_codes: true,
      success_url:"http://localhost:5173/ConfirmOrder",
      cancel_url:"http://localhost:5173/Home"
   })
   res.status(200).json({url: session.url, sessionId: session.id})
}catch(error){
   console.error('Error creating checkout session:', error)
   res.status(500).json({error: 'Failed to create checkout session'})
}
}
const retrieveCupon=async(reg, res)=>{
const coupon = await stripe.coupons.retrieve('promo_1P2vxOJHp8hcttsG6vqrTFYU');
}


const verifySession = async(req, res)=>{
   const stripe = initStripe()
   const sessionId = req.body.sessionId


   const session = await stripe.checkout.sessions.retrieve(sessionId)

   if(session.payment_status === "paid"){
   const lineItems = await stripe.checkout.sessions.listLineItems(sessionId)

         const order ={
         orderNumber: Math.floor(Math.random()*100000),
         customerName: session.customer_details.name,
         customer: session.customer,
         products: lineItems.data,
         total: session.amount_total,
         date:new Date()
      }
      
      const orders= JSON.parse(await fs.readFile("./data/orders.json"))
      orders.push(order)
      await fs.writeFile("./data/orders.json", JSON.stringify(orders, null, 4))
   }
   console.log(session)
   res.status(200).json({verified: true})
}

const CreateCustomer=async (req, res)=>{
   const stripe = initStripe()
   const {email, password, name} = req.body

   if(!password){
      return res.status(400).json("Password is required")
   }
   const  customers = await fetchUsers()
   console.log(customers)
   const customerAllreadeExist= customers.find(c=> c.email===email)

   if(customerAllreadeExist){
      return res.status(400).json("User allrady exist")
   }
   const hashedPassword = await bcrypt.hash(password, 10);
 const stripeCustomer = await stripe.customers.create  ({
   
   name,
   email
   
 });
 const newCustomer= {
   id: stripeCustomer,
   name,
   email,
   password: hashedPassword
 }

 customers.push(newCustomer)
await fs.writeFile("./data/users.json", JSON.stringify(customers, null, 4))

 res.status(200).json({customers: stripeCustomer})
 console.log('./data/orders.json')
}




const getProducts = async(req, res)=>{
   const stripe = initStripe()
const products = await stripe.products.list({
  limit: 4,
 expand:["data.default_price"] 

})
res.status(200).json({products})
}


const getPrice = async(req, res)=>{
   const stripe = initStripe()
const price = await stripe.prices.list({
  limit: 4,

})
res.status(200).json({price})
}

const getUsersLoggedIn = async(req, res)=>{
   
   const stripe = initStripe()
   const customers = await stripe.customers.search({
     name: "ösdlkjflakjgla",
      email: "therese.alstig@gmail.com",
    
    });

   if(customers.data.length > 0 ){
      const user = customers.data[0]
      res.status(200).json({user})
   }
}

const getOrders = async (req, res)=>{
   const {id} = req.body
   try{
 const orders= JSON.parse(await fs.readFile("./data/orders.json"))
   const userOrders = orders.find(order => order.customer === id)
   if(userOrders.length> 0){
      res.status(200).json(userOrders)
   }else{
      res.status(404).json({message: "User does not exist in orders"})
   }
   }catch(error){
      console.error("Error retrieving orders:", error)
      res.status(500).json({ message: "Error retrieving orders." });
   }
  
   }




module.exports= {getOrders, retrieveCupon, createChecoutSession, getProducts, getPrice, getUsersLoggedIn, verifySession, CreateCustomer}
