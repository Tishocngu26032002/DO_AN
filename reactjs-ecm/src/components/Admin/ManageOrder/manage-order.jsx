import React, {  useEffect, useState } from 'react';
import {useLocation, useParams, useNavigate } from 'react-router-dom';
import AdminHeader from "../AdminHeader/admin-header.jsx";
import { FaSave, FaTrash, FaEye,FaSearch, FaFilter, FaSort, FaEdit} from 'react-icons/fa';
import { MdOutlineInbox, MdOutlineCancel } from "react-icons/md";
import { getOrdersAdmin, updateOrder } from '../../../services/order-service.js';
import { showNotification, notificationTypes, NotificationList } from '../../Notification/NotificationService.jsx';
import NotificationHandler from '../../Notification/notification-handle.jsx';



const ManageOrder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [orders, setOrders] = useState([]);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const { currentPage: paramCurrentPage, ordersPerPage: paramOrdersPerPage } = useParams();
  const [notifications, setNotifications] = useState([]);
  const [filterOrderStatus, setFilterOrderStatus] = useState(queryParams.get('orderStatus') || '');
  const [filterPaymentStatus, setFilterPaymentStatus] = useState(queryParams.get('paymentStatus') || '');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [showConfirmPopupMulti, setShowConfirmPopupMulti] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const ordersPerPage = parseInt(paramOrdersPerPage) || 8; // Số lượng người dùng trên mỗi trang
  const currentPage = parseInt(paramCurrentPage) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  
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

  useEffect(() => {
    const queryParams = new URLSearchParams();
    // if (searchTerm) queryParams.set('search', searchTerm);
    if (filterOrderStatus) queryParams.set('orderStatus', filterOrderStatus);
  if (filterPaymentStatus) queryParams.set('paymentStatus', filterPaymentStatus);
    window.history.replaceState(null, '', `/manage-order/${currentPage}/${ordersPerPage}?${queryParams.toString()}`);
  }, [ filterOrderStatus, filterPaymentStatus, currentPage, ordersPerPage]);

  useEffect(() => {
    const fetchOrders = async () => {
      console.log(filterPaymentStatus);
      if ( filterOrderStatus || filterPaymentStatus) {
        const searchData = {
          orderStatus: filterOrderStatus === "" ? undefined : filterOrderStatus,
          paymentStatus: filterPaymentStatus === "" ? undefined : filterPaymentStatus,
        };
        console.log('search' ,searchData);
        try {
          const result = await getOrdersAdmin(currentPage, ordersPerPage, searchData);

          if (Array.isArray(result.data.orders)) {
            setOrders(result.data.orders);
            const totalPages = Math.ceil(parseInt(result.data.total) / parseInt(ordersPerPage));
            setTotalPages(totalPages);
          } else {
            console.error("Data returned from API is not an array:", result.data.orders);
            sessionStorage.setItem('notification', JSON.stringify({
              message: 'Lỗi trong quá trình xử lý!',
              type: notificationTypes.SUCCESS
            }));
            
          }
        } catch (error) {
          console.error('Error fetching search orders:', error);
        }
      } else {
        const fetchedOrders = [];
        const searchData = {
          orderStatus: filterOrderStatus === "" ? undefined : filterOrderStatus,
          paymentStatus: filterPaymentStatus === "" ? undefined : filterPaymentStatus,
        };
        let page = 1;
        let totalOrders = 0;
        do {
          const result = await getOrdersAdmin(page, ordersPerPage, searchData);
          if (result.success) {
            fetchedOrders.push(...result.data.orders);
            totalOrders = result.data.total;
            page++;
          } else {
            console.error('Failed to fetch orders:', result.message);
            sessionStorage.setItem('notification', JSON.stringify({
              message: 'Lỗi trong quá trình xử lý!',
              type: notificationTypes.SUCCESS
            }));
            break;
          }
        } while (fetchedOrders.length < totalOrders);
        setTotalPages(Math.ceil(totalOrders / ordersPerPage));
        setOrders(fetchedOrders.slice((currentPage - 1) * ordersPerPage, currentPage * ordersPerPage));
      }
    };
  
    fetchOrders();
  }, [ filterPaymentStatus, filterOrderStatus, currentPage, ordersPerPage]);
  
  const handleViewOrder = (order) => {
    setCurrentOrder({
      ...order,
    });
    setShowViewPopup(true);
  };

  const handlePageChange = (page) => {
    const queryParams = new URLSearchParams();
    if (filterOrderStatus) queryParams.set('orderStatus', filterOrderStatus); 
    if (filterPaymentStatus) queryParams.set('paymentStatus',filterPaymentStatus);
  
    navigate(`/manage-order/${page}/${ordersPerPage}?${queryParams.toString()}`);
  };

  const handleOrderStatusChange = (event) => {
    setFilterOrderStatus(event.target.value.trim());
  };
  
  
  const handlePaymentStatusChange = (event) => {
    const newPaymentStatus = event.target.value.trim();
    setFilterPaymentStatus(newPaymentStatus);
  };

  const handleSelectOrder = (id) => {
    if (selectedOrders.includes(id)) {
      setSelectedOrders(selectedOrders.filter(orderId => orderId !== id));
    } else {
      setSelectedOrders([...selectedOrders, id]);
    }
  };

  const openUpdateModal = (order) => {
    setCurrentOrder({
      ...order,
    });
    setShowModal(true);
  };
  
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
                        setSelectedOrders(sortedOrders.map(order => order.id));
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                   
                  />
              </div>
            <div className=' tablet:mt-36 tablet:left-16 tablet:absolute'>
            {selectedOrders.length > 0 && (
              <FaTrash 
                // onClick={handleDeleteSelectedOrders} 
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
                className="border rounded-lg px-4 py-2 w-full"
              />
              <FaSearch className="absolute top-3 right-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center space-x-2 w-2/5 tablet:w-full justify-end">
            <div className=" relative w-1/4">
              <select 
                value={filterOrderStatus} 
                onChange={handleOrderStatusChange} 
                className="border rounded-lg px-3 py-2 w-full appearance-none pr-8"
              >
                <option value="">Tất cả</option>
                <option value="Đang kiểm hàng">Đang kiểm hàng</option>
                <option value="Đang vận chuyển">Đang vận chuyển</option>
                <option value="Đã giao hàng">Đã giao hàng</option>
                <option value="Hủy đơn hàng">Hủy đơn hàng</option>
            
              </select>
              <FaFilter className="absolute top-3 right-2 text-gray-400" />
            </div>

            <div className="relative w-1/4">
              <select 
                value={filterPaymentStatus} 
                onChange={handlePaymentStatusChange} 
                className="border rounded-lg px-3 py-2 w-full appearance-none pr-8"
              >
                <option value="">Tất cả</option>
                <option value="Đã thanh toán">Đã thanh toán</option>
                <option value="Chưa thanh toán">Chưa thanh toán</option>
                <option value="Nợ">Nợ</option>
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
                <th className="py-3 px-6 text-left">Ngày đặt hàng <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('createdAt')}/></th>
                <th className="py-3 px-6 text-left hidden sm:table-cell">Ngày cập nhật <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('updatedAt')}/></th>
                <th className="py-3 px-6 text-left hidden sm:table-cell">Tổng tiền <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('total_price')}/></th>
                <th className="py-3 px-6 text-left hidden md:table-cell">Phương thức thanh toán <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('payment_method')}/></th>
                <th className="py-3 px-6 text-left hidden lg:table-cell">Tình trạng đơn hàng <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('orderStatus')}/></th>
                <th className="py-3 px-6 text-left hidden lg:table-cell">Tình trạng thanh toán <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('paymentStatus')}/></th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedOrders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-indigo-50">
                <td className="py-4 px-6">
                    <input 
                      type="checkbox" 
                      checked={selectedOrders.includes(order.id)} 
                      onChange={() => handleSelectOrder(order.id)} 
                    />
                  </td>
                  <td className="py-3 pr-6">{index+1}</td>
                  <td className="py-3 px-6">{order.createdAt}</td>
                  <td className="py-3 px-6 hidden sm:table-cell">{order.updatedAt}</td>
                  <td className="py-3 px-6 hidden sm:table-cell">{order.total_price}</td>
                  <td className="py-3 px-6 hidden md:table-cell">{order.payment_method}</td>
                  <td className="py-3 pl-1 pr-10 hidden lg:table-cell"><p
                  className={`text-center rounded-md ${
                    order.orderStatus == 'Đang kiểm hàng'
                      ? 'bg-[#F29339] text-white'
                      : order.orderStatus == 'Đang vận chuyển'
                      ? 'bg-[#4175a2] text-white'
                      : order.orderStatus == 'Hủy đơn hàng'
                      ? 'bg-[#ad402a] text-white'
                      : order.orderStatus == 'Đã giao'
                      ? 'bg-[#006532] text-white'
                      : 'bg-gray-300 text-black'
                  }`}
                >
                  {order.orderStatus}</p></td>
                  <td className="py-3 px-6  hidden lg:table-cell"><p
                  className={`text-center  rounded-md  ${
                    order.paymentStatus === 'Chưa thanh toán'
                      ? 'bg-[#F29339] text-white xl:w-40'
                      : order.paymentStatus === 'Nợ'
                      ? 'bg-[#447177] text-white  xl:w-40'
                      : order.paymentStatus === 'Đã thanh toán'
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
                      {/* <button 
                        onClick={() => handleCancelOrder(order.orderId)} 
                        className="text-red-600 hover:text-red-700"
                      >
                        <MdOutlineCancel size={18} />
                      </button> */}
                      <button onClick={() => openUpdateModal(order)} className="text-[#006532] hover:text-[#005a2f]">
                      <FaEdit />
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
              <h2 className="text-2xl font-semibold mb-4 text-[#006532]">Đơn: {currentOrder.id}</h2>
              <p className="text-black"><strong className="text-[#006532]">Khách hàng:</strong> {currentOrder.user_id}</p>
              <p className="text-black"><strong className="text-[#006532]">Nhân viên:</strong> {currentOrder.employee_id}</p>
              <p className="text-black"><strong className="text-[#006532]">Địa chỉ:</strong> {currentOrder.location_id}</p>
              <p className="text-black"><strong className="text-[#006532]">Tổng tiền:</strong> {currentOrder.total_price}</p>
              <p className="text-black"><strong className="text-[#006532]">Tình trạng đơn hàng:</strong> {currentOrder.orderStatus}</p>
              <p className="text-black"><strong className="text-[#006532]">Phương thức thanh toán:</strong> {currentOrder.payment_method}</p>
              <p className="text-black"><strong className="text-[#006532]">Tình trạng thanh toán:</strong> {currentOrder.paymentStatus}</p>
              <p className="text-black"><strong className="text-[#006532]">Thời gian cập nhật:</strong> {currentOrder.updatedAt}</p>
              <p className="text-black"><strong className="text-[#006532]">Thời gian đặt hàng:</strong> {currentOrder.createdAt}</p>
             
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
              <p className="text-black"><strong>Order ID:</strong> {currentOrder.id}</p>
              {/* <p className="text-black"><strong>Name:</strong> {currentOrder.name}</p> */}
              {/* <p className="text-black"><strong>Status:</strong></p>
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
              </select> */}

              {/* <button 
                onClick={() => handleSaveUpdate(currentOrder.status, currentOrder.paymentStatus)} 
                className="mt-4 bg-[#006532] text-white py-2 px-4 rounded hover:bg-green-700"
              >
                <FaSave className="inline mr-1" />
                Save
              </button> */}
              <button 
                onClick={() => setShowUpdatePopup(false)} 
                className="mt-4 ml-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
        {/* Hiển thị các nút phân trang */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-[#006532] text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'}`}
            disabled={index + 1 === currentPage} // Vô hiệu hóa nút hiện tại
          >
            {index + 1}
          </button>
        ))}
      </div>
      </div>
    </div>
  );
};

export default ManageOrder;
