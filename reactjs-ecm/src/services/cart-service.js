import axios from "axios";
import { getToken, getUserId } from "../util/auth-local";

const BASE_URL = "http://localhost:6006";

export async function getCarts() {
  const token = getToken();
  const user_id = getUserId();
  return await axios.get(
    `${BASE_URL}/cart/all-product-in-cart?user_id=${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export const createCart = async (data, token) => {
  return await axios.post(`${BASE_URL}/cart/add-to-cart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCart = async (data) => {
  const token = getToken();
  return await axios.patch(`${BASE_URL}/cart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export async function deleteCart(user_id) {
  const token = getToken();
  return await axios.delete(`${BASE_URL}/cart/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
