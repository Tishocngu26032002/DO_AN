import axios from "axios";
import { getToken, getUserId } from "../util/auth-local";

const BASE_URL = "http://localhost:6006";


export async function getUsers(page, limit) {
  try {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/users/${page}/${limit}`, {
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
    const token = getToken(); 
    const res = await axios.delete(`${BASE_URL}/users/${userId}`, {
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
  try {
    const token = getToken(); // Lấy token
    const res = await axios.patch(`${BASE_URL}/users/${userId}`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Truyền token ở đây
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Tạo người dùng mới
export const createUser = async (userData) => {
  try {
    const token = getToken(); // Lấy token
    const res = await axios.post(`${BASE_URL}/users`, userData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Truyền token ở đây
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export async function getUser() {
  
  try {
    const userId = getUserId();
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token ở đây
        accept: "*/*",
      },
    });
    return res.data; // Hoặc bạn có thể chỉ cần return true nếu xóa thành công
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}