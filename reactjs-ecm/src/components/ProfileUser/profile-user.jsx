import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Dialog } from '@headlessui/react';
import { getUserById, updateUser } from '../../services/user-service';
import { getLocationUserById, updateLocationUser } from '../../services/location-user-service';
import Header from '../Header/header';
import Footer from '../Footer/footer';

const UserProfile = () => {
  const [activePage, setActivePage] = useState("profile");
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

  const ProfilePage = () => (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg space-y-6">
          <h2 className="text-3xl font-semibold text-[#006532] mb-6 text-center">Thông tin người dùng</h2>
    
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#006532] text-lg">Họ Tên:</span>
              <span className="text-gray-800 text-lg">{userData.firstName} {userData.lastName}</span>
            </div>
    
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#006532] text-lg">Email:</span>
              <span className="text-gray-800 text-lg">{userData.email}</span>
            </div>
    
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#006532] text-lg">Địa chỉ:</span>
              <span className="text-gray-800 text-lg">{locationData.address || "No Address Found"}</span>
            </div>
    
            <div className="flex items-center justify-between">
              <span className="font-medium text-[#006532] text-lg">Điện thoại:</span>
              <span className="text-gray-800 text-lg">{locationData.phone || "No Phone Found"}</span>
            </div>
          </div>
    
          <button
            onClick={handleEditClick}
            className="mt-6 px-6 py-3 bg-[#006532] text-white font-semibold rounded-md hover:bg-green-700 w-full sm:w-auto"
          >
            Chỉnh sửa
          </button>
  
        <Dialog
            open={isEditing}
            onClose={() => setIsEditing(false)}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto space-y-6">
              <Dialog.Title className="text-2xl font-semibold text-[#006532] mb-4 text-center">
                Chỉnh sửa thông tin
              </Dialog.Title>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Họ</label>
                    <input
                      type="text"
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532] p-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tên</label>
                    <input
                      type="text"
                      name="lastName"
                      value={editForm.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532] p-3"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                  <input
                    type="text"
                    name="address"
                    value={editForm.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532] p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                  <input
                    type="text"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532] p-3"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Hủy
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-[#006532] text-white font-semibold rounded-md hover:bg-green-700"
                >
                  Lưu
                </button>
              </div>
            </div>
          </Dialog>
        </div>
  );

  const OrderHistory = () => (
    <div>
      <h2 className="text-2xl font-semibold text-[#006532] mb-4">Lịch sử đơn hàng</h2>
      <p>Chưa có đơn hàng nào.</p>
    </div>
  );

  const ChangePassword = () => (
    <div>
      <h2 className="text-2xl font-semibold text-[#006532] mb-4">Đổi mật khẩu</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Mật khẩu cũ</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532] p-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532] p-3"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu mới</label>
          <input
            type="password"
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-[#006532] focus:ring-[#006532] p-3"
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#006532] text-white font-semibold rounded-md hover:bg-green-700"
        >
          Đổi mật khẩu
        </button>
      </form>
    </div>
  )

  return (
    <>
      <Header />
        <div className="flex h-screen">
        {/* Taskbar */}
        <div className="w-64 bg-[#006532] text-white p-6 space-y-4">
          <h2 className="text-2xl font-semibold mb-4">Menu</h2>
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => setActivePage("profile")}
                className={`w-full text-left py-2 px-3 rounded-md hover:bg-green-700 ${
                  activePage === "profile" ? "bg-green-700" : ""
                }`}
              >
                Thông tin cá nhân
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("orders")}
                className={`w-full text-left py-2 px-3 rounded-md hover:bg-green-700 ${
                  activePage === "orders" ? "bg-green-700" : ""
                }`}
              >
                Lịch sử đơn hàng
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("changePassword")}
                className={`w-full text-left py-2 px-3 rounded-md hover:bg-green-700 ${
                  activePage === "changePassword" ? "bg-green-700" : ""
                }`}
              >
                Đổi mật khẩu
              </button>
            </li>
          </ul>
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 p-6">
          {activePage === "profile" && <ProfilePage />}
          {activePage === "orders" && <OrderHistory />}
          {activePage === "changePassword" && <ChangePassword />}
        </div>
      </div>
      <Footer />
    </>
  );
  
};

export default UserProfile;