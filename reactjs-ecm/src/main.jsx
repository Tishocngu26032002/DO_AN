import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ShopGrid from './components/ShopGrid/ShopGrid.jsx';
import ProductManagement from "./components/ProductManagement/ProductManagement.jsx";
import './index.css';
import Cart from "./components/Cart/Cart.jsx";
import Home from './components/HomePages/homepage.jsx'
import ProductDetail from "./components/ProductDetails/productdetail.jsx";
import "./index.css";
import Shipping from "./components/Shipping/Shipping.jsx";

// const root = ReactDOM.createRoot(document.getElementById("root"));

const rootElement = document.getElementById("root");
rootElement.style.width = "100%";
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<ShopGrid />} />
        <Route path="/productmanagement" element={<ProductManagement />} />
        <Route path="/shipping" element={<Shipping />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);