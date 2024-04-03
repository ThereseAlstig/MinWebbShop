
const initStripe =require("../stripe")

const createChecoutSession =async(req, res)=>{

   const cart = req.body
   const stripe = initStripe()
   const session = await stripe.checkout.sessions.create({
      mode:"payment",
      line_items:cart.map(item=>{
         return{
            price: item.product,
            quantity: item.quantity
         }
      }),
      success_url:"http://localhost:5173/ConfirmOrder",
      cancel_url:"http://localhost:5173/Home"
   })
   res.status(200).json({url: session.url, sessionId: session.id})
}

const getProducts = async(req, res)=>{
   const stripe = initStripe()
const products = await stripe.products.list({
  limit: 4,

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


module.exports= {createChecoutSession, getProducts, getPrice}
