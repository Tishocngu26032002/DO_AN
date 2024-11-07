import axios from "axios";

export async function getCarts(user_id, token) {
  return await axios.get(
    `http://localhost:6006/cart/all-product-in-cart?user_id=${user_id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export const createCart = async (data, token) => {
  return await axios.post(`http://localhost:6006/cart/add-to-cart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateCart = async (data, token) => {
  return await axios.patch(`http://localhost:6006/cart`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export async function deleteCart(user_id, token) {
  return await axios.delete(`http://localhost:6006/cart/${user_id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
