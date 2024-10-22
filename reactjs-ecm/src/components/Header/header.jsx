import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";
import { MdOutlineShoppingBag } from "react-icons/md";
import { IoMenu, IoClose } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";


function Header(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="sticky top-0 z-50 flex items-center justify-between bg-purple-100 px-12 py-5 shadow-lg">
      <a href="#">
        <img src="images/logo.png" className="logo" alt="Logo" />
      </a>

      <div className="flex items-center">
        <ul
          id="navbar"
          className={`hidden items-center md:flex ${isMenuOpen ? "block" : "hidden"} md:block`}
        >
          <li className="px-4">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="px-4">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              Shop
            </NavLink>
          </li>
          <li className="px-4">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              Blog
            </NavLink>
          </li>
          <li className="px-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              About
            </NavLink>
          </li>
          <li className="px-4">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              Contact
            </NavLink>
          </li>
          <li id="lg-bag" className="md:mb-2 md:h-5 md:px-4">
            <Link to="cart" className="">
              <PiShoppingCartBold
                aria-hidden="true"
                className="h-[23px] w-[23px]"
              />
            </Link>
          </li>
          <li id="lg-bag" className="md:mb-2 md:h-5 md:px-4">
            <Link to="user" className="">
              <FaRegUser aria-hidden="true" className="h-[23px] w-[23px]" />
            </Link>
          </li>
        </ul>
      </div>

      <div id="mobile" className="flex items-center md:hidden">
        <Link to="cart" className="px-4 text-gray-800">
          <PiShoppingCartBold
            aria-hidden="true"
            className="h-[30px] w-[30px]"
          />
        </Link>
        <Link to="user" className="px-4 text-gray-800">
          <FaRegUser aria-hidden="true" className="h-[25px] w-[25px]" />
        </Link>
        <button id="bar" className="px-4" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoClose
              className="h-[35px] w-[35px] text-gray-800"
              aria-hidden="true"
            />
          ) : (
            <IoMenu
              className="h-[40px] w-[30px] text-gray-800"
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      <div
        className={`md:hidden ${isMenuOpen ? "block" : "hidden"} absolute -right-0 top-20 h-[669px] w-[250px] border border-t-2 bg-purple-100 shadow-md`}
      >
        <ul className="flex flex-col items-start pl-9">
          <li className="py-2">
            <NavLink
              to=""
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              Home
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/product"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              Shop
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              Blog
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              About
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-xl font-bold text-gray-800"
                  : "text-xl font-semibold text-gray-800"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
