import React from "react";
import ReactDOM from "react-dom/client";
import Cart  from "./components/Cart/Cart.jsx";
import Home from './components/HomePages/homepage.jsx'
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProductDetail from "./components/ProductDetails/productdetail.jsx";
import Payment from "./components/Payment/payment.jsx"
import "./index.css";
import RegisterForm from "./components/Register/register.jsx";
import LoginForm from "./components/Login/login.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Shipper from "./components/Shipper/shipper.jsx";
import ManageCategory from "./components/Admin/ManageCategory/managecategory.jsx"
import ManageUser from "./components/Admin/ManageUser/manageuser.jsx";
import ManageProduct from "./components/Admin/ManageProduct/manageproduct.jsx";
import ManageOrder from "./components/Admin/ManageOrder/ManageOrder.jsx";
import Report from "./components/Admin/Report/Report.jsx";
// Create a client
const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
rootElement.style.width = "100%";
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
      
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" replace />} />
          <Route path="/homepage" element={<Home />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/shipper" element={<Shipper />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/productdetail" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/managecategory" element={<ManageCategory />} />
          <Route path="/manageuser" element={<ManageUser />} />
          <Route path="/manageproduct" element={<ManageProduct />} />
          <Route path="/manageorder" element={<ManageOrder />} />
          <Route path="/report" element={<Report />} />
          

          {/* <Route path="/products" element={<ShopGrid />} /> */}
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
