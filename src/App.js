import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import { useEffect } from "react";
import Footer from "./components/home/Footer/Footer";
import FooterBottom from "./components/home/Footer/FooterBottom";
import Header from "./components/home/Header/Header";
import HeaderBottom from "./components/home/Header/HeaderBottom";
import SpecialCase from "./components/SpecialCase/SpecialCase";
import About from "./pages/About/About";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Home from "./pages/Home/Home";
import Journal from "./pages/Journal/Journal";
import Offer from "./pages/Offer/Offer";
import Payment from "./pages/Cart/Payment";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Shop from "./pages/Shop/Shop";
import Profile from "./components/Profile/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Shipping from "./pages/Cart/Shipping";
import ConfirmOrder from "./pages/Cart/ConfirmOrder";
import VerifyPayment from "./pages/Verify/VerifyPayment";
import { store } from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import ProtectedRoute from "./pages/ProtectedRoute";
import Orders from "./components/Orders/Orders";
import UpdatePassword from "./components/Profile/UpdatePassword";
import UpdateProfile from "./components/Profile/UpdateProfile";
import ForgotPassword from "./components/Profile/ForgotPassword";
import NewPassword from "./components/Profile/NewPassword";
import OrderDetails from "./components/Orders/OrderDetails";
import OrderProductDetail from "./pages/ProductDetails/OrderProductDetail";
import Dashboard from "./pages/Admin/Dashboard";
import NewProduct from "./pages/Admin/NewProduct";
import ProductsList from "./pages/Admin/ProductsList";
import UpdateProduct from "./pages/Admin/UpdateProduct";
import OrdersList from "./pages/Admin/OrdersList";
import ProcessOrder from "./pages/Admin/ProcessOrder";
import UsersList from "./pages/Admin/UsersList";
import UpdateUser from "./pages/Admin/UpdateUser";
import ProductReviews from "./pages/Admin/ProductReviews";
const apiURL = process.env.REACT_APP_URL


const Layout = () => {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Header />
      <HeaderBottom />
      <SpecialCase />
      <ScrollRestoration />
      <Outlet />
      <Footer />
      <FooterBottom />
    </div>
  );
};
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        {/* ==================== Header Navlink Start here =================== */}
        <Route index element={<Home />}></Route>
        <Route path="/shop" element={<Shop />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route path="/journal" element={<Journal />}></Route>
        {/* ==================== Header Navlink End here ===================== */}
        <Route path="/category/:category" element={<Offer />}></Route>
        <Route path="/product/:id" element={<ProductDetails />}></Route>
        <Route path="/order/product/:id" element={<OrderProductDetail/>}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/password/forgot" Component={ForgotPassword}/>
        <Route path="/password/reset/:token" Component={NewPassword}/>
        <Route element={<ProtectedRoute/>}>
          <Route path="/shipping" element={<Shipping />}></Route>
          <Route path="/order/confirm" element={<ConfirmOrder/>} />
          <Route path="/payment" element={<Payment />}></Route>
          <Route path="/me" element={<Profile/>} />
          <Route path="/me/update" element={<UpdateProfile/>} />
          <Route path="/password/update/" element={<UpdatePassword/>}/>
          <Route path="/orders/me" element={<Orders />}></Route>
          <Route path="/order/:id" element={<OrderDetails/>}></Route>
          <Route path="/dashboard" isAdmin={true} element={<Dashboard/>}></Route>
          <Route path="/admin/product" isAdmin={true} element={<NewProduct/>}></Route>
          <Route path="/admin/products" isAdmin={true} element={<ProductsList/>}></Route>
          <Route path="/admin/product/:id" isAdmin={true} element={<UpdateProduct/>}></Route>
          <Route path="/admin/orders" isAdmin={true} element={<OrdersList/>}></Route>
          <Route path="/admin/order/:id" isAdmin={true} element={<ProcessOrder/>}></Route>
          <Route path="/admin/users" isAdmin={true} element={<UsersList/>}></Route>
          <Route path="/admin/user/:id" isAdmin={true} element={<UpdateUser/>}></Route>
          <Route path="/admin/reviews" isAdmin={true} element={<ProductReviews/>}></Route>
        </Route>
        <Route path="/verify" element={<VerifyPayment/>}></Route>
      </Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Route>
  )
);

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);
  return (
    <div className="font-bodyFont">
      <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
