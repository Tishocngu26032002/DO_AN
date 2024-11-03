import restApi from "./api";

export async function getProducts(query) {
  return await restApi({ endpoint: `products?${query}`, method: "GET" });
}
