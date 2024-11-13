import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMenu, IoClose } from "react-icons/io5";
//import img from "../../../../public/images/Crops organic farm.png"
function HeaderAdmin() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="shadow-lg sticky top-0 z-50 flex bg-[#225a3e] px-12 py-3 shadow-custom-dark">
      {/* Logo */}
      <a href="/home-page" className="absolute right-[70px] -mt-1">
        <img
          src={img}
          className="fadeInUp h-[85px] w-20 rounded-[0_20px_20px_20px] border-2 border-[#006633] bg-white p-1 shadow-custom-dark transition-all duration-500 ease-in-out hover:rounded-[20px_20px_0_20px] md:h-[95px] md:w-[90px] md:border-0"
          alt="Logo"
        />
      </a>
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
