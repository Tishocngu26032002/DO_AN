import { apiClient } from "./custom-auth-api";
import axios from 'axios';
export async function loginApi(params) {
  try {
    const response = await apiClient.post("/login", params);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}
const API_BASE_URL = 'http://localhost:6006';

export const fetchUsers = async (page, limit) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${page}/${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};