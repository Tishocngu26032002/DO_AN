import React, { useState } from 'react';

// Dữ liệu giả lập danh sách đơn hàng
const initialOrders = [
    { id: 1, customerName: 'John Doe', orderDetails: '5 bags of animal feed', status: 'Confirmed' },
    { id: 2, customerName: 'Jane Smith', orderDetails: '10 bags of chicken feed', status: 'Confirmed' }
];

const Shipping = () => {
    const [orders, setOrders] = useState(initialOrders);

    const handleDelivered = (orderId) => {
        // Cập nhật trạng thái giao hàng thành công trên giao diện
        const updatedOrders = orders.map(order =>
            order.id === orderId ? { ...order, status: 'Delivered' } : order
        );
        setOrders(updatedOrders);
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-2xl font-bold mb-6">Shipping Orders</h2>

            {/* Hiển thị danh sách đơn hàng */}
            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="p-4 border rounded-md shadow-md bg-white">
                        <h3 className="text-lg font-semibold">Đơn hàng #{order.id}</h3>
                        <p>Khách hàng: {order.customerName}</p>
                        <p>Thông tin đơn hàng: {order.orderDetails}</p>
                        <p>Trạng thái: <span className={order.status === 'Delivered' ? 'text-green-700 font-semibold' : 'text-yellow-500 font-semibold'}>{order.status}</span></p>

                        {/* Button xác nhận giao hàng */}
                        {order.status === 'Confirmed' && (
                            <button
                                onClick={() => handleDelivered(order.id)}
                                className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow hover:bg-green-700"
                            >
                                Xác nhận giao hàng
                            </button>
                        )}
                        {order.status === 'Delivered' && (
                            <span className="mt-4 text-green-700 font-semibold">Giao hàng thành công</span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shipping;
