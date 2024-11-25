import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { getUserById, updateUser } from '../../services/user-service';
import { getLocationUserById, updateLocationUser } from '../../services/location-user-service';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const UserProfile = () => {
  const { userId } = useParams(); // Lấy userId từ URL
  const [userData, setUserData] = useState(null);
  const [locationData, setLocationData] = useState({
    phone: '',
    address: '',
    id: '',
    default_location: true,
    user_id: userId,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phone: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Gọi cả 2 API cùng một lúc
        const [user, location] = await Promise.all([
          getUserById(userId),
          getLocationUserById(userId),
        ]);
        if (location.data && Array.isArray(location.data.data) && location.data.data.length > 0) {
          setLocationData(location.data.data[0]);
        } else {
          setLocationData({
            phone: '',
            address: '',
            id: '',
            default_location: true,
            user_id: userId,
          });
        }

        // Lưu dữ liệu người dùng
        setUserData(user.data);

      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLocationData({
          phone: '',
          address: '',
          id: '',
          default_location: true,
          user_id: userId,
        });
      }
    };

    fetchUserData();
  }, [userId]);

  const handleEditClick = () => {
    // Lấy dữ liệu hiện tại để hiển thị trong form
    setEditForm({
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: locationData.address,
      phone: locationData.phone
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Gửi yêu cầu cập nhật thông tin người dùng
      await updateUser(userId, {
        firstName: editForm.firstName,
        lastName: editForm.lastName
      });
      await updateLocationUser({
        user_id: userId, // đảm bảo `user_id` là id người dùng
        address: editForm.address,
        phone: editForm.phone
      });
      setUserData({ ...userData, ...editForm });
      setLocationData({ ...locationData, address: editForm.address, phone: editForm.phone });
      setIsEditing(false); // Đóng modal sau khi lưu
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  if (!userData) {
    return <div className="text-center text-gray-500">Loading...</div>; // Hiển thị khi đang tải dữ liệu
  }

  return (
    <>
      <Header />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold text-[#006532] mb-4 text-center">Profile</h2>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#006532]">Name:</span>
            <span>{userData.firstName} {userData.lastName}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#006532]">Email:</span>
            <span>{userData.email}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-[#006532]">Address:</span>
            <span>{locationData.address || "No Address Found"}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-medium text-[#006532]">Phone:</span>
            <span>{locationData.phone || "No Phone Found"}</span>
          </div>
        </div>

        {/* Nút Edit Profile */}
        <button
          onClick={handleEditClick}
          className="mt-4 px-4 py-2 bg-[#006532] text-white font-semibold rounded-md hover:bg-green-700"
        >
          Edit Profile
        </button>

        {/* Modal chỉnh sửa */}
        <Dialog open={isEditing} onClose={() => setIsEditing(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md mx-auto">
            <Dialog.Title className="text-lg font-semibold text-[#006532] mb-4">Edit Profile</Dialog.Title>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={editForm.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532]"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={editForm.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={editForm.address}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532]"
                />
              </div>
            </div>

            {/* Nút Lưu và Hủy */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#006532] text-white font-semibold rounded-md hover:bg-green-700"
              >
                Save
              </button>
            </div>
          </div>
        </Dialog>
      </div>
      <Footer />
    </>
  );
};

export default UserProfile;