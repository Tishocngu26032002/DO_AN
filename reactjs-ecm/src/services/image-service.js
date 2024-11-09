import axios from "axios";
import { authLocal } from "../util/auth-local";

// Lấy token từ localStorage
const getToken = () => {
  let token = authLocal.getToken();
  return token.replace(/"/g, ''); // Loại bỏ dấu ngoặc kép nếu có
};

// Hàm upload hình ảnh
export const uploadImage = async (file) => {
  const token = getToken(); // Lấy token
  const formData = new FormData();
  formData.append('files', file);

  try {
    const res = await axios.post('http://localhost:6006/image/upload', formData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Truyền token ở đây
        'Content-Type': 'multipart/form-data',
      },
      timeout: 10000, // Thiết lập timeout
    });
    return res.data;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
