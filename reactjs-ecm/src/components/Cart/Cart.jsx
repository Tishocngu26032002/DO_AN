import Header from "../Header/header.jsx";

import QuantityInput from "../Button/quantity-selector-buttom.jsx";
const Cart = () => {
  return (
    <div>
      <Header />
      <section
        id="page-header"
        className="flex h-52 flex-col items-center justify-center bg-cover p-4 text-center"
        style={{ backgroundImage: `url("images/banner/banner-cart.png")` }}
      >
        <h2 className="text-2xl font-bold text-white">#CART</h2>
        <p className="text-white">Enter your coupon code...</p>
        <a href="#" className="to-top">
          <i className="fas fa-chevron-up"></i>
        </a>
      </section>
      {/* <div className="text-2xl text-black p-12 w-full flex justify-center items-center  ">
            <h2>Your Cart is Empty</h2>
          </div> */}
      <div className="small-container p-12">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="bg-teal-700 p-2 text-left font-normal text-white">
                Product
              </th>
              <th className="bg-teal-700 p-2 pl-[38px] text-left font-normal text-white">
                Quantity
              </th>
              <th className="bg-teal-700 p-2 text-left font-normal text-white">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">
                <div className="cart-info flex flex-wrap">
                  <img
                    src="images/products/f1.png"
                    alt="Tshirt"
                    className="mr-3 h-[120px]"
                  />
                  <div>
                    <p className="mb-[20px] mt-[15px]">Orange Printed Tshirt</p>
                    <small className="block">Price: $78.00</small>
                    <a href="#" className="text-xs text-teal-700 no-underline">
                      Remove
                    </a>
                  </div>
                </div>
              </td>
              <td className="p-2">
                <QuantityInput />
              </td>
              <td className="p-2">$78.00</td>
            </tr>
            <tr>
              <td className="p-2">
                <div className="cart-info flex flex-wrap">
                  <img
                    src="images/products/f1.png"
                    alt="Tshirt"
                    className="mr-3 h-[120px]"
                  />
                  <div>
                    <p className="mb-[20px] mt-[15px]">Orange Printed Tshirt</p>
                    <small className="block">Price: $78.00</small>
                    <a href="#" className="text-xs text-teal-700 no-underline">
                      Remove
                    </a>
                  </div>
                </div>
              </td>
              <td className="p-2">
                <QuantityInput />
              </td>
              <td className="p-2">$78.00</td>
            </tr>
            <tr>
              <td className="p-2">
                <div className="cart-info flex flex-wrap">
                  <img
                    src="images/products/f1.png"
                    alt="Tshirt"
                    className="mr-3 h-[120px]"
                  />
                  <div>
                    <p className="mb-[20px] mt-[15px]">Orange Printed Tshirt</p>
                    <small className="block">Price: $78.00</small>
                    <a href="#" className="text-xs text-teal-700 no-underline">
                      Remove
                    </a>
                  </div>
                </div>
              </td>
              <td className="p-2">
                <QuantityInput />
              </td>
              <td className="p-2">$78.00</td>
            </tr>
          </tbody>
        </table>

        <div className="total-price mt-4 flex justify-end">
          <table className="w-full max-w-xs border-t-4 border-teal-700">
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
                <td className="bg-teal-600 p-2 text-white">Total</td>
                <td className="bg-teal-600 p-2 text-right text-white">
                  $269.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
