import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {  IoNotificationsOutline } from "react-icons/io5";
import { RiArrowDropUpLine,RiArrowDropDownLine } from "react-icons/ri";
import { LuUsers,LuBox } from "react-icons/lu";
import { PiChartLineBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { TbCategory,TbInvoice ,TbBuildingWarehouse,TbClipboardList } from "react-icons/tb";
import img from "../../../../public/images/user.png";
import { NotificationContext } from "../../Notification/NotificationProvider.jsx";
import { ref, update } from "firebase/database";
import { database } from "../../../services/firebase-config.js";

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
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [allRead, setAllRead] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null); // Lưu trạng thái active của mục
  const [isHovered, setIsHovered] = useState(false); // Trạng thái để kiểm tra hover
  const [isOrderManagementOpen, setIsOrderManagementOpen] = useState(false);
  const handleNavLinkClick = (index) => {
    setActiveIndex(index); // Cập nhật trạng thái active khi người dùng click vào item
  };

  const unreadCount = notifications.filter(
    ([key, notification]) => notification.isRead === false,
  ).length;



  const toggleOrderManagement = () => {
    setIsOrderManagementOpen(!isOrderManagementOpen);
  };

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

  const handlePopupMouseEnter = () => {
    setIsHovered(true);
  };

  const handlePopupMouseLeave = () => {
    setIsHovered(false);
    setIsPopupOpen(false);
  };

  useEffect(() => {
    setAllRead(checkAllRead());
  }, [notifications]);

  useEffect(() => {
    if (activeIndex === 0 || window.location.pathname.includes("/admin/manage-order")) {
      setIsOrderManagementOpen(true);
    }
  }, [activeIndex]);
  
  return (
    <div className="shadow-lg sticky top-0 z-50 flex bg-white px-12 py-3 shadow-custom-dark">
      

      <button
        className="relative ml-auto mt-1 flex items-center"
        onClick={togglePopup}
      >
        <IoNotificationsOutline className="h-[25px] w-[25px] text-[#006532] " />
        {unreadCount > 0 && (
          <span className="absolute bottom-1 left-3.5 right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-semibold text-white">
            {unreadCount}
          </span>
        )}
      </button>
      <button id="lg-bag" className="mt-1 ml-8">
                  <NavLink to="/home-page" >
                    <FiLogOut
                      aria-hidden="true"
                      className="h-[23px] w-[23px] text-[#006532] transition duration-300 hover:text-[#80c9a4]"
                    />
                  </NavLink>
                </button>
      {/* Popup Notification */}
      {isPopupOpen && (
        <div
          className="shadow-lg absolute right-8 top-14 z-50 h-[600px] w-[400px] rounded-md bg-white p-0 pb-3"
          onMouseEnter={handlePopupMouseEnter}
          onMouseLeave={handlePopupMouseLeave}
        >
          <div className="flex items-center justify-between p-4">
            <h3 className="flex-grow text-center text-2xl font-semibold text-[#225a3e]">
              Thông báo
            </h3>
            {unreadCount > 0 && (
              <label className="group relative cursor-pointer">
                <input
                  type="checkbox"
                  className="h-4 w-4 appearance-none rounded-md border-2 border-[#225a3e] transition-all duration-200 checked:border-[#225a3e] checked:bg-[#225a3e]"
                  checked={allRead}
                  onChange={handleMarkAllAsRead}
                />
                <span className="w-400 h-100 absolute left-0 top-0 flex items-center justify-center bg-white text-sm text-black opacity-0 transition-opacity duration-300 group-hover:bg-gray-200 group-hover:opacity-100">
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
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#d3d3d3 #f1f1f1",
            }}
          >
            {notifications.length > 0 ? (
              notifications
                .sort(
                  (a, b) => new Date(b[1].createdAt) - new Date(a[1].createdAt),
                )
                .map(([key, notification], index) => (
                  <div
                    key={index}
                    className={`${notification.isRead ? "bg-white" : "bg-[#d3f8e2]"}`}
                  >
                    <div className="border-b border-gray-300 pb-1 pl-3 pr-3 pt-2">
                      <h4 className="pb-1 font-semibold text-[#225a3e]">
                        {notification.notificationType || "Không có tiêu đề"}
                      </h4>
                      <p className="mb-0.5 text-sm text-[#225a3e]">
                        {notification.message || "Không có nội dung"}
                      </p>
                      <p className="text-right text-sm text-gray-400">
                        {notification.createdAt
                          ? new Date(notification.createdAt).toLocaleString(
                              "vi-VN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              },
                            )
                          : "Không có thời gian"}
                      </p>
                    </div>
                    {index !== notifications.length - 1 && <hr />}
                  </div>
                ))
            ) : (
              <p className="text-center text-gray-500">
                Không có thông báo nào.
              </p>
            )}
          </div>

          {/* Nút "Xem thêm" */}
          <div className="mb-2 mt-4 flex justify-center">
            {!isExpanded && (
              <button
                onClick={handleSeeMore}
                className="font-semibold text-[#225a3e] hover:text-[#006532]"
              >
                Xem thêm
              </button>
            )}
          </div>
        </div>
      )}

    
      <div
        className={`shadow-lg fixed left-0 top-0 z-50 h-full w-[250px] px-4 transform border-r-1   bg-white transition-transform duration-300 ease-in-out`}
      >
      <div className=" h-[54px] border-[1px] -mx-4 "></div>
       <div className="flex flex-col items-center mt-6 pb-6  border-b ">
        <img src={img} className="size-28  border-[10px] border-solid border-[#006532] rounded-full"/>
        <div className="absolute left-0 right-0 mx-auto top-[168px] flex justify-center">
          <span className="text-center text-[12px] text-white font-bold bg-[#24695c] px-[6px] pt-[4px] pb-[3px] rounded-lg">Admin</span>
        </div>
        <p className="mt-3 font-semibold text-[#006532]">Thành Lê</p>
        
       </div>

        {/* Navigation Links */}
        <ul className="flex flex-col items-start font-semibold text-white pt-2">
          <li
            className={` flex flex-wrap w-full px-6  py-[12px] transition-colors duration-700 group  hover:border-[#006532] hover:bg-[#006532] rounded-xl ${
              activeIndex === 0 || window.location.pathname.includes("/admin/dashboard") ? "bg-[#006532] rounded-xl" : ""
            }`}
          >
          <PiChartLineBold
          className={` w-6 h-6 mr-5 ${
              activeIndex === 0 || window.location.pathname.includes("/admin/dashboard") ? "text-white" : "text-[#222222] group-hover:text-white"
            }`}
           />
            <NavLink
              to="/admin/dashboard"
              onClick={() => setActiveIndex(0)} // Cập nhật trạng thái khi click
              className={({ isActive }) =>
                isActive || window.location.pathname.includes("/admin/dashboard")
                  ? "border-l-4 border-[#006532] bg-[#006532] text-white"
                  : "text-[#222222] group-hover:text-white"
              }
            >
              Thống Kê
            </NavLink>
          </li>

          <li className={`flex flex-wrap w-full px-6  py-[12px] transition-colors duration-700 group hover:border-[#006532] hover:bg-[#006532] rounded-xl ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-user") ? "bg-[#006532] rounded-xl" : ""
            }`}>
            <LuUsers className={` w-6 h-6 mr-5 ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-user") ? "text-white" : "text-[#222222]  group-hover:text-white"
            }`} />
            <NavLink
              to="/admin/manage-user/1/8"
              className={({ isActive }) =>
                isActive || window.location.pathname.includes("/admin/manage-user")
                  ? "border-l-4 border-[#006532] bg-[#006532] text-white"
                  : "text-[#222222]  group-hover:text-white"
              }
            >
              Người dùng
            </NavLink>
          </li>
          <li className={ `flex flex-wrap w-full px-6  py-[12px] transition-colors duration-700 group hover:border-[#006532] hover:bg-[#006532] rounded-xl ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-category") ? "bg-[#006532] rounded-xl" : ""
            }`}>
            <TbCategory className={` w-6 h-6 mr-5 ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-category") ? "text-white" : "text-[#222222]  group-hover:text-white"
            }`} />
            <NavLink
              to="/admin/manage-category"
              className={({ isActive }) =>
                isActive || window.location.pathname.includes("/admin/manage-category")
                   ? "border-l-4 border-[#006532] bg-[#006532] text-white"
                  : "text-[#222222]  group-hover:text-white"
              }
            >
              Danh mục
            </NavLink>
          </li>
          <li className={`flex flex-wrap w-full px-6  py-[12px] transition-colors duration-700 group hover:border-[#006532] hover:bg-[#006532] rounded-xl ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-product")? "bg-[#006532] rounded-xl" : ""
            }`}>
            <LuBox className={` w-6 h-6 mr-5 ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-product") ? "text-white" : "text-[#222222]  group-hover:text-white"
            }`} />
            <NavLink
              to="/admin/manage-product/1/10"
              className={({ isActive }) =>
                isActive || window.location.pathname.includes("/admin/manage-product")
                  ? "border-l-4 border-[#006532] bg-[#006532] text-white"
                  : "text-[#222222]  group-hover:text-white"
              }
            >
              Sản phẩm
            </NavLink>
          </li>
          <li className={`flex flex-wrap w-full px-6  py-[12px] transition-colors duration-700 group hover:border-[#006532] hover:bg-[#006532] rounded-xl ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-import") ? "bg-[#006532] rounded-xl" : ""
            }`}>
            <TbInvoice className={` w-6 h-6 mr-5 ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-import") ? "text-white" : "text-[#222222]  group-hover:text-white"
            }`} />
            <NavLink
              to="/admin/manage-import/1/4"
              className={({ isActive }) =>
                isActive || window.location.pathname.includes("/admin/manage-import")
                  ? "border-l-4 border-[#006532] bg-[#006532] text-white"
                  : "text-[#222222]  group-hover:text-white"
              }
            >
              Đơn nhập hàng
            </NavLink>
          </li>
          <li className={`w-full  px-6  py-[12px] transition-colors duration-700 hover:bg-[#006532] hover:rounded-xl cursor-pointer group ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-order") ? "bg-[#006532] rounded-xl" : ""
            }`}>
        <div
          onClick={toggleOrderManagement}
          className="flex items-center justify-between"
        > 
          <TbClipboardList className={` w-6 h-6 ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-order") ? "text-white" : "text-[#222222]  group-hover:text-white"
            }`}/>
          <span className={`${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-order") ? "text-white" : "text-[#222222]  group-hover:text-white"
            }`}>Đơn hàng</span>
          <span>{isOrderManagementOpen ? <RiArrowDropDownLine className="text-3xl text-[#222222]"/> : <RiArrowDropUpLine  className="text-3xl text-[#222222]"/>}</span>
        </div>
        {isOrderManagementOpen && (
          <ul className="pl-9 mt-2  -mx-6 border-t bg-white">
            <li className="w-full ml-[30px]  py-3 transition-colors duration-700  ">
              <NavLink
                to="/admin/manage-order/1/4?"
                className={({ isActive }) =>
                  isActive
                    ? " text-[#006532] font-semibold"
                    : "text-[#222222] hover:text-[#006532] font-medium"
                }
              >
                Đơn đặt hàng
              </NavLink>
            </li>
            <li className="w-full ml-[30px] py-3 -mb-4 transition-colors duration-700 hover:text-[#006532]">
              <NavLink
                to="/admin/manage-order-complete/1/2"
                className={({ isActive }) =>
                  isActive
                    ? " text-[#006532] font-semibold"
                    : "text-[#222222] hover:text-[#006532] font-medium"
                }
              >
                Đã hoàn thành
              </NavLink>
            </li>
          </ul>
        )}
      </li>
          <li className={` flex flex-wrap w-full px-6 py-[12px] transition-colors duration-700 group hover:border-[#006532] hover:bg-[#006532] rounded-xl ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-supplier") ? "bg-[#006532] rounded-xl" : ""
            }`}>
             <TbBuildingWarehouse className={` w-6 h-6 mr-5 ${
              activeIndex === 0 || window.location.pathname.includes("/admin/manage-supplier") ? "text-white" : "text-[#222222]  group-hover:text-white"
            }`} />
            <NavLink
              to="/admin/manage-supplier/1/4"
              className={({ isActive }) =>
                isActive || window.location.pathname.includes("/admin/manage-supplier")
                  ? "border-l-4 border-[#006532] bg-[#006532] text-white"
                  : "text-[#222222]  group-hover:text-white"
              }
            >
              Nhà cung cấp
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default HeaderAdmin;
