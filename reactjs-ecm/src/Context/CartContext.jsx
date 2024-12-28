import React, { createContext, useContext, useState, useEffect } from "react";
import { getUserId } from "../util/auth-local";
import { getCarts, updateCart, deleteCart } from "../services/cart-service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [carts, setCarts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true); // Thêm trạng thái loading

  const updateSelectedCartItems = (items) => {
    setSelectedCartItems(items);
  };

  const fetchCarts = async () => {
    try {
      setIsLoading(true);
      const userId = getUserId();
      if (userId) {
        const response = await getCarts();
        const cartData = response.data.data.cart;
        console.log("cartDATA", cartData);
        const formattedCarts = cartData.map(item => {
          let urlImages = {};
  
          // Kiểm tra nếu url_images có giá trị hợp lệ
          if (item.product.url_images) {
            const cleanedUrlImages = item.product.url_images.replace(/\\\"/g, '"');
            try {
              urlImages = JSON.parse(cleanedUrlImages);  
            } catch (error) {
              console.error("Error parsing url_images:", error);
              urlImages = {};
            }
          }
  
          return {
            ...item,
            product: {
              ...item.product,
              url_image1: urlImages.url_images1 || "",  
              url_image2: urlImages.url_images2 || "",  
            },
          };
        });
        console.log(formattedCarts)
        setCarts(formattedCarts);
        calculateTotalCost(formattedCarts);
        calculateTotalQuantity(formattedCarts);
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
    } finally {
      setIsLoading(false); // Đánh dấu dữ liệu đã được tải xong
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

  const calculateTotalQuantity = (cartsData) => {
    try {
      const quantity = cartsData.reduce((total, item) => total + 1, 0);
      setTotalQuantity(quantity); // Cập nhật tổng số lượng
    } catch (error) {
      console.error("Error calculating total quantity:", error);
    }
  };

  const updateCartQuantity = async (cartId, newQuantity) => {
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);
    if (cartIndex !== -1) {
      try {
        await updateCart({ ...carts[cartIndex], quantity: newQuantity });
        // fetchCarts();
      } catch (error) {
        console.error("Error updating cart quantity:", error);
      }
    }
  };

  const deleteCartItem = async (cartId) => {
    try {
      await deleteCart(cartId);
      // fetchCarts();
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };

  const addToCart = async (cartItem) => {
    try {
      // Gọi API thêm sản phẩm vào giỏ hàng
      await updateCart(cartItem); // Hoặc một API phù hợp
      // Cập nhật `totalQuantity` tạm thời
      setTotalQuantity((prevQuantity) => prevQuantity + 1);
      fetchCarts(); // Gọi lại để đồng bộ dữ liệu
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const clearSelectedCartItems = () => {
    setSelectedCartItems((prevItems) =>
      prevItems.filter((item) => !selectedCartItems.includes(item)),
    );
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        carts,
        totalCost,
        totalQuantity,
        selectedCartItems,
        clearSelectedCartItems,
        setCarts,
        setTotalQuantity,
        setTotalCost,
        fetchCarts,
        updateCartQuantity,
        deleteCartItem,
        addToCart,
        updateSelectedCartItems,
      }}
    >
      {!isLoading && children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
