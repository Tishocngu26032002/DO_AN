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
