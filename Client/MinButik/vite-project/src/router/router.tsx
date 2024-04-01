import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/layout";
import { NotFound } from "../pages/notFound";
import { Home } from "../pages/home";
import { MyOrder } from "../pages/myOrder";
import { Contacts } from "../pages/contsact";
import { Login } from "../pages/loginPage";
import { Register } from "../pages/register";




const Router = createBrowserRouter([
{
    path: "/",
    element: <Layout/>,
    errorElement: <NotFound/>,
    children: [
{

 element: <Contacts/>,
    path:  "/Contacts",   
},
{

 element: <Home/>,
    path:  "/Home",   
},
{

 element: <MyOrder/>,
    path:  "/MyOrder",   
},
{

 element: <Login/>,
    path:  "/Login",   
}
,
{

 element: <Register/>,
    path:  "/Register",   
}

]
},
]);

export default Router;