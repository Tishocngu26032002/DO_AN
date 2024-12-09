import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import "./index.css";
import Home from "./components/HomePages/home-page.jsx";
import ProductDetail from "./components/ProductDetails/product-detail.jsx";
import "./index.css";
import Cart from "./components/Cart/cart.jsx";
import RegisterForm from "./components/Register/register.jsx";
import LoginForm from "./components/Login/login.jsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import Admin from "./components/Admin/admin.jsx";
import OTPPage from "./components/OTP/otp.jsx";
import ShopGrid from "./components/ShopGrid/shop-grid.jsx";
import OrderHistory from "./components/OrderHistory/order-history.jsx";
import OrderSuccess from "./components/OrderSuccess/order-success.jsx";
import ManageCategory from "./components/Admin/ManageCategory/manage-category.jsx";
import ManageOrder from "./components/Admin/ManageOrder/manage-order.jsx";
import ManageProduct from "./components/Admin/ManageProduct/manage-product.jsx";
import ManageUser from "./components/Admin/ManageUser/manage-user.jsx";
import ProductionStatistics from "./components/Admin/Statistics/production-statistics.jsx";
import ManageSupplier from "./components/Admin/ManageSupplier/manage-supplier.jsx";
import Checkout from "./components/Checkout/checkout.jsx";
import ShipOrder from "./components/Shipping/ship-order.jsx";
import ShipHistory from "./components/Shipping/ship-history.jsx";
import OrderDetails from "./components/OrderDetails/order-details";
import NotificationsPage from "./components/Notification/notification.jsx";
import ImportProduct from "./components/Admin/Import/import.jsx";
import UserProfile from "./components/ProfileUser/profile-user.jsx";
import ChangePassword from "./components/ProfileUser/change-password.jsx";
import "react-toastify/dist/ReactToastify.css";
import {NotificationProvider} from "./components/Notification/NotificationProvider.jsx";


const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
rootElement.style.width = "100%";
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/" element={<Navigate to="/home-page" replace/>}/>
                    <Route path="/register" element={<RegisterForm/>}/>
                    <Route path="/otp" element={<OTPPage/>}/>
                    <Route path="/login" element={<LoginForm/>}/>
                    <Route path="/admin" element={<Admin/>}/>
                    <Route path="/ship-order" element={<ShipOrder/>}/>
                    <Route path="/ship-history" element={<ShipHistory/>}/>
                    <Route path="/home-page" element={<Home/>}/>
                    <Route path="/products" element={<ShopGrid/>}/>
                    <Route
                        path="/product-detail/:productId"
                        element={<ProductDetail/>}
                    />
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/order-history/:userId" element={<OrderHistory/>}/>
                    <Route path="/order-success" element={<OrderSuccess/>}/>
                    <Route path="/order-details" element={<OrderDetails/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
{/*
                    <Route path="/payment" element={<Payment/>}/>
*/}
                    <Route path="/user/:userId" element={<UserProfile/>}/>
                    <Route path="/change-password/:userId" element={<ChangePassword/>}/>
                    <Route
                        path="*"
                        element={
                            <NotificationProvider>
                                <Routes>
                                    <Route path="/manage-category" element={<ManageCategory/>}/>
                                    <Route path="/manage-order/:currentPage/:ordersPerPage" element={<ManageOrder/>}/>
                                    <Route path="/import-product" element={<ImportProduct/>}/>
                                    <Route
                                        path="/manage-product/:currentPage/:productsPerPage"
                                        element={<ManageProduct/>}
                                    />
                                    <Route
                                        path="/manage-user/:currentPage/:usersPerPage"
                                        element={<ManageUser/>}
                                    />
                                    <Route
                                        path="/production-statistics"
                                        element={<ProductionStatistics/>}
                                    />
                                    <Route path="/manage-supplier/:page/:limit" element={<ManageSupplier/>}/>
                                    <Route path="/test-notification" element={< NotificationsPage/>}/>
                                </Routes>
                            </NotificationProvider>
                        }
                    />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    </React.StrictMode>,
);
