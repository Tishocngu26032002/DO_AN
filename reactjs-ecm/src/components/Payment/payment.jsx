import React, { useState } from 'react';
import Header from '../Header/header';
import Footer from "../Footer/footer"
const Payment = () => {
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
  };

  const products = [
    { id: 1, name: 'Orange Printed Tshirt', quantity: 2, price: 78.0, size: 'M', imgSrc: './images/product/262.png' },
    { id: 2, name: 'Orange Printed Tshirt', quantity: 1, price: 78.0, size: 'L', imgSrc: './images/product/264.png' },
    { id: 3, name: 'Orange Printed Tshirt', quantity: 3, price: 78.0, size: 'S', imgSrc: './images/product/266.png' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
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
        <div className="bg-[rgba(8,28,14,0.64)] w-full h-full flex flex-col items-center justify-center text-center">
          <h2 className="text-2xl font-bold text-white">CHECKOUT</h2>
          <p className="text-white"></p>
          <a href="#" className="to-top">
            <i className="fas fa-chevron-up"></i>
          </a>
        </div>
      </section>

      <div className="container mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sản phẩm */}
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Your Order</h3>
            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 border border-gray-200">
                  <img src={product.imgSrc} alt={product.name} className="w-24 h-24 rounded-lg" />
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">{product.name}</h4>
                    <p className="text-sm text-gray-500">Quantity: {product.quantity}</p>
                    <p className="text-sm text-gray-500">Size: {product.size}</p>
                    <p className="text-sm text-gray-700 font-medium">Price: ${product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white shadow-lg rounded-lg p-4 mt-6 border border-gray-200">
              <div className="flex justify-between items-center border-b pb-2 mb-2 text-gray-700">
                <span>Subtotal</span>
                <span>$234.00</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2 mb-2 text-gray-700">
                <span>Delivery Fee</span>
                <span>$35.00</span>
              </div>
              <div className="flex justify-between items-center font-semibold text-lg text-green-600">
                <span>Total</span>
                <span>$269.00</span>
              </div>
            </div>
          </div>

          {/* Địa chỉ giao hàng và phương thức thanh toán */}
          <div className="order-1 md:order-2 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Address</h3>
            <form className="space-y-4">
              {['Full Name', 'Address', 'City', 'Country', 'Phone'].map((label, idx) => (
                <div key={idx}>
                  <label className="block text-sm font-medium text-gray-700">{label}</label>
                  <input
                    type="text"
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
                  />
                </div>
              ))}
            </form>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">Payment Method</h3>
              <div className="flex space-x-4">
                {['cash', 'card'].map((method) => (
                  <button
                    key={method}
                    onClick={() => handlePaymentChange(method)}
                    className={`py-2 px-4 rounded transition ${
                      paymentMethod === method
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {method === 'cash' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button className="bg-green-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-green-700 transition">
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Payment;
