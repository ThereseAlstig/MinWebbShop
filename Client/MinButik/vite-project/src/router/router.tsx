import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../pages/layout";
import { NotFound } from "../pages/notFound";
import { Home } from "../pages/home";
import { MyOrder } from "../pages/myOrder";
import { Contacts } from "../pages/contsact";



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

 element: <MyOrder/>,
    path:  "/MyOrder",   
}

]
},
]);

export default Router;