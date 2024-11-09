import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
import img from "../../../../public/images/Crops organic farm.png"
function HeaderAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 flex  bg-[#225a3e] px-12 py-3 shadow-lg shadow-custom-dark">
      {/* Logo */}
      <a href="/home-page" className="-mt-1 absolute right-[70px]">
        <img
          src={img}
          className="rounded-[0_20px_20px_20px] hover:rounded-[20px_20px_0_20px] shadow-custom-dark transition-all duration-500 ease-in-out p-1 w-20 h-[85px] md:w-[90px] md:h-[95px] bg-white fadeInUp md:border-0 border-2 border-[#006633]"
          alt="Logo"
        />
      </a>
      <div className="flex items-center -mt-5 pt-6  left-10">
        <button id="bar" className="px-4" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoClose className="h-[35px] w-[35px] text-white" aria-hidden="true" />
          ) : (
            <IoMenu className="h-[40px] w-[30px] text-white" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div
        className={`fixed top-[63px] left-0 z-50 h-full w-[250px] bg-white shadow-lg transform transition-transform duration-300 ease-in-out border-r-2 border-[#006532] ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo in Sidebar */}
        <a href="/home-page" className="block p-6 bg-white border-b-2 border-[#006532]">
          <img
            src={img}
            className="w-24 h-auto rounded-[0_30px_30px_30px] mx-auto"
            alt="Logo"
          />
        </a>

        {/* Navigation Links */}
        <ul className="flex flex-col items-start text-[#006532] font-semibold">
          <li className="w-full px-6 py-4 border-b border-[#006532] hover:bg-[#80c9a4] hover:text-white transition-colors duration-300">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-[#006532] border-l-4 border-[#006532] pl-2"
                  : "text-[#006532] hover:text-white"
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="w-full px-6 py-4 border-b border-[#006532] hover:bg-[#80c9a4] hover:text-white transition-colors duration-300">
            <NavLink
              to="/manage-user/1/8"
              className={({ isActive }) =>
                isActive
                  ? "text-[#006532] border-l-4 border-[#006532] pl-2"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage User
            </NavLink>
          </li>
          <li className="w-full px-6 py-4 border-b border-[#006532] hover:bg-[#80c9a4] hover:text-white transition-colors duration-300">
            <NavLink
              to="/manage-category"
              className={({ isActive }) =>
                isActive
                  ? "text-[#006532] border-l-4 border-[#006532] pl-2"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage Category
            </NavLink>
          </li>
          <li className="w-full px-6 py-4 border-b border-[#006532] hover:bg-[#80c9a4] hover:text-white transition-colors duration-300">
            <NavLink
              to="/manage-product"
              className={({ isActive }) =>
                isActive
                  ? "text-[#006532] border-l-4 border-[#006532] pl-2"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage Product
            </NavLink>
          </li>
          <li className="w-full px-6 py-4 border-b border-[#006532] hover:bg-[#80c9a4] hover:text-white transition-colors duration-300">
            <NavLink
              to="/manage-order"
              className={({ isActive }) =>
                isActive
                  ? "text-[#006532] border-l-4 border-[#006532] pl-2"
                  : "text-[#006532] hover:text-white"
              }
            >
              Manage Order
            </NavLink>
          </li>
          <li className="w-full px-6 py-4 border-b border-[#006532] hover:bg-[#80c9a4] hover:text-white transition-colors duration-300">
            <NavLink
              to="/manage-supplier/1/4"
              className={({ isActive }) =>
                isActive
                  ? "text-[#006532] border-l-4 border-[#006532] pl-2"
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
