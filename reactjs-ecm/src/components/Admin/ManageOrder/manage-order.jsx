import React, { useState } from 'react';
import AdminHeader from "../AdminHeader/admin-header.jsx";
import { FaSave, FaTrash, FaEye,FaSearch, FaFilter, FaSort } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineInbox, MdOutlineCancel } from "react-icons/md";
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
    paymentStatus: 'Pending',
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
  {
    userid: 4,
    name: 'Trần Thịff C',
    productName: 'Product2 2',
    quantity: 1,
    priceOut: 150000,
    address: '456 XYZ Street, District 2',
    orderDate: '2024-10-21',
    orderId: 'ORD0022',
    status: 'Pending',
    updatedDate: '2024-10-22',
    deliveryPerson: 'Nguyễn Văn D',
    paymentStatus: 'Cash on Delivery',
  },
  {
    userid: 4,
    name: 'Trần Thịff C',
    productName: 'Product2 2',
    quantity: 1,
    priceOut: 150000,
    address: '456 XYZ Street, District 2',
    orderDate: '2024-10-21',
    orderId: 'ORD0012',
    status: 'Confirmed',
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
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig !== null) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleCancelOrder = (orderId) => {
    const updatedOrders = orders.map(order =>
      order.orderId === orderId ? { ...order, status: 'Canceled' } : order
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
  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(orId => orId !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };
  const handleDeleteSelectedOrders = () => {
    setOrders(orders.filter(order => !selectedOrders.includes(order.orderId)));
    setSelectedOrders([]); // Reset selected users
  };
  // Hàm để lọc đơn hàng
  const filteredOrders =  sortedOrders.filter(order => {
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
        <div className="flex items-center flex-col md:flex-row  mt-4 mb-3 px-6 py-3 bg-white rounded-lg">
          <div className="flex items-center space-x-2 w-1/5 ">
            <div className='pr-4 mt-1 tablet:absolute tablet:mt-[148px] tablet:left-10 '>
              <input 
                      type="checkbox" 
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(orders.map(order => order.orderId));
                        } else {
                          setSelectedOrders([]);
                        }
                      }}
                    
                    />
              </div>
            <div className=' tablet:mt-36 tablet:left-16 tablet:absolute'>
            {selectedOrders.length > 0 && (
              <FaTrash 
                onClick={handleDeleteSelectedOrders} 
                className='text-gray-400 hover:text-red-500  ' 
              />
            )}
          </div>
          </div>
          <div className="flex items-center  space-x-2 mb-2 md:mb-0 w-full md:w-2/5 ">
            <div className="relative w-full ">
              <input 
                type="text" 
                placeholder="Search ...." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-lg px-4 py-2 w-full"
              />
              <FaSearch className="absolute top-3 right-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2 w-2/5 tablet:w-full justify-end">
            <div className=" relative w-1/4">
              <select 
                value={selectedStatus} 
                onChange={(e) => setSelectedStatus(e.target.value)} 
                className="border rounded-lg px-3 py-2 w-full appearance-none pr-8"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
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
                <option value="">All Payment</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
              </select>
              <FaFilter className="absolute top-3 right-2 text-gray-400" />
            </div>

            <div className="relative w-1/4  ">
              <select 
                value={selectedDeliveryPerson} 
                onChange={(e) => setSelectedDeliveryPerson(e.target.value)} 
                className="border rounded-lg px-3 py-2 w-full appearance-none pr-8"
              >
                <option value="">All Shipper</option>
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
              <th className="py-3 px-6 text-left">
                  {/*  */}
                  <MdOutlineInbox />
                </th>
                <th className="py-3 pr-6 text-left">STT </th> 
                <th className="py-3 px-6 text-left">Order ID <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('orderId')}/></th>
                <th className="py-3 px-6 text-left hidden sm:table-cell">User ID <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('userid')}/></th>
                <th className="py-3 px-6 text-left hidden sm:table-cell">Name <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('name')}/></th>
                <th className="py-3 px-6 text-left hidden md:table-cell">Product Name <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('productName')}/></th>
                <th className="py-3 px-6 text-left hidden lg:table-cell">Status <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('status')}/></th>
                <th className="py-3 px-6 text-left hidden lg:table-cell">Payment Status <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('paymentStatus')}/></th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-indigo-50">
                <td className="py-4 px-6">
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.includes(order.orderId)} 
                      onChange={() => handleSelectOrder(order.orderId)} 
                    />
                  </td>
                  <td className="py-3 pr-6">{index+1}</td>
                  <td className="py-3 px-6">{order.orderId}</td>
                  <td className="py-3 px-6 hidden sm:table-cell">{order.userid}</td>
                  <td className="py-3 px-6 hidden sm:table-cell">{order.name}</td>
                  <td className="py-3 px-6 hidden md:table-cell">{order.productName}</td>
                  <td className="py-3 pl-1 pr-10 hidden lg:table-cell"><p
                  className={`text-center rounded-md ${
                    order.status === 'Pending'
                      ? 'bg-[#F29339] text-white'
                      : order.status === 'Confirmed'
                      ? 'bg-[#286daa] text-white'
                      : order.status === 'In Delivery'
                      ? 'bg-[#ad402a] text-white'
                      : order.status === 'Delivered'
                      ? 'bg-[#006532] text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {order.status}</p></td>
                  <td className="py-3 px-6  hidden lg:table-cell"><p
                  className={`text-center  rounded-md  ${
                    order.paymentStatus === 'Pending'
                      ? 'bg-[#F29339] text-white xl:w-40'
                      : order.paymentStatus === 'Cash on Delivery'
                      ? 'bg-[#3cc9dc] text-white  xl:w-40'
                      : order.paymentStatus === 'Paid'
                      ? 'bg-[#006532] text-white  xl:w-40'
                      : 'bg-gray-300 text-black'
                  }`}
                >{order.paymentStatus}</p></td>
                  <td className="py-3 px-6">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => handleViewOrder(order)} 
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FaEye size={18} />
                      </button>
                      <button 
                        onClick={() => handleCancelOrder(order.orderId)} 
                        className="text-red-600 hover:text-red-700"
                      >
                        <MdOutlineCancel size={18} />
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
                <option value="Pending" >Pending</option>
                <option value="Paid">Paid</option>
                <option value="Cash on Delivery">Cash on Delivery</option>
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
