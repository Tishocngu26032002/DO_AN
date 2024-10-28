import React, { useState } from 'react';
import AdminHeader from "../AdminHeader/admin-header.jsx";
import { FaSave, FaTrash, FaEye,FaSearch, FaFilter } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
// import { AiOutlineSearch } from 'react-icons/ai'; // Icon tìm kiếm
// import { BiDownArrow } from 'react-icons/bi'; // Icon dropdown

const initialOrders = [
  {
    userid: 1,
    name: 'Nguyễn Văn A',
    productName: 'Product 1',
    quantity: 2,
    priceOut: 200000,
    address: '123 ABC Street, District 1',
    orderDate: '2024-10-20',
    orderId: 'ORD001',
    status: 'In Delivery',
    updatedDate: '2024-10-21',
    deliveryPerson: 'Trần Văn B',
    paymentStatus: 'Pending Payment',
  },
  {
    userid: 2,
    name: 'Trần Thị C',
    productName: 'Product 2',
    quantity: 1,
    priceOut: 150000,
    address: '456 XYZ Street, District 2',
    orderDate: '2024-10-21',
    orderId: 'ORD002',
    status: 'Delivered',
    updatedDate: '2024-10-22',
    deliveryPerson: 'Nguyễn Văn D',
    paymentStatus: 'Paid',
  },
  // Thêm các đơn hàng khác nếu cần
];

const ManageOrder = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  
  // State cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPaymentStatus, setSelectedPaymentStatus] = useState('');
  const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState('');

  const handleCancelOrder = (userid) => {
    const updatedOrders = orders.map(order =>
      order.userid === userid ? { ...order, status: 'Canceled' } : order
    );
    setOrders(updatedOrders);
  };

  const handleUpdateOrder = (order) => {
    setCurrentOrder(order);
    setShowUpdatePopup(true);
  };

  const handleSaveUpdate = (newStatus, newPaymentStatus) => {
    const updatedOrders = orders.map(order => 
      order.userid === currentOrder.userid ? { 
        ...order, 
        status: newStatus, 
        paymentStatus: newPaymentStatus,
        updatedDate: new Date().toISOString().split('T')[0], // Update the date
      } : order
    );
    setOrders(updatedOrders);
    setShowUpdatePopup(false);
    setCurrentOrder(null);
  };

  const handleViewOrder = (order) => {
    setCurrentOrder(order);
    setShowViewPopup(true);
  };

  // Hàm để lọc đơn hàng
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          order.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    const matchesPaymentStatus = selectedPaymentStatus ? order.paymentStatus === selectedPaymentStatus : true;
    const matchesDeliveryPerson = selectedDeliveryPerson ? order.deliveryPerson === selectedDeliveryPerson : true;

    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesDeliveryPerson;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="w-full p-4">
        <h1 className="text-4xl font-bold mb-8 mt-4 text-[#006532] text-center">Manage Order</h1>

        {/* Tìm kiếm và lọc */}
        <div className="mb-4 flex flex-wrap sm:flex-row-reverse md:flex-row md:justify-between ">
          <div className="relative w-full md:w-1/3  mb-4">
            
            <input 
              type="text" 
              placeholder="Search ...." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border rounded-lg px-4 py-2 w-full"
            />
            <FaSearch className="absolute top-3 right-4 text-gray-400" />
          </div>

          <div className="flex space-x-4 mb-4">
            <div className="relative w-1/3">
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)} 
                className="border rounded-lg px-3 py-2 w-full appearance-none pr-8"
              >
                <option value="">All Status</option>
                <option value="In Delivery">In Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>
              <FaFilter className="absolute top-3 right-2 text-gray-400" />
            </div>

            <div className="relative w-1/4">
              <select 
                value={selectedPaymentStatus} 
                onChange={(e) => setSelectedPaymentStatus(e.target.value)} 
                className="border rounded-lg px-3 py-2 w-full appearance-none pr-8"
              >
                <option value="">All Payment Status</option>
                <option value="Pending Payment">Pending Payment</option>
                <option value="Paid">Paid</option>
              </select>
              <FaFilter className="absolute top-3 right-2 text-gray-400" />
            </div>

            <div className="relative w-1/3  ">
              <select 
                value={selectedDeliveryPerson} 
                onChange={(e) => setSelectedDeliveryPerson(e.target.value)} 
                className="border rounded-lg px-3 py-2 w-full appearance-none pr-8"
              >
                <option value="">All Delivery Persons</option>
                <option value="Trần Văn B">Trần Văn B</option>
                <option value="Nguyễn Văn D">Nguyễn Văn D</option>
              </select>
              <FaFilter className="absolute top-3 right-2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-[#006532] text-white">
              <tr>
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">User ID</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Payment Status</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-indigo-50">
                  <td className="py-3 px-6">{order.orderId}</td>
                  <td className="py-3 px-6">{order.userid}</td>
                  <td className="py-3 px-6">{order.name}</td>
                  <td className="py-3 px-6">{order.productName}</td>
                  <td className="py-3 px-6">{order.status}</td>
                  <td className="py-3 px-6">{order.paymentStatus}</td>
                  <td className="py-3 px-6">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handleViewOrder(order)} 
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FaEye size={18} />
                      </button>
                      <button 
                        onClick={() => handleCancelOrder(order.userid)} 
                        className="text-red-600 hover:text-red-700"
                      >
                        <FaTrash size={18} />
                      </button>
                      <button 
                        onClick={() => handleUpdateOrder(order)} 
                        className="text-green-600 hover:text-green-700"
                      >
                        <FiEdit size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Popup hiển thị chi tiết đơn hàng */}
        {showViewPopup && currentOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-[#006532]">Order: {currentOrder.orderId}</h2>
              <p className="text-black"><strong className="text-[#006532]">Name:</strong> {currentOrder.name}</p>
              <p className="text-black"><strong className="text-[#006532]">Product Name:</strong> {currentOrder.productName}</p>
              <p className="text-black"><strong className="text-[#006532]">Quantity:</strong> {currentOrder.quantity}</p>
              <p className="text-black"><strong className="text-[#006532]">Price:</strong> {currentOrder.priceOut}</p>
              <p className="text-black"><strong className="text-[#006532]">Address:</strong> {currentOrder.address}</p>
              <p className="text-black"><strong className="text-[#006532]">Order Date:</strong> {currentOrder.orderDate}</p>
              <p className="text-black"><strong className="text-[#006532]">Status:</strong> {currentOrder.status}</p>
              <p className="text-black"><strong className="text-[#006532]">Updated Date:</strong> {currentOrder.updatedDate}</p>
              <p className="text-black"><strong className="text-[#006532]">Delivery Person:</strong> {currentOrder.deliveryPerson}</p>
              <p className="text-black"><strong className="text-[#006532]">Payment Status:</strong> {currentOrder.paymentStatus}</p>
              <button 
                onClick={() => setShowViewPopup(false)} 
                className="mt-4 bg-[#006532] text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Popup cập nhật đơn hàng */}
        {showUpdatePopup && currentOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-[#006532]">Update Order</h2>
              <p className="text-black"><strong>Order ID:</strong> {currentOrder.orderId}</p>
              <p className="text-black"><strong>Name:</strong> {currentOrder.name}</p>
              <p className="text-black"><strong>Status:</strong></p>
              <select 
                defaultValue={currentOrder.status} 
                onChange={(e) => setCurrentOrder({ ...currentOrder, status: e.target.value })}
                className="border rounded-lg px-2 py-1 w-full mb-4"
              >
                <option value="In Delivery">In Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Canceled">Canceled</option>
              </select>

              <p className="text-black"><strong>Payment Status:</strong></p>
              <select 
                defaultValue={currentOrder.paymentStatus} 
                onChange={(e) => setCurrentOrder({ ...currentOrder, paymentStatus: e.target.value })}
                className="border rounded-lg px-2 py-1 w-full mb-4"
              >
                <option value="Pending Payment">Pending Payment</option>
                <option value="Paid">Paid</option>
              </select>

              <button 
                onClick={() => handleSaveUpdate(currentOrder.status, currentOrder.paymentStatus)} 
                className="mt-4 bg-[#006532] text-white py-2 px-4 rounded hover:bg-green-700"
              >
                <FaSave className="inline mr-1" />
                Save
              </button>
              <button 
                onClick={() => setShowUpdatePopup(false)} 
                className="mt-4 ml-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageOrder;
