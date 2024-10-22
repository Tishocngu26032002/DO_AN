import React, { useState } from 'react';

import productImage2 from "../../assets/f3.jpg";
import imgbanner from "../../assets/banner.png";
import QuantityInput from '../Button/QuantitySelectorButtom.jsx';

const Payment = () => {
    const [paymentMethod, setPaymentMethod] = useState('cash');

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div>
     
      <section
        id="page-header"
        className="bg-cover flex flex-col items-center justify-center text-center p-4 h-52"
        style={{ backgroundImage: `url(${imgbanner})` }}
      >
        <h2 className="text-2xl text-white font-bold">#PAYMENT</h2>
        <p className="text-white">Complete your purchase...</p>
      </section>

      <div className="small-container p-2 md:p-12">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 p-4">
            <h3 className="text-3xl font-semibold mb-4">Shipping Address</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
            </form>
          </div>

          <div className="md:w-2/3 p-4">
            <h3 className="text-3xl font-semibold mb-4">Your Order</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 text-white bg-teal-700 font-normal">Product</th>
                  <th className="text-left p-2 text-white bg-teal-700 font-normal">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2">
                    <div className="cart-info flex">
                      <img src={productImage2} alt="Tshirt" className="h-[120px] mr-3" />
                      <div>
                        <p className="mt-[15px] mb-[20px]">Orange Printed Tshirt</p>
                        <small className="block">Quantity: 2</small>
                        <small className="block">Price: $78.00</small>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">$78.00</td>
                </tr>
                <tr>
                  <td className="p-2">
                    <div className="cart-info flex">
                      <img src={productImage2} alt="Tshirt" className="h-[120px] mr-3" />
                      <div>
                        <p className="mt-[15px] mb-[20px]">Orange Printed Tshirt</p>
                        <small className="block">Quantity: 2</small>
                        <small className="block">Price: $78.00</small>
                      </div>
                    </div>
                  </td>
                  <td className="p-2">$78.00</td>
                </tr>
                <tr>
                  <td className="p-2">
                    <div className="cart-info flex">
                      <img src={productImage2} alt="Tshirt" className="h-[120px] mr-3" />
                      <div>
                        <p className="mt-[15px] mb-[20px]">Orange Printed Tshirt</p>
                        <small className="block">Quantity: 2</small>
                        <small className="block">Price: $78.00</small>
                      </div>
                    </div>
                  </td>
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
          </div>
        </div>

        <div className="mt-8 px-4">
            <h3 className="text-3xl font-semibold mb-4">Payment Method</h3>
            <div className="flex space-x-4">
                <button
                onClick={() => handlePaymentChange('cash')}
                className={`py-2 px-4 rounded ${paymentMethod === 'cash' ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                Cash on Delivery
                </button>
                <button
                onClick={() => handlePaymentChange('card')}
                className={`py-2 px-4 rounded ${paymentMethod === 'card' ? 'bg-teal-700 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                Credit/Debit Card
                </button>
            </div>
        </div>


        <div className="mt-8 flex justify-end">
          <button className="bg-teal-700 text-white py-2 px-4 rounded">Place Order</button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
