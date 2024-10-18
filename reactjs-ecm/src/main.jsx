import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Cart  from "./components/Cart/Cart.jsx";
import HomePage from './components/HomePages/homepage.jsx'
import ProductDetail from "./components/ProductDetails/productdetail.jsx";
import "./index.css";

// const root = ReactDOM.createRoot(document.getElementById("root"));
const rootElement = document.getElementById("root");
rootElement.style.width = "100%";

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/homepage" replace />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/productdetail" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
