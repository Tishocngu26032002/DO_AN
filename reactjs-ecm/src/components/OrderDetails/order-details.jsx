import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { useCart } from "../../Context/CartContext";
import { useLocation } from "react-router-dom";
import { getOrderDetails } from "../../services/order-service";

const OrderDetails = () => {
  const location = useLocation();
  const { orderId } = location.state || {}; // Lấy response từ state
  console.log("orderId", orderId);

  const [orderDetails, setOrderDetails] = useState([]);

  const [loading, setLoading] = useState(true);

  const {
    carts,
    setCarts,
    selectedCartItems,
    clearSelectedCartItems,
    totalQuantity,
    setTotalQuantity,
  } = useCart();

  console.log("selectedCartItems", selectedCartItems);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await getOrderDetails(orderId);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrderDetails();
  }, [orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const calculateTotal = (products) => {
    if (!products) return 0;
    return products.reduce(
      (total, product) => total + product.priceout * product.quantity,
      0,
    );
  };

  {
    console.log("orderDetails", orderDetails);
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="container mx-auto p-6 md:p-12">
        <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-8 md:p-16">
          <h2 className="mb-6 text-3xl font-bold text-[#006532]">
            Chi tiết đặt hàng
          </h2>

          {/* Thông tin đơn hàng */}
          <div className="mb-8">
            <p className="text-lg text-gray-700">
              Mã đặt hàng: <span className="font-semibold">OR35273</span>
            </p>
            <p className="text-lg text-gray-700">
              Ngày đặt hàng:{" "}
              <span className="font-semibold">{orderDetails.createdAt}</span>
            </p>
            <p className="text-lg text-gray-700">
              Họ và tên:{" "}
              <span className="font-semibold">
                {orderDetails.location.name}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Địa chỉ:{" "}
              <span className="font-semibold">
                {orderDetails.location.address}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Số điện thoại:{" "}
              <span className="font-semibold">
                {orderDetails.location.phone}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Phương thức thanh toán:{" "}
              <span className="font-semibold">
                {orderDetails.payment_method}
              </span>
            </p>
            <p className="text-lg text-gray-700">
              Trạng thái giao hàng:{" "}
              <span className="font-semibold">{orderDetails.orderStatus}</span>
            </p>
          </div>

          {/* Danh sách sản phẩm */}
          <h3 className="mb-4 text-2xl font-semibold text-gray-800">
            Products
          </h3>
          <div className="grid grid-cols-1 gap-4">
            {orderDetails.orderProducts.map((product) => (
              <div
                key={product.id}
                className="shadow-lg flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4"
              >
                <img
                  // src={product.imgSrc}
                  src="Image"
                  // alt={product.name}
                  alt="Cám cá rô"
                  className="h-24 w-24 rounded-lg"
                />
                <div>
                  <h4 className="text-lg font-semibold text-[#006532]">
                    {/* {product.name} */}
                    Cám cá rô
                  </h4>
                  <p className="text-sm text-gray-500">
                    Số lượng: {product.quantity}
                  </p>
                  <p className="text-sm text-gray-500">Bao: 30kg</p>
                  <p className="text-sm font-medium text-gray-700">
                    Số tiền: {product.priceout}đ
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Tóm tắt thanh toán */}
          <div className="shadow-lg mt-6 rounded-lg border border-gray-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between border-b pb-2 text-gray-700">
              <span>Tổng phụ</span>
              <span>{calculateTotal(orderDetails.orderProducts)}đ</span>
            </div>
            <div className="mb-2 flex items-center justify-between border-b pb-2 text-gray-700">
              <span>Phí giao hàng</span>
              <span>0đ</span>
            </div>
            <div className="flex items-center justify-between text-lg font-semibold text-[#006532]">
              <span>Tổng cộng</span>
              <span>{calculateTotal(orderDetails.orderProducts)}đ</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrderDetails;
