import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { PiShoppingCartBold } from "react-icons/pi";
import { FaRegUser } from "react-icons/fa";
import { IoMenu, IoClose } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import img from "../../../public/images/Crops organic farm.png"
import { getUser } from "../../services/user-service";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Thêm state để lưu trữ thông tin người dùng

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Giả sử hàm getUser là một hàm bất đồng bộ để lấy thông tin người dùng
    const fetchUser = async () => {
      try {
        const response = await getUser(); // Gọi hàm getUser để lấy thông tin người dùng
        setUser(response.data); // Lưu thông tin người dùng vào state
      } catch (error) {
        console.error("Failed to fetch user", error);
      }
    };

    fetchUser();
  }, []);
  const formattedLastName = user?.lastName ? user.lastName.substring(0, 4).toUpperCase() : '';

  return (
    <div className="sticky top-0 z-50 flex flex-col items-end bg-white px-12 py-3 shadow-lg shadow-custom-dark">
      <a href="/home-page" className=" -mt-1 absolute left-10 xl:ml-36">
        <img
          src={img}
          className="rounded-[0_30px_30px_30px] hover:rounded-[30px_30px_0_30px] shadow-custom-dark transition-all duration-500 ease-in-out p-1 w-24 h-[100px] md:w-[100px] md:h-[105px] bg-white fadeInUp md:border-0 border-2 border-[#006633]"
          alt="Logo"
        />
      </a>

      <div className="flex items-center pt-3 pb-3 xl:mr-28">
        <ul id="navbar" className={`hidden items-center md:flex ${isMenuOpen ? "block" : "hidden"} md:block`}>
          <li className="px-4">
            <NavLink
              to="/home-page"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              TRANG CHỦ
            </NavLink>
          </li>
          <li className="px-4">
            <NavLink
              to="/products/1/10"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              SẢN PHẨM
            </NavLink>
          </li>
          
          <li className="px-4">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              VỀ CHÚNG TÔI
            </NavLink>
          </li>
          <li className="px-4">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              LIÊN HỆ
            </NavLink>
          </li>
          
          {user &&  ( // Kiểm tra nếu lastName tồn tại thì hiển thị
            <li className="pl-4">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                    : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
                }
              >
                {formattedLastName}
              </NavLink>
            </li>
          )}
          <li id="lg-bag" className="md:mb-3 md:h-5 md:px-4">
            <Link to="/login">
              <FaRegUser
                aria-hidden="true"
                className="h-[23px] w-[23px] text-[#006532] hover:text-[#80c9a4] transition duration-300"
              />
            </Link>
          </li>
          <li id="lg-bag" className="md:mb-3 md:h-5 md:px-4">
            <Link to="/cart">
              <PiShoppingCartBold
                aria-hidden="true"
                className="h-[23px] w-[23px] text-[#006532] hover:text-[#80c9a4] transition duration-300"
              />
            </Link>
            
          </li>
          {user &&  (
          <li id="lg-bag" className="md:mb-3 md:h-5 md:px-4">
            <Link to="/">
              <FiLogOut
                aria-hidden="true"
                className="h-[23px] w-[23px] text-[#006532] hover:text-[#80c9a4] transition duration-300"
              />
            </Link>
          </li>
        )}
        </ul>
      </div>

      <div id="mobile" className="flex items-center -mt-3 md:hidden ">
      {user &&  (
        <Link to="/" className="pl-4 pr-1 pt-3 font-semibold text-[#006532]">
          <div className="h-[25px] w-[25px] hover:text-[#80c9a4] transition duration-300" >{formattedLastName}</div>
        </Link>
      )}
        <Link to="/login" className="px-4 text-[#006532]">
          <FaRegUser aria-hidden="true" className="h-[25px] w-[25px] hover:text-[#80c9a4] transition duration-300" />
        </Link>
        <Link to="/cart" className="px-4 text-[#006532]">
          <PiShoppingCartBold
            aria-hidden="true"
            className="h-[30px] w-[30px] hover:text-[#80c9a4] transition duration-300"
          />
        </Link>
        <button id="bar" className="px-4" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoClose className="h-[35px] w-[35px] text-[#006532]" aria-hidden="true" />
          ) : (
            <IoMenu className="h-[40px] w-[30px] text-[#006532]" aria-hidden="true" />
          )}
        </button>
      </div>

      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"} absolute -right-0 top-[70px] h-[669px] w-[250px] border border-t-2 bg-white`}>
        <ul className="flex flex-col items-start pl-9">
          <li className="py-2">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              TRANG CHỦ
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              SẢN PHẨM
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              BLOG
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              VỀ CHÚNG TÔI
            </NavLink>
          </li>
          <li className="py-2">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
              LIÊN HỆ
            </NavLink>
          </li>
          {user &&  (
          <li className="py-2">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out border-b-2 border-b-[#006532]"
                  : "text-[15px] font-bold text-[#006532] transition-colors duration-300 ease-in-out hover:text-[#80c9a4]"
              }
            >
             ĐĂNG XUẤT
            </NavLink>
          </li>
        )}
        </ul>
      </div>
    </div>
  );
}

export default Header;