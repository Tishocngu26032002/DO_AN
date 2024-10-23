import axios from "./custom-service.js";

export async function getProducts(query) {
  try {
    const res = await axios.get(`/api/products?${query}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

// export async function createProducts(product) {
//   try {
//     const res = await axios.post(`${BASE_URL}/products`, product, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return res.data;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function updateProducts(product) {
//     try {
//       const res = await axios.put(`${BASE_URL}/products/${product.id}`, product, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       return res.data;
//     } catch (error) {
//       throw error;
//     }
//   }

// export async function deleteProducts(productId) {
//   try {
//     const res = await axios.delete(`${BASE_URL}/products/${productId}`);
//     return res.status === 200;
//   } catch (error) {
//     throw error;
//   }
// }

// export async function deleteProduct(productId) {
//   try {
//     const res = await axios.delete(`${BASE_URL}/products/${productId.id}`);
//     return res.status === 200;
//   } catch (error) {
//     throw error;
//   }
// }
