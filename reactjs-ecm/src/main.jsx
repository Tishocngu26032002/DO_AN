import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from './components/HomePages/homepage.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/homepage" replace />} /> 
                <Route path="/homepage" element={<HomePage />} /> 
               
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
