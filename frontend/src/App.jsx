import { Route, Routes } from "react-router-dom";

import AuthLayout from "./components/_auth/layout";
import Login from "./pages/_auth/login";
import Register from "./pages/_auth/register";

import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";

import CustomerLayout from "./components/customer-view/layout";
import Home from "./pages/customer-view/home";
import Listing from "./pages/customer-view/listing";
import Checkout from "./pages/customer-view/checkout";
import Account from "./pages/customer-view/account";

import NotFound from "./pages/not-found";


function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1>Header</h1>
      <Routes>
        {/* ==== Auth Routes ===== */}
        <Route path="/auth" element={<AuthLayout/>}>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>

        {/* ==== Admin Routes ===== */}
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="dashboard" element={<AdminDashboard/>}/>
          <Route path="products" element={<AdminProducts/>}/>
          <Route path="orders" element={<AdminOrders/>}/>
          <Route path="features" element={<AdminFeatures/>}/>
        </Route>

        {/* ==== Customer Routes ===== */}
        <Route path="/shop" element={<CustomerLayout/>}>
          <Route path="" element={<Home/>}/>
          <Route path="listing" element={<Listing/>}/>
          <Route path="checkout" element={<Checkout/>}/>
          <Route path="account" element={<Account/>}/>
        </Route>

        {/* ==== NotFound ===== */}
        <Route path="*" element = {<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
