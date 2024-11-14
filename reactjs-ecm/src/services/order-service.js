import axios from "axios";
import { authLocal } from "../util/auth-local";

export const postOrder = async ({
  totalPrice,
  paymentMethod,
  userId,
  phone,
  address,
  products,
}) => {
  try {
    let token = authLocal.getToken().replace(/^"|"$/g, "");
    const response = await axios.post(
      "http://localhost:6006/order", // URL của API
      {
        totalPrice,
        paymentMethod,
        user_id: userId,
        phone,
        address,
        products,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error posting order:", error);
    throw error;
  }
};
