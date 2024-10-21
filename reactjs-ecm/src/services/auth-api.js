import { apiClient } from "./custom-auth-api";

export function loginApi(params) {
  return apiClient.post("/auth/login", params);
}
