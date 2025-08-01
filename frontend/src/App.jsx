import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AccessDenied from "./pages/access-denied";
import { Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";

import ScrollToTop from "./components/common/scroll-to-top";

import AuthLayout from "./components/_auth/layout";
import Login from "./pages/_auth/login";
import Register from "./pages/_auth/register";

import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminBanners from "./pages/admin-view/banners";

import CustomerLayout from "./components/customer-view/layout";
import Home from "./pages/customer-view/home";
import Listing from "./pages/customer-view/listing";
import Checkout from "./pages/customer-view/checkout";
import Account from "./pages/customer-view/account";

import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import { checkAuth } from "./store/auth-slice";
import Product from "./pages/customer-view/product";


function App() {

  const dispatch = useDispatch()

  // Get global state auth
  const {user, isAuthenticated, isLoading} = useSelector(state=>state.auth);
  
  // Validate session every re-render
  useEffect(() => {
    dispatch(checkAuth());
  }, []
  );

  // Loading
  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Toaster/>
      <ScrollToTop/>
      <Routes>
        {/* ==== Auth Routes ===== */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>
              <Route path="login" element={<Login/>}/>
              <Route path="register" element={<Register/>}/>
        </Route>


        {/* ==== Admin Routes ===== */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
              <Route path="dashboard" element={<AdminDashboard/>}/>
              <Route path="products" element={<AdminProducts/>}/>
              <Route path="orders" element={<AdminOrders/>}/>
              <Route path="banners" element={<AdminBanners/>}/>
        </Route>


        {/* ==== Customer Routes ===== */}
        <Route path="/" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <CustomerLayout/>
          </CheckAuth>
        }>
              <Route path="" element={<Home/>}/>
              <Route path="/product/:id" element={<Product/>}/>
              <Route path="products" element={<Listing/>}/>
              <Route path="checkout" element={<Checkout/>}/>
              <Route path="account" element={<Account/>}/>
              {/* ==== AccessDenied ===== */}
              <Route path="/access-denied" element = {<AccessDenied/>}/>
        </Route>
        {/* ==== NotFound ===== */}
        <Route path="*" element = {<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
