import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserOrders, getDetailOrder } from "../../services/order-service";
import Header from "../Header/header";
import Footer from "../Footer/footer";

const OrderHistory = () => {
  const { userId } = useParams();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1); // Quản lý trang hiện tại
  const [selectedOrder, setSelectedOrder] = useState(null); // Lưu chi tiết đơn hàng
  const [detailLoading, setDetailLoading] = useState(false); // Trạng thái tải chi tiết
  const limit = 5; // Số đơn hàng mỗi trang

  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getUserOrders(userId, page, limit); // Gọi API với page và limit

        setTotal(res.data.total);
        const data = res.data.list;

        setOrders(data || []); // Gán danh sách đơn hàng trả về
      } catch (err) {
        console.error(err);
        setError("Không thể tải lịch sử đơn hàng.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, page]);

  const fetchOrderDetail = async (orderId) => {
    try {
      console.log("orderIID", orderId);
      // setDetailLoading(true);
      navigate("/order-details", {
        state: { orderId: orderId },
      });
      // const data = await getDetailOrder(orderId); // Gọi API lấy chi tiết đơn hàng
      // setSelectedOrder(data); // Lưu chi tiết đơn hàng vào state
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      setError("Không thể lấy chi tiết đơn hàng.");
    }
  };

  // const handleNextPage = () => setPage((prev) => prev + 1);
  // const handlePrevPage = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));
  // const handlePageChange = (page) => {
  //   setPage((prev) => ({ ...prev, page: page }));
  // };
  const handlePageChange = (page) => {
    setPage(page);
  };

  const closeOrderDetail = () => setSelectedOrder(null);

  if (loading) {
    return <div className="mt-10 text-center">Đang tải...</div>;
  }

  if (error) {
    return <div className="mt-10 text-center text-red-500">{error}</div>;
  }

  const renderPagination = () => {
    if (total < limit) return null;

    const totalPages = Math.ceil(total / limit);

    const visiblePages = 5; // Hiển thị tối đa 5 trang

    const startPage = Math.max(1, page - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return (
      <div id="pagination" className="section-p1">
        {page > 1 && (
          <button
            className="page mx-1 rounded bg-gray-200 p-2"
            onClick={() => handlePageChange(page - 1)}
          >
            Trước
          </button>
        )}
        {[...Array(endPage - startPage + 1)].map((_, index) => (
          <a
            key={startPage + index}
            data-page={startPage + index}
            className={`page ${
              page === startPage + index
                ? "active bg-[#006532] text-white"
                : "bg-gray-200"
            } mx-1 rounded p-2`}
            onClick={() => handlePageChange(startPage + index)}
          >
            {startPage + index}
          </a>
        ))}
        {page < totalPages && (
          <button
            className="page mx-1 rounded bg-gray-200 p-2"
            onClick={() => handlePageChange(page + 1)}
          >
            Tiếp
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <Header />
      {/* Sidebar thống kê */}
      <div className="min-h-screen w-1/4 bg-[#006532] p-6 text-white">
        <h2 className="mb-6 mt-8 text-center text-xl font-semibold">
          Thống kê
        </h2>
        <div className="space-y-4">
          <div className="rounded-md bg-green-700 p-4">
            <p className="text-lg font-medium">Tổng đơn hàng</p>
            <p className="text-2xl font-bold">100</p>
          </div>
          <div className="rounded-md bg-green-700 p-4">
            <p className="text-lg font-medium">Đơn đang kiểm</p>
            <p className="text-2xl font-bold">25</p>
          </div>
          <div className="rounded-md bg-green-700 p-4">
            <p className="text-lg font-medium">Đơn đã giao</p>
            <p className="text-2xl font-bold">65</p>
          </div>
          <div className="rounded-md bg-green-700 p-4">
            <p className="text-lg font-medium">Đơn đã hủy</p>
            <p className="text-2xl font-bold">10</p>
          </div>
        </div>
      </div>

      {/* Main content - Lịch sử đơn hàng */}
      <div className="mx-auto mt-12 max-w-4xl p-6">
        <h1 className="mb-4 text-2xl font-semibold text-[#006532]">
          Lịch sử đơn hàng
        </h1>
        {orders.length === 0 ? (
          <p className="text-gray-500">Bạn chưa có đơn hàng nào.</p>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="shadow-sm hover:shadow-md rounded-lg border border-[#006532] p-4"
              >
                <p className="text-lg font-medium text-[#006532]">
                  Mã đơn hàng: <span className="font-bold">{order.id}</span>
                </p>
                <p>
                  Ngày đặt: {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>Trạng thái: {order.orderStatus}</p>
                <p>
                  Tổng tiền:{" "}
                  <span className="font-semibold text-[#006532]">
                    {order.total_price.toLocaleString()} VNĐ
                  </span>
                </p>
                <button
                  onClick={() => fetchOrderDetail(order.id)}
                  className="mt-2 rounded-md bg-[#006532] px-4 py-2 text-white hover:bg-opacity-90"
                >
                  Xem chi tiết
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-16 flex items-center justify-between">
          <button
            className="rounded-md bg-[#006532] px-4 py-2 text-white hover:bg-opacity-90"
            onClick={handlePrevPage}
            disabled={page === 1}
          >
            Trang trước
          </button>
          <span>Trang {page}</span>
          <button
            className="rounded-md bg-[#006532] px-4 py-2 text-white hover:bg-opacity-90"
            onClick={handleNextPage}
            disabled={orders.length < limit}
          >
            Trang sau
          </button>
        </div>

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="shadow-lg w-full max-w-lg rounded-lg border-2 border-[#006532] bg-white p-6">
              <h2 className="mb-4 text-xl font-semibold text-[#006532]">
                Chi tiết đơn hàng {selectedOrder.id}
              </h2>
              <p>
                Ngày đặt: {new Date(selectedOrder.createdAt).toLocaleString()}
              </p>
              <p>Trạng thái: {selectedOrder.orderStatus}</p>
              <p>
                Tổng tiền:{" "}
                <span className="font-semibold text-[#006532]">
                  {selectedOrder.total_price.toLocaleString()} VNĐ
                </span>
              </p>
              <h3 className="mt-4 font-medium text-[#006532]">
                Danh sách sản phẩm:
              </h3>
              <ul className="list-disc pl-5">
                {selectedOrder.items.map((item) => (
                  <li key={item.product_id}>
                    {item.product_name} - {item.quantity} x{" "}
                    {item.unit_price.toLocaleString()} VNĐ
                  </li>
                ))}
              </ul>
              <button
                onClick={closeOrderDetail}
                className="mt-4 rounded-md bg-[#006532] px-4 py-2 text-white hover:bg-opacity-90"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderHistory;
