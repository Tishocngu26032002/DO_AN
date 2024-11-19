import React, { useEffect, useState } from "react";
import Header from "../Header/header.jsx";
import Footer from "../Footer/footer.jsx";
import { PiShoppingCart } from "react-icons/pi";
import { PiMinusBold, PiPlusBold } from "react-icons/pi";
import { authLocal, userIdLocal } from "../../util/auth-local.js";
import {
  deleteCart,
  getCarts,
  updateCart,
} from "../../services/cart-service.js";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedCarts, setSelectedCarts] = useState([]);
  const navigate = useNavigate();

  const handleIncrease = (cartId, currentQuantity) => {
    const newQuantity = currentQuantity + 1;
    handleQuantityChange(cartId, newQuantity);
  };

  const handleDecrease = (cartId, currentQuantity) => {
    const newQuantity = currentQuantity > 1 ? currentQuantity - 1 : 1;
    handleQuantityChange(cartId, newQuantity);
  };

  const handleQuantityChange = async (cartId, newQuantity) => {
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);

    let token = authLocal.getToken();
    token = token.replace(/^"|"$/g, "");

    if (cartIndex !== -1) {
      try {
        await updateCart({ ...carts[cartIndex], quantity: newQuantity }, token);
        fetchCarts();
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  const calculateTotalCost = (cartsData) => {
    try {
      const cost = cartsData.reduce(
        (total, item) => total + item.quantity * item.product.priceout,
        0,
      );
      setTotalCost(cost);
    } catch (error) {
      console.error("Error calculating total cost:", error);
    }
  };

  const handleDeleteCart = async (cartId) => {
    try {
      let token = authLocal.getToken();
      token = token.replace(/^"|"$/g, "");

      await deleteCart(cartId, token);
      fetchCarts();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  const fetchCarts = async () => {
    try {
      let token = authLocal.getToken();
      token = token.replace(/^"|"$/g, "");

      let userId = userIdLocal.getUserId();
      userId = userId.replace(/^"|"$/g, "");

      if (userId) {
        const cartsData = await getCarts(userId, token);
        setCarts(cartsData.data.data.cart);
        calculateTotalCost(cartsData.data.data.cart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavigate = () => {
    navigate("/checkout", {
      state: {
        carts: carts, // Truyền giỏ hàng
        totalCost: totalCost, // Truyền tổng tiền
      },
    });
  };

  return (
    <div>
      <Header />
      <section
        id="page-header"
        className="h-52"
        style={{
          backgroundImage: `url("images/banner/chk1.jpg")`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-[rgba(8,28,14,0.79)] text-center">
          <h2 className="text-2xl font-bold text-white">GIỎ HÀNG CỦA BẠN</h2>
          <p className="text-white"></p>
          <a href="#" className="to-top">
            <i className="fas fa-chevron-up"></i>
          </a>
        </div>
      </section>

      <div className="small-container shadow-lg bg-white p-4 md:p-12 lg:px-32 xl:px-52">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="w-1/2 rounded-tl-md bg-[#006532] p-2 pl-6 text-left font-normal text-white md:w-1/3">
                Sản phẩm
              </th>

              <th className="w-1/6 bg-[#006532] py-2 pl-8 text-left font-normal text-white">
                Số lượng
              </th>
              <th className="w-1/6 rounded-tr-md bg-[#006532] py-2 pr-6 text-end font-normal text-white">
                Số tiền
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Product Row */}
            {carts.map((cart) => (
              <tr key={cart.id} className="border-t-2 border-[#00653294]">
                <td className="mx-2 w-2/5 p-2 md:w-2/3">
                  <div className="cart-info flex flex-wrap items-center">
                    <img
                      src={cart.product.url_images}
                      alt="Image"
                      className="mr-3 h-[80px] md:h-[120px]"
                    />

                    <div>
                      <p className="mb-[10px] font-semibold text-[#006532]">
                        {cart.product.name}
                      </p>
                      <small className="block">
                        Bao: {cart.product.weight}kg
                      </small>
                      <small className="block">
                        Đơn giá: {cart.product.priceout}đ
                      </small>
                      <button
                        onClick={() => handleDeleteCart(cart.id)}
                        className="text-xs text-[#006532] no-underline hover:text-red-500"
                      >
                        Xóa
                      </button>
                    </div>
                  </div>
                </td>

                <td className="w-1/6">
                  {/* <QuantityInput /> */}
                  <div className="product__details__quantity">
                    <div className="flex h-[48px] w-[140px] items-center rounded border-2 border-[#00653265] bg-white">
                      <button
                        className="ml-[18px] mr-1 text-base font-normal text-gray-600 hover:bg-gray-300 focus:outline-none"
                        onClick={() => handleDecrease(cart.id, cart.quantity)}
                      >
                        <PiMinusBold />
                      </button>
                      <input
                        type="text"
                        value={cart.quantity}
                        readOnly
                        className="mr-1 w-16 border-0 text-center text-base font-normal text-gray-600 focus:outline-none"
                      />
                      <button
                        className="text-base font-normal text-gray-600 hover:bg-gray-300 focus:outline-none"
                        onClick={() => handleIncrease(cart.id, cart.quantity)}
                      >
                        <PiPlusBold />
                      </button>
                    </div>
                  </div>
                </td>
                <td className="w-1/6 p-2 pr-5 text-right font-semibold text-[#006532]">
                  {cart.product.priceout * cart.quantity}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-price mt-4 flex justify-end">
          <table className="w-full max-w-xs border-t-4 border-[#006532]">
            <tbody>
              <tr>
                <td className="px-2 pt-5 font-bold text-[#006532]">
                  Tổng thanh toán
                </td>
                <td className="px-2 pt-5 text-right font-bold text-[#006532]">
                  {totalCost}đ
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {console.log("length", carts.length)}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleNavigate}
            className="w-[320px] rounded border-2 border-[#006532] bg-[#006532] px-4 py-2 text-white hover:bg-[#80c9a4] hover:text-[#006532]"
          >
            Thanh toán
          </button>
        </div>
      </div>

      {/* <section
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
      </section> */}
      <Footer />
    </div>
  );
};

export default Cart;
