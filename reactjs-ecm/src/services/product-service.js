import axios from "axios";

const BASE_URL = "http://localhost:6006";

export async function getProducts(page, limit) {
  try {
    const response = await axios.get(`${BASE_URL}/product/${page}/${limit}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getQueryProducts(page, limit, name, category_id) {
  try {
    const response = await axios.get(
      `${BASE_URL}/product/search/${page}/${limit}?name=${name}&category=${category_id}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}
