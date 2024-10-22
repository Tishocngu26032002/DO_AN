import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes, NavLink } from "react-router-dom";
import Cart  from "./components/Cart/Cart.jsx";
import Home from './components/HomePages/homepage.jsx'
import ProductDetail from "./components/ProductDetails/productdetail.jsx";
import Payment from "./components/Payment/payment.jsx"
import Header from "./components/Header/header.jsx";
import "./index.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
const rootElement = document.getElementById("root");
rootElement.style.width = "100%";

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Header /> {/* Include Header component */}
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
