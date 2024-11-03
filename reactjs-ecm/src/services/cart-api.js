import restApi from "./api";

export async function getCarts(query) {
  return await restApi({ endpoint: `carts?${query}`, method: "GET" });
}

export async function createCart(data) {
  return await restApi({ endpoint: "carts", method: "POST", body: data });
}

export async function updateCart(data) {
  return await restApi({
    endpoint: `carts/${data.id}`,
    method: "PUT",
    body: data,
  });
}
