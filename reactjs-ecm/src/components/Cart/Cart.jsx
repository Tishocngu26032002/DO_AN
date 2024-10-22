
import productImage2 from "../../assets/f3.jpg";

import imgbanner from "../../assets/banner.png";
import QuantityInput from '../Button/QuantitySelectorButtom.jsx'
const Cart = () => {
  return (
    <div>
  
      <section 
        id="page-header" 
        className="bg-cover flex flex-col items-center justify-center text-center p-4 h-52"
        style={{ backgroundImage: `url(${imgbanner})` }}
      >
        <h2 className="text-2xl text-white font-bold">#CART</h2>
        <p className="text-white">Enter your coupon code...</p>
        <a href="#" className="to-top">
          <i className="fas fa-chevron-up"></i>
        </a>
      </section>
          {/* <div className="text-2xl text-black p-12 w-full flex justify-center items-center  ">
            <h2>Your Cart is Empty</h2>
          </div> */}
      <div className="small-container p-12   ">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 text-white bg-teal-700 font-normal">Product</th>
              <th className="text-left p-2 pl-[38px] text-white bg-teal-700 font-normal">Quantity</th>
              <th className="text-left p-2 text-white bg-teal-700 font-normal">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2">
                <div className="cart-info flex flex-wrap">
                 <img src={productImage2} alt="Tshirt" className="h-[120px]  mr-3" />
                  <div>
                    <p className="mt-[15px] mb-[20px]">Orange Printed Tshirt</p>
                    <small className="block">Price: $78.00</small>
                    <a href="#" className="text-teal-700 text-xs no-underline">Remove</a>
                  </div>
                </div>
              </td>
              <td className="p-2"><QuantityInput/></td>
              <td className="p-2">$78.00</td>
            </tr>
            <tr>
              <td className="p-2">
                <div className="cart-info flex flex-wrap">
                  <img src={productImage2} alt="Tshirt" className=" h-[120px] mr-3" />
                  <div>
                    <p className="mt-[15px] mb-[20px]">Orange Printed Tshirt</p>
                    <small className="block">Price: $78.00</small>
                    <a href="#" className="text-teal-700 text-xs no-underline">Remove</a>
                  </div>
                </div>
              </td>
              <td className="p-2"><QuantityInput/></td>
              <td className="p-2">$78.00</td>
            </tr>
            <tr>
              <td className="p-2">
                <div className="cart-info flex flex-wrap">
                  <img src={productImage2} alt="Tshirt" className=" h-[120px] mr-3" />
                  <div>
                    <p className="mt-[15px] mb-[20px]">Orange Printed Tshirt</p>
                    <small className="block">Price: $78.00</small>
                    <a href="#" className="text-teal-700 text-xs no-underline">Remove</a>
                  </div>
                </div>
              </td>
              <td className="p-2"><QuantityInput/></td>
              <td className="p-2">$78.00</td>
            </tr>
          </tbody>
        </table>

        <div className="total-price flex justify-end mt-4">
          <table className="border-t-4 border-teal-700 w-full max-w-xs">
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
                <td className="p-2 bg-teal-600 text-white">Total</td>
                <td className="p-2 bg-teal-600 text-white text-right">$269.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className=" mt-4 flex justify-end ">
          <button className="bg-teal-700 text-white py-2 px-4 rounded">Checkout</button>
        </div>
      </div>
      
    </div>
  );
};

export default Cart;
