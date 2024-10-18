import Header from "../Header/header.jsx"
import productImage2 from "../../assets/f3.jpg";

import imgbanner from "../../assets/banner.png";
const Cart = () => {
  return (
    <div>
    <Header />
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
      <div className="small-container p-12 w-4/5 mx-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-2 text-white bg-teal-700 font-normal">Product</th>
              <th className="text-left p-2 text-white bg-teal-700 font-normal">Quantity</th>
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
              <td className="p-2"><input type="number" defaultValue="1" min={1} className="w-12 h-8 p-1 border border-slate-400" /></td>
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
              <td className="p-2"><input type="number"
            defaultValue="1" min={1} className="w-12 h-8 p-1 border border-slate-400" /></td>
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
              <td className="p-2"><input type="number" defaultValue="1" min={1} className="w-12 h-8 p-1 border border-slate-400" /></td>
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
                <td className="p-2">Tax</td>
                <td className="p-2 text-right">$35.00</td>
              </tr>
              <tr>
                <td className="p-2 bg-teal-600 text-white">Total</td>
                <td className="p-2 bg-teal-600 text-white text-right">$269.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
