import axios from "axios";

const BASE_URL = "http://localhost:6006"; // Đổi URL nếu cần

export const fetchCategories = async () => {
  const response = await axios.get(`${BASE_URL}/product/1/30`); // Lấy tất cả hoặc phân trang
  return response.data;
};

export const createCategory = async (category) => {
  const response = await axios.post(`${BASE_URL}/product`, category);
  return response.data;
};

export const updateCategory = async (id, updatedCategory) => {
  const response = await axios.put(
    `${BASE_URL}/product/${id}`,
    updatedCategory,
  );
  return response.data;
};

export const deleteCategory = async (id) => {
  await axios.delete(`${BASE_URL}/product/${id}`);
};
