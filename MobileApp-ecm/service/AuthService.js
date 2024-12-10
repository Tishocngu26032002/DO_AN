import { CONFIG } from "../config";

export async function loginAuth(email, password) {
  try {
    const params = { email: email, password: password };
    console.log(params);
    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });
    const data = await response.json(); // Giải mã dữ liệu JSON từ phản hồi
    return {
      status: response.status,
      ok: response.ok,
      data: response.ok ? data : null, // Trả về null nếu response không thành công
      message: data.message || "Unexpected error occurred",
    };
  } catch (error) {
    console.error("API error:", error);
    return {
      status: 500,
      ok: false,
      data: null,
      message: "Network error or server not reachable",
    };
  }
}
