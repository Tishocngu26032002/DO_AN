import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ShopGrid from './components/ShopGrid/ShopGrid.jsx';
import ProductManagement from "./components/ProductManagement/ProductManagement.jsx";
import './index.css';
import Cart from "./components/Cart/Cart.jsx";
import Home from "./components/HomePages/homepage.jsx";
import ProductDetail from "./components/ProductDetails/productdetail.jsx";
import "./index.css";
import RegisterForm from "./components/Register/register.jsx";
import LoginForm from "./components/Login/login.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Shipper from "./components/Shipper/shipper.jsx";
import Admin from "./components/Admin/admin.jsx";

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
          <Route path="/admin" element={<Admin />} />
          <Route path="/shipper" element={<Shipper />} />
          <Route path="/productmanagement" element={<ProductManagement />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/productdetail" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/products" element={<ShopGrid />} /> */}
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
