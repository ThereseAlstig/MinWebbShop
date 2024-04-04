import { useEffect, useState } from "react"
import { LoggInLoggUt } from "./loginLogut"
import { Porducts } from "../class/products"
import { Price } from "../class/price"

export const Home =()=>{

    const [user, setUser]=useState("")
    const[products, setProducts]=useState<Porducts[]>([])
    const[cartItem, setCartItem]= useState<Porducts[]>([])
    const[price, setPrice]= useState<Price[]>([])
    
    
    const updateUser = (newUser: string)=>{
        setUser(newUser)
        console.log(user)
    }
    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await fetch("http://localhost:3001/payments/products");
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            setProducts(data.products.data);
            console.log(data.products.data)
            console.log(products)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);


    useEffect(() => {
        const fetchPrice = async () => {
          try {
            const response = await fetch("http://localhost:3001/payments/price");
            if (!response.ok) {
              throw new Error('Failed to fetch products');
            }
            const data = await response.json();
            
            setPrice(data);
            console.log(data)
            console.log(price)
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchPrice();
      }, []);

const HandlePayment=async()=>{

  const requestBody = cartItem.map(item => ({
   user: user,
    product: item.default_price,
    quantity: item.quantity 
}));
console.log(requestBody)
    const response= await fetch("http://localhost:3001/payments/create-checkout-session",{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
body: JSON.stringify(requestBody)
})
const data = await response.json()
localStorage.setItem("sessionId",JSON.stringify(data.sessionId))
window.location=data.url
    console.log(data)
}
const addToCart =(product:Porducts)=>{
console.log(product)

setCartItem(
   [...cartItem, product] )
   console.log(cartItem)

}
const removeFromCart =(productId: string) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: string) => {
    setCartItem(prevCartItems => prevCartItems.map(item => {
        if (item.id === productId) {
       
            return { ...item, quantity: parseInt(newQuantity) }; // Uppdatera kvantiteten för den aktuella produkten
        }
        return item;
    }));
};


    return (
        <div className="HomePage">
        <LoggInLoggUt updateUser={updateUser}/>
        
            <div className="MainOCart">
                <div className="MainHome">
        <h2>Motorcyklar:</h2>

        <ul>

        {products && products.map(product=>(
            <li key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.images} height="150px" alt={product.name} />    
                <p>{product.default_price}</p>
                <p>{product.description}</p>
                <button onClick={()=> addToCart(product)}>Lägg i kundvagn</button>
            </li>
        ))}</ul>
        </div>
        
<div className="Cart">
   <h3>Kundkorg</h3>
    <ul>{cartItem && cartItem.length > 0 && (
  <h2>Din beställning:</h2>
)}
{!cartItem || cartItem.length === 0 && (
  <h2>Din Kundkorg är tom</h2>
)}
        {cartItem &&  cartItem.map(product=>(
            
            <li key={product.id}>
                <h3>{product.name}</h3>
       
                <img src={product.images} height="150px"alt={product.name} />
               
                <p>{product.default_price}</p>
                <p>{product.description}</p>
                <input 
            type="number" 
            min="1" 
            defaultValue={1}
            value={product.quantity} 
            onChange={(event) => handleQuantityChange(product.id, event.target.value)} 
        />
                <button onClick={()=> removeFromCart(product.id)}>Ta bort</button>
                </li>)
               )}
 </ul>
             <button onClick={HandlePayment}>Genomför köp</button>
           </div></div>
        </div>
    
    )
}