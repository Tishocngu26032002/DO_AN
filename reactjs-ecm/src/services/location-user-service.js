import axios from "axios";
import { getToken } from "../util/auth-local";

// Định nghĩa base URL
const BASE_URL = 'http://localhost:6006';

export async function getLocationUserById(userId) {
  try {
    const token = getToken(); // Lấy token
    const res = await axios.get(`${BASE_URL}/location-user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Truyền token ở đây
        'accept': '*/*',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error fetching location user:', error);
    throw error;
  }
}

// Tạo địa chỉ cho người dùng
export async function createLocationUser(locationData) {
  try {
    const token = getToken(); // Lấy token
    const res = await axios.post(`${BASE_URL}/location-user`, locationData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Truyền token ở đây
        'accept': '*/*',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error creating location user:', error);
    throw error;
  }
}

// Cập nhật thông tin địa chỉ người dùng
export async function updateLocationUser(locationData) {
  try {
    const token = getToken(); // Lấy token
    const res = await axios.patch(`${BASE_URL}/location-user`, locationData, {
      headers: {
        'Authorization': `Bearer ${token}`, // Truyền token ở đây
        'accept': '*/*',
      },
    });
    return res.data;
  } catch (error) {
    console.error('Error updating location user:', error);
    throw error;
  }
}

// Xóa địa chỉ của người dùng
export async function deleteLocationUser(userId) {
  try {
    const token = getToken(); // Lấy token
    const res = await axios.delete(`${BASE_URL}/location-user/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`, // Truyền token ở đây
        'accept': '*/*',
      },
    });
    return res.data; // Hoặc bạn có thể chỉ cần return true nếu xóa thành công
  } catch (error) {
    console.error('Error deleting location user:', error);
    throw error;
  }
}
