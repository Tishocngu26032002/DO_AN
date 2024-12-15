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

export async function getOrdersAdmin(page, limit, orderStatus,paymentStatus,includeExcluded) {
  try {
    const token = getToken();
    const res = await axios.get(`${BASE_URL}/order/manage-order/${page}/${limit}?orderStatus=${orderStatus}&paymentStatus=${paymentStatus}&includeExcluded=${includeExcluded}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    // console.log('api', res.data);
    return res.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

export const updateOrder = async ( orderData) => {
  try {
    const token = getToken(); // Lấy token
    const userId= getUserId();
    const res = await axios.patch(`${BASE_URL}/order/${userId}`, orderData, {
      headers: {
        Authorization: `Bearer ${token}`, // Truyền token ở đây
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};