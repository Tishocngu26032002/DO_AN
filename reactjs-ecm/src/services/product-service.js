import axios from 'axios';
import { authLocal } from "../util/auth-local";

// Hàm lấy token từ localStorage
const getToken = () => {
  let token = authLocal.getToken(); // Lấy token từ authLocal
  return token ? token.replace(/"/g, '') : null; // Xóa dấu ngoặc kép nếu có
};

// Hàm lấy chi tiết sản phẩm
export const fetchProductDetail = async (productId) => {
  try {
    const response = await axios.get(`http://localhost:6006/product/${productId}`);
    console.log(response.data);
    if (response.status === 200 && response.data && response.data.data) {  
      return response.data.data; // Trả về dữ liệu khi thành công
    } else {  
      console.error("No data received from server.");
      return null; // Trả về null khi không có dữ liệu
    }
  } catch (error) {
    console.error("Error fetching product detail:", error);
    throw error;
  }
};

// Hàm lấy danh sách sản phẩm
export const fetchProducts = async (currentPage, productsPerPage) => {
  try {
    const response = await axios.get(`http://localhost:6006/product/${currentPage}/${productsPerPage}`);
    return response.data.data.data.map(product => ({
      id: product.id,
      name: product.name,
      priceout: product.priceout,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      url_images: product.url_images,
      description: product.description,
      stockQuantity: product.stockQuantity,
      weight: product.weight,
      expire_date: product.expire_date
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Hàm thêm sản phẩm mới
export const addProduct = async (formData) => {
  try {
    const token = getToken();
    const response = await axios.post('http://localhost:6006/product', formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// Hàm chỉnh sửa sản phẩm
export const editProduct = async (id, formData) => {
  try {
    const token = getToken();
    const response = await axios.patch(`http://localhost:6006/product/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
};

// Hàm xóa sản phẩm
export const deleteProduct = async (id) => {
  try {
    const token = getToken();
    if (!token) throw new Error("No token found in localStorage");
    const response = await axios.delete(`http://localhost:6006/product/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
