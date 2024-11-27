import React, {useContext, useEffect, useRef, useState} from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose, IoNotificationsOutline } from "react-icons/io5";
import img from "../../../../public/images/Crops organic farm.png";
import {NotificationContext} from "../../Notification/NotificationProvider.jsx";
import {ref, update, push } from "firebase/database";
import {database} from "../../../services/firebase-config.js";

export const markAllNotificationsAsRead = async (notifications) => {
  const updates = {};
  notifications.forEach(([key, notification]) => {
    if (!notification.isRead) {
      updates[`notificationAdmins/${key}/isRead`] = true;
    }
  });
  try {
    if (Object.keys(updates).length > 0) {
      await update(ref(database), updates);
      console.log("All notifications marked as read.");
    } else {
      console.log("No unread notifications to update.");
    }
  } catch (error) {
    console.error("Error updating notifications:", error);
  }
};



function HeaderAdmin() {
  const { notifications } = useContext(NotificationContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const unreadCount = notifications.filter(([key, notification]) => notification.isRead === false).length;

  const handleSeeMore = () => {
    setIsExpanded(true);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead(notifications)
        .then(() => {
          setAllRead(true);
        })
        .catch((error) => {
          console.error("Error updating notifications:", error);
        });
  };

  const checkAllRead = () => {
    return unreadCount === 0;
  };

  useEffect(() => {
    setAllRead(checkAllRead());
  }, [notifications]);

  return (
    <div className="shadow-lg sticky top-0 z-50 flex bg-[#225a3e] px-12 py-3 shadow-custom-dark">
      {/* Logo */}
      <div className="left-10 -mt-5 flex items-center pt-6">
        <button id="bar" className="px-4" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoClose
              className="h-[35px] w-[35px] text-white"
              aria-hidden="true"
            />
          ) : (
            <IoMenu
              className="h-[40px] w-[30px] text-white"
              aria-hidden="true"
            />
          )}
        </button>
      </div>
      <button className="relative flex items-center ml-auto mt-1" onClick={togglePopup}>
        <IoNotificationsOutline className="h-[25px] w-[25px] text-[#006532] text-white" />
        {unreadCount > 0 && (
            <span className="absolute top-0 right-0 left-3.5 bottom-1 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount}
            </span>
        )}
      </button>

      {/* Popup Notification */}
      {isPopupOpen && (
          <div className="absolute right-8 top-14 bg-white shadow-lg rounded-md w-[400px] h-[600px] p-0 z-50 pb-3">
            <div className="flex items-center justify-between p-4">
              <h3 className="font-semibold text-2xl text-[#225a3e] flex-grow text-center">Thông báo</h3>
              {unreadCount > 0 && (
                  <label
                      className="relative cursor-pointer group"
                  >
                    <input
                        type="checkbox"
                        className="w-4 h-4 appearance-none border-2 border-[#225a3e] rounded-md checked:bg-[#225a3e] checked:border-[#225a3e] transition-all duration-200"
                        checked={allRead}
                        onChange={handleMarkAllAsRead}
                    />
                    <span className="absolute left-0 top-0 w-400 h-100 bg-white group-hover:bg-gray-200 text-sm text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Đánh dấu tất cả là đã đọc
                    </span>
                  </label>
              )}
            </div>

            {/* Phần thông báo cuộn */}
            <div
                className={`transition-all duration-300 ${
                    isExpanded ? "overflow-auto" : "overflow-hidden"
                } h-[calc(100%-100px)]`}
                style={{ scrollbarWidth: 'thin', scrollbarColor: '#d3d3d3 #f1f1f1' }}
            >
              {notifications.length > 0 ? (
                  notifications
                      .sort((a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt))
                      .map(([key, notification], index) => (
                      <div key={index} className={`${notification.isRead ? "bg-white" : "bg-[#d3f8e2]"}`}>
                        <div className="border-b border-gray-300 pl-3 pr-3 pt-2 pb-1">
                          <h4 className="font-semibold text-[#225a3e] pb-1">
                            {notification.notificationType || "Không có tiêu đề"}
                          </h4>
                          <p className="text-sm text-[#225a3e] mb-0.5">
                            {notification.message || "Không có nội dung"}
                          </p>
                          <p className="text-sm text-right text-gray-400">
                            {notification.createdAt
                                ? new Date(notification.createdAt).toLocaleString("vi-VN", {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric"
                                })
                                : "Không có thời gian"}
                          </p>
                        </div>
                        {index !== notifications.length - 1 && <hr />}
                      </div>
                  ))
              ) : (
                  <p className="text-center text-gray-500">Không có thông báo nào.</p>
              )}
            </div>

            {/* Nút "Xem thêm" */}
            <div className="flex justify-center mt-4 mb-2">
              {!isExpanded && (
                  <button
                      onClick={handleSeeMore}
                      className="text-[#225a3e] font-semibold hover:text-[#006532]"
                  >
                    Xem thêm
                  </button>
              )}
            </div>
          </div>
      )}

      {/* Sidebar Menu */}
      <div
        className={`shadow-lg fixed left-0 top-[63px] z-50 h-full w-[250px] transform border-r-2 border-[#006532] bg-white transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo in Sidebar */}
        <a
          href="/home-page"
          className="block border-b-2 border-[#006532] bg-white p-6"
        >
          <img
            src={img}
            className="mx-auto h-auto w-24 rounded-[0_30px_30px_30px]"
            alt="Logo"
          />
        </a>

        {/* Navigation Links */}
        <ul className="flex flex-col items-start font-semibold text-[#006532]">
          <li className="w-full border-b border-[#006532] px-6 py-4 transition-colors duration-300 hover:bg-[#80c9a4] hover:text-white">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 border-[#006532] pl-2 text-[#006532]"
                  : "text-[#006532] hover:text-white"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="w-full border-b border-[#006532] px-6 py-4 transition-colors duration-300 hover:bg-[#80c9a4] hover:text-white">
            <NavLink
              to="/manage-user/1/8"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 border-[#006532] pl-2 text-[#006532]"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage User
            </NavLink>
          </li>
          <li className="w-full border-b border-[#006532] px-6 py-4 transition-colors duration-300 hover:bg-[#80c9a4] hover:text-white">
            <NavLink
              to="/manage-category"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 border-[#006532] pl-2 text-[#006532]"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage Category
            </NavLink>
          </li>
          <li className="w-full border-b border-[#006532] px-6 py-4 transition-colors duration-300 hover:bg-[#80c9a4] hover:text-white">
            <NavLink
              to="/manage-product"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 border-[#006532] pl-2 text-[#006532]"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage Product
            </NavLink>
          </li>
          <li className="w-full border-b border-[#006532] px-6 py-4 transition-colors duration-300 hover:bg-[#80c9a4] hover:text-white">
            <NavLink
              to="/manage-order"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 border-[#006532] pl-2 text-[#006532]"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage Order
            </NavLink>
          </li>
          <li className="w-full border-b border-[#006532] px-6 py-4 transition-colors duration-300 hover:bg-[#80c9a4] hover:text-white">
            <NavLink
              to="/manage-supplier/1/4"
              className={({ isActive }) =>
                isActive
                  ? "border-l-4 border-[#006532] pl-2 text-[#006532]"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage Supplier
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderAdmin;
