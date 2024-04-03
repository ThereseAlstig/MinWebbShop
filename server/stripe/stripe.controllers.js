
const initStripe =require("../stripe")

const createChecoutSession =async(req, res)=>{
   if (!Array.isArray(req.body)) {
      return res.status(400).json({ error: 'Invalid cart data' });
   }
   const cart = req.body
   const stripe = initStripe()
   try{
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
}catch(error){
   console.error('Error creating checkout session:', error)
   res.status(500).json({error: 'Failed to create checkout session'})
}
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
