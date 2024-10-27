import React, { useState } from "react";
import AdminHeader from "../AdminHeader/admin-header.jsx";

const initialOrders = [
  {
    userid: 1,
    name: "Nguyễn Văn A",
    productName: "Sản phẩm 1",
    quantity: 2,
    priceOut: 200000,
    address: "123 Đường ABC, Quận 1",
    orderDate: "2024-10-20",
    status: "Đang giao",
    updatedDate: "2024-10-21",
    deliveryPerson: "Trần Văn B",
  },
  {
    userid: 2,
    name: "Trần Thị C",
    productName: "Sản phẩm 2",
    quantity: 1,
    priceOut: 150000,
    address: "456 Đường XYZ, Quận 2",
    orderDate: "2024-10-21",
    status: "Đã giao",
    updatedDate: "2024-10-22",
    deliveryPerson: "Nguyễn Văn D",
  },
];

const ManageOrder = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [statusUpdate, setStatusUpdate] = useState({});

  const handleCancelOrder = (userid) => {
    const updatedOrders = orders.map((order) =>
      order.userid === userid ? { ...order, status: "Đã hủy" } : order,
    );
    setOrders(updatedOrders);
  };

  const handleStatusChange = (userid, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.userid === userid ? { ...order, status: newStatus } : order,
    );
    setOrders(updatedOrders);
  };

  return (
    <div>
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="mb-8 text-3xl font-bold">Manage Orders</h1>

        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase leading-normal text-gray-600">
                <th className="px-6 py-3 text-left">User ID</th>
                <th className="px-6 py-3 text-left">Họ Tên</th>
                <th className="px-6 py-3 text-left">Product Name</th>
                <th className="px-6 py-3 text-left">Quantity</th>
                <th className="px-6 py-3 text-left">Price Out</th>
                <th className="px-6 py-3 text-left">Địa Chỉ</th>
                <th className="px-6 py-3 text-left">Ngày Đặt</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Ngày Cập Nhật</th>
                <th className="px-6 py-3 text-left">Nhân Viên Giao Hàng</th>
                <th className="px-6 py-3 text-left">Hành Động</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-gray-600">
              {orders.map((order, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-6 py-3 text-left">{order.userid}</td>
                  <td className="px-6 py-3 text-left">{order.name}</td>
                  <td className="px-6 py-3 text-left">{order.productName}</td>
                  <td className="px-6 py-3 text-left">{order.quantity}</td>
                  <td className="px-6 py-3 text-left">
                    {order.priceOut.toLocaleString()} VNĐ
                  </td>
                  <td className="px-6 py-3 text-left">{order.address}</td>
                  <td className="px-6 py-3 text-left">{order.orderDate}</td>
                  <td className="px-6 py-3 text-left">
                    <select
                      value={statusUpdate[order.userid] || order.status}
                      onChange={(e) => {
                        setStatusUpdate({
                          ...statusUpdate,
                          [order.userid]: e.target.value,
                        });
                        handleStatusChange(order.userid, e.target.value);
                      }}
                      className="border p-1"
                    >
                      <option value="Đang giao">Đang giao</option>
                      <option value="Đã giao">Đã giao</option>
                      <option value="Đã hủy">Đã hủy</option>
                    </select>
                  </td>
                  <td className="px-6 py-3 text-left">{order.updatedDate}</td>
                  <td className="px-6 py-3 text-left">
                    {order.deliveryPerson}
                  </td>
                  <td className="px-6 py-3 text-left">
                    <button
                      onClick={() => handleCancelOrder(order.userid)}
                      className="rounded bg-red-500 px-3 py-1 text-white"
                    >
                      Hủy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageOrder;
