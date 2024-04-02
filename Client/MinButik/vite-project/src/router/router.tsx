import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/layout";
import { NotFound } from "../pages/notFound";
import { Home } from "../pages/home";
import { MyOrder } from "../pages/myOrder";
import { Contacts } from "../pages/contsact";
import { ConfirmOrder } from "../pages/confirmOrder";





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

 element: <ConfirmOrder/>,
    path:  "/ConfirmOrder",   
},
]
},
]);

export default Router;