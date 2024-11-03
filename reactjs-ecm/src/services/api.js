const BASE_URL = "http://localhost:4444/api";

export default async function restApi({ endpoint, method, body }) {
  try {
    const res = await fetch(`${BASE_URL}/${endpoint}`, {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
}
