import axios from "axios";
import { fetchUsers as fetchUsersFromAPI } from './auth-api';
export const apiClient = axios.create({
  baseURL: "http://localhost:6006",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 1000,
});
export const fetchUsers = async (page, limit) => {
  const result = await fetchUsersFromAPI(page, limit);
  // Tùy chỉnh dữ liệu nếu cần
  return result;
};