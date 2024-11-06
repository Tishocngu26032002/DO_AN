import axios from "axios";
import { authLocal } from "../util/auth-local";
// Lấy danh sách nhà cung cấp
export async function getSupplier(page, limit, token) {
    try {
        let token = authLocal.getToken(); // Lấy token từ localStorage
    
        token = token.replace(/"/g, '');
        const res = await axios.get(
          `http://localhost:6006/supplier/${page}/${limit}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching supplier:", error.response ? error.response.data : error.message);
        throw error; // Ném lại lỗi để xử lý ở nơi gọi
      }
}

// Xóa nhà cung cấp
export async function deleteSupplier(supplierId, token) {
  try {
    let token = authLocal.getToken(); // Lấy token từ localStorage
    
        token = token.replace(/"/g, '');

    const res = await axios.delete(
      `http://localhost:6006/supplier/${supplierId}`,
      {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error deleting supplier:", error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function deleteSuppliers(supplierId, token) {
    
    await axios.delete(`http://localhost:6006/supplier/${supplierId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  
// Tạo nhà cung cấp mới
export const createSupplier = async (supplierData, token) => {
  try {
    // Log ra token trước khi gọi API
    let token = authLocal.getToken(); // Lấy token từ localStorage
    
    token = token.replace(/"/g, '');
    const res = await axios.post(
      `http://localhost:6006/supplier`,
      supplierData,
      {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error("Error adding supplier:", error.response ? error.response.data : error.message);
    throw error;
  }
};


export async function updateSupplier(supplierId, supplierData, token) {
    try {
        let token = authLocal.getToken(); // Lấy token từ localStorage
    
        token = token.replace(/"/g, '');
  
      const res = await axios.patch(
        `http://localhost:6006/supplier/${supplierId}`,
        supplierData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return res.data;
    } catch (error) {
      console.error("Error updating supplier:", error.response ? error.response.data : error.message);
      throw error;
    }
  }
