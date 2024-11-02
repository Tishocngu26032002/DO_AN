import axios from "./custom-service.js";

export async function getProducts(query) {
  try {
    const res = await axios.get(`/api/products?${query}`);
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function getUsers(page, limit) {
  try {
    const res = await axios.get(`http://localhost:6006/users/${page}/${limit}`);
    return res.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const res = await axios.delete(`http://localhost:6006/users/${userId}`, {
      headers: {
        'accept': '*/*',
      },
    });
    return res.data; // Hoặc bạn có thể chỉ cần return true nếu xóa thành công
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}
export const updateUser = async (userId, userData) => {
  const res = await axios.patch(`http://localhost:6006/users/${userId}`, userData);
  return res.data;
};

export const createUser = async (userData) => {
  const res = await axios.post(`http://localhost:6006/users`, userData);
  return res.data;
};
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
