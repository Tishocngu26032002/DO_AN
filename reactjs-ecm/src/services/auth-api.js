import { apiClient } from "./custom-auth-api";

export async function loginApi(params) {
  try {
    const response = await apiClient.post("/login", params);
    return response?.data;
  } catch (error) {
    return error?.response.data;
  }
}
