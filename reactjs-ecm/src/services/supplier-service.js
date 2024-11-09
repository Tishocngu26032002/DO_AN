import axios from "axios";
import { authLocal } from "../util/auth-local";

const getToken = () => {
  let token = authLocal.getToken(); 
  return token.replace(/"/g, ''); 
};

export async function getSupplier(page, limit) {
    try {
        const token = getToken(); 
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
export async function deleteSupplier(supplierId) {
  try {
    const token = getToken(); 
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

export async function deleteSuppliers(supplierId) {
    const token = getToken(); 
    
    await axios.delete(`http://localhost:6006/supplier/${supplierId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
  
// Tạo nhà cung cấp mới
export const createSupplier = async (supplierData) => {
  try {
    const token = getToken(); 
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


export async function updateSupplier(supplierId, supplierData) {
    try {
      const token = getToken(); 
  
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
