
import logo from '../../assets/logo.png'; // Đảm bảo bạn có đường dẫn đúng đến ảnh logo
import { PiShoppingCartBold } from "react-icons/pi";
import { IoMenu, IoClose } from "react-icons/io5";
const Header = () => {
  return (
    <div className="bg-purple-100 shadow-md sticky top-0 z-50 p-5 flex items-center justify-between">
      <a href="#">
        <img src={logo} className="logo" alt="Logo" />
      </a>

      <div className="flex items-center">
        <ul id="navbar" className="hidden lg:flex items-center">
          <li className="px-4">
            <a href="#" className="text-gray-800 font-semibold">Home</a>
          </li>
          <li className="px-4">
            <a href="#" className="text-gray-800 font-semibold">Shop</a>
          </li>
          <li className="px-4">
            <a href="#" className="text-gray-800 font-semibold">Blog</a>
          </li>
          <li className="px-4">
            <a href="#" className="text-gray-800 font-semibold">About</a>
          </li>
          <li className="px-4">
            <a href="#" className="text-gray-800 font-semibold">Contact</a>
          </li>
          <li id="lg-bag" className="px-4 h-5 mb-1">
            <a href="Cart" className=" ">
              <PiShoppingCartBold aria-hidden="true" className="h-[19px] w-[19px] " /> 
            </a>
          </li>
          
        </ul>
      </div>

      <div id="mobile" className="flex lg:hidden items-center">
        <a href="cart" className="text-gray-800 px-4">
        <PiShoppingCartBold aria-hidden="true" className="h-[30px] w-[30px] " /> 
        </a>
        <button id="bar" className='px-4'>
          <IoMenu className="text-gray-800 h-[30px] w-[30px] " aria-hidden="true" /> 
        </button>
       
            {/* <button id="close" className='px-4'>
               <IoClose className="text-gray-800 h-[35px] w-[35px]"  /> 
            </button>
          */}
      </div>
    </div>
  );
};

export default Header;
