
import './App.css';
import Leyout from './Module/Leyout';
import { Navigate, useRoutes } from "react-router";
import Home from './Pages/Home';
//user 
import Product from './Pages/Products';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import ContactPage from './Pages/ContactPage';
import AboutPage from './Pages/AboutPage';
import Cart from './Pages/Cart';
import Checout from './Pages/Checout';
import Order from './Pages/Orders';

//Admin
import AdminProfile from './Pages/admin/Profile';
import CategoriList from './Pages/admin/CategoriList';
import CategoriForm from './Pages/admin/CategoriForm';
import ProductList from './Pages/admin/ProductList';
import ProductForm from './Pages/admin/ProductForm';
import OrderList from './Pages/admin/OrderList';
import OrderDetelis from './Pages/admin/OrderDetelis';
import ProductDetails from './Pages/ProductDetails';
// import { recompileSchema } from '../../Backend/Model/user';

const Routes =(isLoggin,role) =>{
  return [
    
    {
      path: "/",
      element: <Leyout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
         {
          path: "Product",
          element: <Product />,
        },
        
        {
          path: "signup",
          element: <SignUp />,
        },
         {
          path: "login",
          element: <Login />,
        },
         {
          path: "profile",
          element:checkAuth(isLoggin,role, <Profile />),
        },
         {
          path: "contect",
          element: <ContactPage />,
        },
         {
          path: "about",
          element: <AboutPage />,
        },
        {
          path: "/product/:id",
          element:checkAuth(isLoggin,role,<ProductDetails />),
        },
         {
          path: "cart",
          element:checkAuth(isLoggin,role,<Cart />),
        },
        {
           path: "checout",
          element:checkAuth(isLoggin,role,<Checout />),
        },
          {
           path: "order",
          element:checkAuth(isLoggin,role,<Order />),
        },
          {
           path: "admin/profile",
          element:checkAdminAuth(isLoggin,role,<AdminProfile />),
        },
           {
           path: "admin/category",
          element:checkAdminAuth(isLoggin,role,<CategoriList />),
        },
          {
           path: "admin/category/form",
          element:checkAdminAuth(isLoggin,role,<CategoriForm />),
        },
            {
           path: "admin/product",
          element:checkAdminAuth(isLoggin,role,<ProductList />),
        },
           {
           path: "admin/product/form",
          element:checkAdminAuth(isLoggin,role,<ProductForm />),
        },
         {
           path: "admin/product/form/:productId",
          element:checkAdminAuth(isLoggin,role,<ProductForm />),
        },
          {
           path: "admin/order",
          element:checkAdminAuth(isLoggin,role,<OrderList />),
        },
            {
           path: "admin/order/:orderId",
          element:checkAdminAuth(isLoggin,role,<OrderDetelis />),
        },
      ],
    },

  
  ]
}

const checkAuth =(isLoggin,role,element) => {

  if(isLoggin && role==0){
    return element;
  }else if(role!= 0)
  {
      return <Navigate to="/" />

  }
  return <Navigate to="/login" />
}
const checkAdminAuth =(isLoggin,role,element) => {

    if(isLoggin && role==1){
    return element;
  }else if(role!= 1)
  {
      return <Navigate to="/" />

  }
  return <Navigate to="/login" />
}


function App() {
  
  const isLoggin= localStorage.getItem("token") ? true :false;

  const userInfo=JSON.parse(localStorage.getItem("userInfo"))
  const role=userInfo ? userInfo.role:0

  let appRoutes = useRoutes(Routes(isLoggin,role));
  return appRoutes;

}

export default App;
