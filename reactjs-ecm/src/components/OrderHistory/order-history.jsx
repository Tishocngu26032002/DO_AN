import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // Lưu trữ đơn hàng
  const [loading, setLoading] = useState(true); // Trạng thái tải dữ liệu
  const [error, setError] = useState(""); // Thông báo lỗi

  // Dữ liệu giả cho đơn hàng
  const fakeOrders = [
    {
      id: "12345",
      createdAt: "2024-10-01T10:00:00Z",
      totalAmount: 100000,
      status: "Đang xử lý",
    },
    {
      id: "12346",
      createdAt: "2024-10-05T12:30:00Z",
      totalAmount: 200000,
      status: "Đã giao",
    },
    {
      id: "12347",
      createdAt: "2024-10-10T09:15:00Z",
      totalAmount: 150000,
      status: "Đã giao",
    },
    {
      id: "12348",
      createdAt: "2024-10-12T14:00:00Z",
      totalAmount: 300000,
      status: "Đang xử lý",
    },
  ];

  // Lấy dữ liệu giả khi component được render lần đầu
  useEffect(() => {
    // Giả lập thời gian tải dữ liệu
    setTimeout(() => {
      setOrders(fakeOrders); // Cập nhật state với dữ liệu giả
      setLoading(false); // Đánh dấu đã tải xong
    }, 1000); // Giả lập tải dữ liệu trong 1 giây
  }, []); // [] là dependency array, hàm này chỉ chạy một lần khi component render lần đầu

  // Điều hướng đến trang chi tiết đơn hàng
  const handleViewOrderDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  if (loading) {
    return <div>Đang tải...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="order-history-container">
      <h2 className="mb-4 text-xl font-bold">Lịch sử đơn hàng</h2>

      {orders.length === 0 ? (
        <p>Bạn chưa có đơn hàng nào.</p>
      ) : (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Mã đơn hàng</th>
              <th className="border px-4 py-2">Ngày đặt</th>
              <th className="border px-4 py-2">Tổng tiền</th>
              <th className="border px-4 py-2">Trạng thái</th>
              <th className="border px-4 py-2">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  {order.totalAmount.toLocaleString()} VNĐ
                </td>
                <td className="border px-4 py-2">{order.status}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleViewOrderDetails(order.id)}
                    className="btn btn-primary rounded px-4 py-1 text-white"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrderHistory;
