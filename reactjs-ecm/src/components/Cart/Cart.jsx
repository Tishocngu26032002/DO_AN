import React from "react";
import Header from "../Header/header.jsx";
import Footer from "../Footer/footer.jsx";
import QuantityInput from "../Button/quantity-selector-buttom.jsx";
import { PiShoppingCart } from "react-icons/pi";
const Cart = () => {
  const productImages = [
    "/images/product/range_cubes.jpg",
    "/images/product/264.png",
    "/images/product/266.png",
    "/images/product/262.png", // Bạn có thể thêm nhiều ảnh khác tại đây
  ];
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
        <div className="bg-[rgba(8,28,14,0.79)] w-full h-full flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-white">YOUR CART</h2>
          <p className="text-white"></p>
          <a href="#" className="to-top">
            <i className="fas fa-chevron-up"></i>
          </a>
        </div>
      </section>

      <div className="small-container p-4 md:p-12 lg:px-32 xl:px-52 bg-white rounded-lg shadow-lg">
        <table className="w-full border-collapse ">
          <thead>
            <tr>
              <th className="bg-[#006532] pl-6 p-2 text-left font-normal text-white w-1/2 md:w-1/3">
                Product
              </th>
              <th className="bg-[#006532] py-2 pl-8 md:pl-16 text-left font-normal text-white w-1/6 md:w-1/12">
                Size
              </th>
              <th className="bg-[#006532] py-2 pl-12 text-left font-normal text-white w-1/6">
                Quantity
              </th>
              <th className="bg-[#006532] py-2 pr-6 text-left font-normal text-white w-1/6">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Sample Product Row */}
            {Array(3).fill(null).map((_, index) => (
              <tr key={index}>
                <td className="p-2 w-1/2 md:w-2/3">
                  <div className="cart-info flex flex-wrap items-center">
                    <img
                      src="images/products/f1.png"
                      alt="Tshirt"
                      className="mr-3 h-[80px] md:h-[120px]"
                    />
                    <div>
                      <p className="mb-[10px] mt-[15px]">Orange Printed Tshirt</p>
                      <small className="block">Price: $78.00</small>
                      <a href="#" className="text-xs text-[#006532] no-underline">
                        Remove
                      </a>
                    </div>
                  </div>
                </td>
                <td className="p-2 w-1/2 sm:w-1/6 md:w-1/6 ">
                  <select className="w-full border border-gray-300 rounded p-1 h-[48px]">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </td>
                <td className="p-2 w-1/6">
                  <QuantityInput />
                </td>
                <td className="p-2 w-1/6">$78.00</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="total-price mt-4 flex justify-end">
          <table className="w-full max-w-xs border-t-4 border-[#006532]">
            <tbody>
              <tr>
                <td className="p-2">Subtotal</td>
                <td className="p-2 text-right">$234.00</td>
              </tr>
              <tr>
                <td className="p-2">Delivery Fee</td>
                <td className="p-2 text-right">$35.00</td>
              </tr>
              <tr>
                <td className=" p-2 font-bold text-[#006532]">Total</td>
                <td className="text-[#006532] font-bold p-2 text-right ">
                  $269.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="hover:bg-[#006532] border-2 border-[#006532] hover:text-white text-[#006532] py-2 px-4 rounded w-[320px]">
            Checkout
          </button>
        </div>
      </div>
      <section id="product1" className="py-10 text-center bg-[#f9f9f9] mt-10 pt-10">
        <div className="text-[46px] font-semibold leading-[54px] text-[#006532]">
          Newest Products
        </div>
        <div className="pro-container flex flex-wrap justify-evenly pt-5">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="pro ease relative m-4 w-1/5 min-w-[250px] cursor-pointer rounded-2xl border border-[#cce7d0] p-3 shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)] bg-white"
            >
              <img
                src="/images/products/262.png"
                alt={`Product ${index + 1}`}
                className="w-full rounded-xl"
              />
              <div className="des pt-3 text-start">
                <span className="text-sm text-[#006532]">Adidas</span>
                <h5 className="pt-2 text-sm text-[#1a1a1a]">
                  Cotton shirts pure cotton
                </h5>
                <div className="star mt-2 flex">
                  {[...Array(5)].map((_, starIndex) => (
                    <i
                      key={starIndex}
                      className="fas fa-star mr-1 text-xs text-yellow-500"
                    ></i>
                  ))}
                </div>
                <h4 className="m pt-2 text-lg font-bold text-[#006532]">$78</h4>
              </div>
              <a
                href="#"
                className="cart absolute bottom-5 -mb-3 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#cce7d0] bg-[#e8f6ea] font-medium leading-10 text-[#006532]"
              >
                <PiShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Cart;
