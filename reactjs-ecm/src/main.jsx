import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ShopGrid from './components/ShopGrid/ShopGrid.jsx';
import './index.css';


const rootElement = document.getElementById("root");
rootElement.style.width = "100%";
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/products" replace />} />
                <Route path="/products" element={<ShopGrid />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);