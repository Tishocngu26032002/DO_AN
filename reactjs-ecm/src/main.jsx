import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import Cart from "./components/Cart/cart.jsx";
import Home from "./components/HomePages/home-page.jsx";
import ProductDetail from "./components/ProductDetails/product-detail.jsx";
import RegisterForm from "./components/Register/register.jsx";
import LoginForm from "./components/Login/login.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Shipping from "./components/Shipping/shipping.jsx";
import Admin from "./components/Admin/admin.jsx";
import OTPPage from "./components/OTP/otp.jsx";
import ShopGrid from "./components/ShopGrid/shop-grid.jsx";
import OrderHistory from "./components/OrderHistory/order-history.jsx";
import OrderSuccess from "./components/OrderSuccess/order-success.jsx";
import ManageCategory from "./components/Admin/ManageCategory/manage-category.jsx";
import ManageOrder from "./components/Admin/ManageOrder/manage-order.jsx";
import ManageProduct from "./components/Admin/ManageProduct/manage-product.jsx";
import ManageUser from "./components/Admin/ManageUser/manage-user.jsx";
import Report from "./components/Admin/Report/report.jsx";
import ProductionStatistics from "./components/Admin/Statistics/production-statistics.jsx";

import Payment from "./components/Payment/payment.jsx";
const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
rootElement.style.width = "100%";
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Navigate to="/home-page" replace />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/otp" element={<OTPPage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/home-page" element={<Home />} />
          <Route path="/products" element={<ShopGrid />} />
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/manage-category" element={<ManageCategory />} />
          <Route path="/manage-order" element={<ManageOrder />} />
          <Route path="/manage-product" element={<ManageProduct />} />
          <Route path="/manage-user" element={<ManageUser />} />
          <Route path="/report" element={<Report />} />
          <Route
            path="/production-statistics"
            element={<ProductionStatistics />}
          />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
