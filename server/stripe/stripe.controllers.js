
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

module.exports= {createChecoutSession}
