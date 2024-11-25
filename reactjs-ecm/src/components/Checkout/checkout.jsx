import React, { useState, useEffect } from "react";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { PiShoppingCart } from "react-icons/pi";
import { getUserId } from "../../util/auth-local";
import { useLocation } from "react-router-dom";
import {
  createNewAddress,
  createOrder,
  getAddresses,
} from "../../services/order-service";
import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "../../constants/enums";
import {
  NotificationList,
  notificationTypes,
  showNotification,
} from "../Notification/NotificationService";

const Checkout = () => {
  const [nameUser, setNameUser] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(
    "Thanh toán khi nhận hàng",
  );
  const [addresses, setAddresses] = useState([]); // Để lưu danh sách địa chỉ
  const [showModal, setShowModal] = useState(false); // Hiển thị popup
  const [newName, setNewName] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const location = useLocation();

  const [carts, setCarts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  const [selectedLocationId, setSelectedLocationId] = useState("");

  const [notifications, setNotifications] = useState([]);

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressResponse = await getAddresses();
        setAddresses(addressResponse.data.data.data); // Lưu danh sách địa chỉ vào state

        // Lọc tên địa chỉ và số điện thoại của địa chỉ có default_location = true
        const defaultLocation = addressResponse.data.data.data.find(
          (location) => location.default_location === true,
        );
        setNameUser(defaultLocation?.name || "");
        setAddress(defaultLocation?.address || "");
        setPhone(defaultLocation?.phone || "");
        setSelectedLocationId(defaultLocation?.id || "");
        console.log("key", defaultLocation.id);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (location.state) {
      setCarts(location.state.carts);
      setTotalCost(location.state.totalCost);
    }
  }, [location]);

  // Hàm xử lý chọn địa chỉ
  const handleAddressChange = (selectedAddress) => {
    console.log("key2", selectedAddress.id);
    setNameUser(selectedAddress.name);
    setAddress(selectedAddress.address);
    setPhone(selectedAddress.phone);
    setSelectedLocationId(selectedAddress.id); // Cập nhật ID địa chỉ được chọn
    setShowModal(false); // Đóng popup sau khi chọn địa chỉ
  };

  // Hàm xử lý thêm địa chỉ mới
  const handleAddNewAddress = async () => {
    if (newName && newAddress && newPhone) {
      try {
        await createNewAddress(newName, newAddress, newPhone);
        setShowModal(false);
        alert("Địa chỉ và số điện thoại đã được thêm!");
        window.location.reload(); // Tải lại trang để lấy danh sách địa chỉ mới
      } catch (error) {
        console.error("Error adding new address:", error);
      }
    } else {
      alert("Vui lòng điền đủ thông tin tên địa chỉ và số điện thoại!");
    }
  };

  // Hàm xử lý đặt hàng
  const handleOrder = async () => {
    let userId = getUserId();

    const orderData = {
      totalPrice: totalCost,
      paymentMethod:
        paymentMethod === PaymentMethod.CashOnDelivery
          ? PaymentMethod.CashOnDelivery
          : PaymentMethod.BankTransfer,
      user_id: userId,
      location_id: selectedLocationId,
      orderStatus: OrderStatus.Checking,
      paymentStatus: PaymentStatus.Unpaid,
      products: carts.map((cart) => ({
        product_id: cart.product.id,
        quantity: cart.quantity,
        priceout: cart.product.priceout,
      })),
    };

    try {
      console.log("Dữ liệu gửi đến API createOrder:", orderData);
      const response = await createOrder(orderData);

      console.log("Response Order:", response.data);
      if (response.data.data.total_price > 0) {
        showNotification(
          "Thanh toán thành công! Cảm ơn bạn đã mua sắm.",
          notificationTypes.SUCCESS,
          setNotifications,
        );
      } else {
        showNotification(
          "Lỗi thanh toán! Vui lòng thử lại.",
          notificationTypes.ERROR,
          setNotifications,
        );
      }

      // Xử lý sau khi đặt hàng thành công, ví dụ: xóa giỏ hàng hoặc điều hướng
      // setCarts([]);
    } catch (error) {
      console.error("Lỗi khi đặt hàng:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      {/* Hiển thị các thông báo */}
      <NotificationList notifications={notifications} />
      <section
        id="page-header"
        className="h-52"
        style={{
          backgroundImage: `url("images/banner/image-4.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-[rgba(8,28,14,0.69)] text-center">
          <h2 className="text-2xl font-bold text-white">THANH TOÁN</h2>
        </div>
      </section>

      <div className="container mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Sản phẩm */}
          <div className="order-1">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Đặt hàng của bạn
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {carts.map((cart) => (
                <div
                  key={cart.id}
                  className="shadow-lg flex items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <img
                    src={cart.product.url_images}
                    alt={cart.product.name}
                    className="h-24 w-24 rounded-lg"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-[#006532]">
                      {cart.product.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Số lượng: {cart.quantity}
                    </p>
                    <p className="text-sm text-gray-500">
                      Bao: {cart.product.weight}kg
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      Số tiền: {cart.product.priceout * cart.quantity}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="shadow-lg mt-6 rounded-lg border border-gray-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between border-b pb-2 text-gray-700">
                <span>Tổng phụ</span>
                <span>{totalCost}đ</span>
              </div>
              <div className="mb-2 flex items-center justify-between border-b pb-2 text-gray-700">
                <span>Phí giao hàng</span>
                <span>0đ</span>
              </div>
              <div className="flex items-center justify-between text-lg font-semibold text-[#006532]">
                <span>Tổng cộng</span>
                <span>{totalCost}đ</span>
              </div>
            </div>
          </div>

          {/* Địa chỉ giao hàng và phương thức thanh toán */}
          <div className="order-2">
            <h3 className="mb-6 text-2xl font-semibold text-gray-800">
              Địa chỉ giao hàng
            </h3>
            <div className="shadow-lg space-y-4 rounded-lg border border-gray-200 bg-white p-6">
              {nameUser && address && phone ? (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Họ và tên
                    </label>
                    <input
                      type="text"
                      value={nameUser}
                      className="shadow-sm mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-600 focus:ring-green-600"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Địa chỉ
                    </label>
                    <input
                      type="text"
                      value={address}
                      className="shadow-sm mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-600 focus:ring-green-600"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      value={phone}
                      className="shadow-sm mt-1 block w-full rounded-md border border-gray-300 p-2 focus:border-green-600 focus:ring-green-600"
                      readOnly
                    />
                  </div>
                </>
              ) : (
                <div className="text-gray-500">Chưa có địa chỉ giao hàng</div>
              )}

              {/* Nút thay đổi */}
              <button
                onClick={() => setShowModal(true)}
                className="text-sm text-green-600 hover:text-green-800"
              >
                Thay đổi
              </button>
            </div>
            <div className="mt-8">
              <h3 className="mb-4 text-2xl font-semibold text-gray-800">
                Phương thức thanh toán
              </h3>
              <div className="shadow-lg flex space-x-4 rounded-lg border border-gray-200 bg-white p-6">
                {["Thanh toán khi nhận hàng", "Chuyển khoản ngân hàng"].map(
                  (method) => (
                    <button
                      key={method}
                      onClick={() => handlePaymentChange(method)}
                      className={`rounded border-2 border-[#006532] px-4 py-2 transition hover:bg-[#006532] hover:text-white ${
                        paymentMethod === method
                          ? "bg-[#006532] text-white"
                          : "bg-white text-gray-700 hover:bg-[#006532ca] hover:text-white"
                      }`}
                    >
                      {method === "Thanh toán khi nhận hàng"
                        ? "Thanh toán khi nhận hàng"
                        : "Chuyển khoản ngân hàng"}
                    </button>
                  ),
                )}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={handleOrder}
                  className="shadow-md w-full rounded-md border-2 border-[#006532] bg-[#006532] px-6 py-2 text-white transition hover:bg-[#006532ca] hover:text-white"
                >
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup để chọn địa chỉ */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="shadow-lg w-full max-w-lg rounded-lg bg-white p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-4 text-xl font-semibold text-gray-800">
              Chọn địa chỉ giao hàng
            </h3>
            {addresses.map((item) => (
              <div
                key={item.id}
                className="mb-2 flex items-center justify-between"
              >
                <div>
                  <p>{item.name}</p>
                  <p>{item.address}</p>
                  <p>{item.phone}</p>
                </div>
                <button
                  onClick={() => handleAddressChange(item)}
                  className="text-sm text-blue-600"
                >
                  Chọn
                </button>
              </div>
            ))}

            {/* Thêm địa chỉ mới với số điện thoại */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Thêm tên mới"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              />
              <input
                type="text"
                placeholder="Thêm địa chỉ mới"
                value={newAddress}
                onChange={(e) => setNewAddress(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 p-2"
              />
              <input
                type="text"
                placeholder="Thêm số điện thoại"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="mt-2 w-full rounded-md border border-gray-300 p-2"
              />
              <button
                onClick={handleAddNewAddress}
                className="mt-2 w-full rounded-md bg-green-600 px-4 py-2 text-white"
              >
                Thêm địa chỉ
              </button>
            </div>

            <div className="mt-4 flex justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-md bg-red-600 px-4 py-2 text-white"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
      <section
        id="product1"
        className="mt-10 bg-[#f9f9f9] py-10 pt-10 text-center"
      >
        <div className="text-[46px] font-semibold leading-[54px] text-[#006532]">
          Newest Products
        </div>
        <div className="container mx-auto flex flex-wrap justify-evenly pt-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="pro ease relative m-4 w-1/5 min-w-[250px] cursor-pointer rounded-2xl border border-[#cce7d0] bg-white p-3 shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]"
            >
              <img
                src="/images/products/262.png"
                alt={`Product ${index + 1}`}
                className="w-full rounded-xl"
              />
              <div className="des pt-3 text-start">
                <span className="text-[13px] text-[#1a1a1a]">Adidas</span>
                <h5 className="pt-2 text-[15px] font-semibold text-[#006532]">
                  Cotton shirts pure cotton
                </h5>
                <h5 className="pt-2 text-[13px] text-[#1a1a1a]">Bao: 20kg</h5>
                <h4 className="flex pt-2 text-[16px] font-semibold text-[#006532]">
                  <p className="mr-1 mt-[2px] text-sm font-normal underline">
                    đ
                  </p>
                  78000
                </h4>
              </div>
              <a
                href="#"
                className="cart absolute bottom-5 right-2 -mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#cce7d0] bg-[#e8f6ea] font-medium leading-10 text-[#006532]"
              >
                <PiShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;
