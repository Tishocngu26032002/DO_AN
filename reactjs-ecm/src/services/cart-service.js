import axios from "axios";
import { getToken, getUserId } from "../util/auth-local";

const BASE_URL = "http://localhost:6006";

const token = getToken();

const userId = getUserId();

export async function getCarts() {
  return await axios.get(
    `${BASE_URL}/cart/all-product-in-cart?user_id=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export const createCart = async (data) => {
  return await axios.post(`${BASE_URL}/cart/add-to-cart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCart = async (data) => {
  return await axios.patch(`${BASE_URL}/cart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export async function deleteCart(cartId) {
  return await axios.delete(`${BASE_URL}/cart/${cartId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
