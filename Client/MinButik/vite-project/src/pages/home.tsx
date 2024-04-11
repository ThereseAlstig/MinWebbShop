import { useEffect, useState } from "react"
import { Porducts } from "../class/products"
import { Stores } from "../class/store"

export const Home =()=>{

   
    const[products, setProducts]=useState<Porducts[]>([])
    const[cartItem, setCartItem]= useState<Porducts[]>([])
      const [user, setUser] = useState("");
      const [email, setEmail]= useState("");
      const [name, setName]= useState("");
      const [password, setPassword]= useState("");
      const [registred, setRegistred]= useState(false)
      const [error, setError]= useState<string | null>(null)
      const [customerId, setCustomerId]= useState("")
      const [postalCode, setPostalCode]= useState("")
      const [stores, setStores] = useState<Stores[] | null>(null);
      const[selectedStore, setSelectedStore]= useState<Stores | null>(null)
     
   useEffect(()=>{
      
      try{
       const authorize =async()=>{
       const response = await fetch("http://localhost:3001/api/auth/authorised",{
       credentials: "include"
       })
     
     const data = await response.json()
     if(response.status=== 200){
      
      setUser(data)
      console.log(user, "användare")
        console.log(data.email)
        console.log(data.id.id, "rätt")
        setCustomerId(data.id.id)
        console.log(customerId)
        localStorage.setItem('customerId', customerId);
      
     }else{
     
    }}
    authorize()
    }catch(error){
      console.error("Någonting misslyckades")
    } }
    , [])
   
       
    const handleEmailChange = (e: any) => {
       setEmail(e.target.value);
   };
    const handleNameChange = (e: any) => {
       setName(e.target.value);
   };
   
   const handlePasswordChange = (e: any) => {
       setPassword(e.target.value);
   };
   
   const handleSubmit = async (e: any) => {
       e.preventDefault();
   
   try{
   const response = await fetch("http://localhost:3001/api/auth/login",
   {
   
   method: "POST",
   headers:{
       "Content-Type": "application/json"
   }, 
   credentials: "include",
   body: JSON.stringify({email: email, password: password})
   })
   const data = await response.json()
   console.log(data)
  
   
   if(response.status=== 200){
   updateUser(data);
   setUser(data)
   setCustomerId(data.id.id)
   console.log(customerId)
 
    localStorage.setItem('customerId', customerId);

   
   }else{
   updateUser("")
   setUser("")
   setError("Fel vid inloggning")
   }
   }catch(error){
      console.error("Fel vid inloggning:", error)
  setError("Ettoväntat fel inträffade")
  }}
   
   
   
   
      const Logout =async ()=>{
   
           const response = await fetch('http://localhost:3001/api/auth/logout',{
               method: "POST",
               credentials: "include",
       })
       const data = await response.json()
       if(response.status===200){   
         setUser("")
         updateUser("")
         localStorage.removeItem('customerId');
          
          console.log("Loged out "+ data )
       }else{
           console.log("You are not loged out")
       }
      }
   
      const CreateUser = async (e: any) => {
       e.preventDefault();
   
   try{
  
   
   const response = await fetch("http://localhost:3001/payments/createUser", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          name: name,
          email: email,
          password: password
      })
  });
  const data2 = await response.json();
  console.log("Create customer response:", data2);
  
  if (response.status === 200) {
     console.log(data2)
     setRegistred(true)
     console.log(registred)

    
  } else {
     setRegistred(false)
      console.error("Failed to create customer:", data2);}
  }catch(error){
  console.error("Error:", error)
  setError("Ett oväntat fel inträffade")
   };
   
   }
    
    const updateUser = (newUser: string)=>{
        setUser(newUser)
        
    }

    useEffect(()=>{
    
      try{
       const authorize =async()=>{
       const response = await fetch("http://localhost:3001/api/auth/authorised",{
       credentials: "include"
       })
     
     const data = await response.json()
     if(response.status=== 200){
     
      setUser(data)
      console.log(user, "användare, hemsida")
        console.log(data)
        console.log(data.id.id, "rätt på hemsidan")
     
      console.log(customerId, "customerID")
      localStorage.setItem('customerId', data.id.id);
     }else{
     
    }}
    authorize()
    }catch(error){
      console.error("Någonting misslyckades")
    } }
    , [])
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
              console.log(user, "hemsidan")
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        };
    
        fetchProducts();
      }, []);




   

const HandlePayment=async()=>{


    const response= await fetch("http://localhost:3001/payments/create-checkout-session",{
    method: "POST",
    headers:{
      "Content-Type": "application/json"
    },
body: JSON.stringify({cartItem, customerId})
})
const data = await response.json()
localStorage.setItem("sessionId", JSON.stringify(data.sessionId))
window.location=data.url
   
}

useEffect(()=>{
  console.log(cartItem)
  console.log(customerId)


},[cartItem])
const addToCart =(product:Porducts)=>{
console.log(product, "product")


const index = cartItem.findIndex(item => item.id === product.id);
  
if (index !== -1) {

  const updatedCart = [...cartItem];
  updatedCart[index].quantity += 1;
  setCartItem(updatedCart);
  console.log(updatedCart, "appadte")
  console.log(cartItem, "all carts")
  
} else {
  const newItem : Porducts = {
    id: product.id,
    name: product.name,
    default_price: {
      unit_amount: product.default_price.unit_amount,
      id: product.default_price.id,
    },
    images: product.images,
    description: product.description,
    quantity: 1,
    object: product.object 
};
 
  setCartItem(prevCart => [...prevCart, newItem]);
  console.log(newItem.quantity, "antal")
 
  console.log(cartItem, "product")
  console.log(newItem)
}
}
const removeFromCart =(productId: string) => {
    setCartItem(cartItem.filter((item) => item.id !== productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: string) => {
    const quantityValue = parseInt(newQuantity, 10)
    if(!isNaN(quantityValue)){
      setCartItem(prevCartItems => prevCartItems.map(item => {
        if (item.id === productId) {
       
            return { ...item, quantity: quantityValue};
    
        }
        return item;
    }));
console.log(cartItem)
    };
  }

  const handlePostCode=(e: any)=>{
    setPostalCode(e.target.value)
    console.log(postalCode)
  
  }

const APIKey = import.meta.env.VITE_MY_API_KEY_POST
  const handlePost = async () => {
    
    const response = await fetch(`https://atapi2.postnord.com/rest/businesslocation/v5/servicepoints/bypostalcode?apikey=${APIKey}&returnType=json&countryCode=SE&postalCode=${postalCode}&context=optionalservicepoint&&numberOfServicePoints=5&responseFilter=public&typeId&callback=jsonp`);
    const jsonResponse = await response.text();

  
    const jsonString = jsonResponse.replace(/^jsonp\(/, '').replace(/\)$/, '');

    const data = JSON.parse(jsonString);
console.log(data)
  
   
   console.log(data, "data")

    console.log(data.servicePointInformationResponse.servicePoints);
    setStores(data.servicePointInformationResponse.servicePoints)
    console.log(stores, "butiker")
}
  
  
    return (

        <div className="HomePage">
      <div className="LogIn">

{!user ? (<><h2>Logga in/registrera dig</h2>
<form onSubmit={handleSubmit}>
<input placeholder="Mejladress"type="email" value ={email}onChange={handleEmailChange}/>
<input placeholder="Namn"type="text" value ={name}onChange={handleNameChange}/>
<input placeholder="Lösenord"type="password"value={password}onChange={handlePasswordChange} id="password" name="password" autoComplete="new-password"/>

{registred && <p>Du är registredad, dags att Logga in</p>}
<button type="submit">Logga in</button>
<button onClick={CreateUser}>Skapa användare</button>
</form>
{error && <p>{error}</p>}</>):(<>
<button onClick={Logout}>Logga ut</button>
    <h2>Du är inloggad</h2>
    </>)}
</div>
        
            <div className="MainOCart">
                <div className="MainHome">
        <h2>Motorcyklar:</h2>

        <ul>

        {products && products.map(product=>(
            <li key={product.id}>
                <h3>{product.name}</h3>
                <img src={product.images} height="150px" alt={product.name} />    
               <p>{product.default_price.unit_amount} kr</p>
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
{!user &&(<p>Du måste vara inloggad för att genomföra köpet</p>)}
        {cartItem &&  cartItem.map(product=>(
            
            <li key={product.id}>
                <h3>{product.name}</h3>
       
                <img src={product.images} height="150px"alt={product.name} />
                <p>{product.default_price.unit_amount} kr</p>
                <p>{product.description}</p>
                <input 
            type="number" 
            min="1" 
            
            value={product.quantity} 
            onChange={(event) => handleQuantityChange(product.id, event.target.value)} 
        />
                <button onClick={()=> removeFromCart(product.id)}>Ta bort</button>
                </li>)
               )}
 </ul>
            
            <button onClick={handlePost}>Hitta utlämningsställe</button>

       
            <input type="text" value={postalCode} onChange={handlePostCode} placeholder="postnummer"/>

<ul>
{stores && stores.map((store: Stores) => (
  <li key={store.name}>

<p>{store.name}</p>
<p>{store.deliveryAddress.streetName} {store.deliveryAddress.streetNumber}</p><p></p>
<p>{store.deliveryAddress.city}</p>
<input type="checkbox" onChange={()=> setSelectedStore(store)}checked={selectedStore===store}/>

</li>)
)}

</ul>
           {selectedStore && user&&( <button onClick={HandlePayment}>Genomför köp</button>)}</div></div>
        </div>
    
    )
}


