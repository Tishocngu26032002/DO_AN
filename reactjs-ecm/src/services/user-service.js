import axios from "axios";
import { authLocal } from "../util/auth-local";

// Lấy token từ localStorage
const getToken = () => {
  let token = authLocal.getToken(); 
  return token.replace(/"/g, ''); 
};


export async function getUsers(page, limit) {
  try {
    const token = getToken(); 
    console.log(token);
    
    const res = await axios.get(`http://localhost:6006/users/${page}/${limit}`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'accept': '*/*',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Xóa người dùng theo ID
export async function deleteUser(userId) {
  try {
    const token = getToken(); // Lấy token
    const res = await axios.delete(`http://localhost:6006/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Truyền token ở đây
        'accept': '*/*',
      },
    });
    return res.data; // Hoặc bạn có thể chỉ cần return true nếu xóa thành công
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Cập nhật người dùng
export const updateUser = async (userId, userData) => {
  const token = getToken(); // Lấy token
  const res = await axios.patch(`http://localhost:6006/users/${userId}`, userData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Truyền token ở đây
    },
  });
  return res.data;
};

// Tạo người dùng mới
export const createUser = async (userData) => {
  const token = getToken(); // Lấy token
  const res = await axios.post(`http://localhost:6006/users`, userData, {
    headers: {
      'Authorization': `Bearer ${token}`, // Truyền token ở đây
    },
  });
  return res.data;
};
