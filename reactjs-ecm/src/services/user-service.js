import axios from "axios";
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
  