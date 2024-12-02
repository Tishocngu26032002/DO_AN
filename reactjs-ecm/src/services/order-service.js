import axios from "axios";
import { getToken, getUserId } from "../util/auth-local";

const BASE_URL = "http://localhost:6006";

export async function getAddresses() {
  try {
    const token = getToken();
    const userId = getUserId();
    const res = await axios.get(`${BASE_URL}/location-user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error fetching addresses:", error);
    throw error;
  }
}

export const createNewAddress = async (newName, newAddress, newPhone) => {
  try {
    const token = getToken();
    const userId = getUserId();
    const res = await axios.post(
      `${BASE_URL}/location-user`,
      {
        name: newName,
        address: newAddress,
        phone: newPhone,
        default_location: true,
        user_id: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res;
  } catch (error) {
    console.error("Error creating new address:", error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  try {
    const token = getToken();
    const res = await axios.post(`${BASE_URL}/order`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.error("Error creating order", error);
    throw error;
  }
};

// Lấy danh sách đơn hàng (pagination và filter)
export const getOrderManagement = async (page, limit, filters = {}) => {
  try {
    const token = getToken();
    const { orderStatus, paymentStatus } = filters;
    const res = await axios.get(`${BASE_URL}/manage-order/${page}/${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { orderStatus, paymentStatus },
    });
    return res.data; // Trả về dữ liệu đã xử lý
  } catch (error) {
    console.error("Error fetching order management:", error);
    throw error;
  }
};

// Lấy chi tiết đơn hàng
export const getDetailOrder = async (id) => {
  try {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/manage-order/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching order detail:", error);
    throw error;
  }
};

// Cập nhật đơn hàng
export const updateOrder = async (updateData) => {
  try {
    const token = getToken();
    const res = await axios.patch(`${BASE_URL}/order`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};