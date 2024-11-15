import axios from "axios";

const BASE_URL = "http://localhost:6006";

export async function getCarts(user_id, token) {
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

export const updateCart = async (data, token) => {
  return await axios.patch(`${BASE_URL}/cart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export async function deleteCart(user_id, token) {
  return await axios.delete(`${BASE_URL}/cart/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}