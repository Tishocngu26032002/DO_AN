import React from "react";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className="section-p1 flex flex-wrap justify-between px-[80px] py-[40px]">
      <div className="col mb-[20px] flex flex-col items-start">
        <img className="logo mb-[30px]" src="images/logo.png" alt="" />
        <h4 className="pb-[20px] text-[14px] text-[#222]">Contact</h4>
        <p className="m-0 my-[15px] mb-[8px] text-[13px] text-[#465b52]">
          <strong>Address:</strong> Lahore, Pakistan - 54840
        </p>
        <p className="m-0 my-[15px] mb-[8px] text-[13px] text-[#465b52]">
          <strong>Phone:</strong> +92-321-4655990
        </p>
        <p className="m-0 my-[15px] mb-[8px] text-[13px] text-[#465b52]">
          <strong>Hours:</strong> 10:00 - 18:00, Mon - Sat
        </p>
        <div className="follow mt-[20px]">
          <h4 className="pb-[20px] text-[14px] text-[#222]">Follow us</h4>
          <div className="icon flex gap-[10px]">
            <FaFacebookF className="fab fa-facebook-f h-[20px] w-[20px] cursor-pointer pr-[4px] text-[#465b52] hover:text-[#088178]"></FaFacebookF>
            <FaTwitter className="fab fa-twitter h-[20px] w-[20px] cursor-pointer pr-[4px] text-[#465b52] hover:text-[#088178]"></FaTwitter>
            <FaInstagram className="fab fa-instagram h-[20px] w-[20px] cursor-pointer pr-[4px] text-[#465b52] hover:text-[#088178]"></FaInstagram>
            <FaYoutube className="fab fa-youtube h-[20px] w-[20px] cursor-pointer pr-[4px] text-[#465b52] hover:text-[#088178]"></FaYoutube>
          </div>
        </div>
      </div>
      <div className="col mb-[20px] flex flex-col items-start">
        <h4 className="pb-[20px] text-[14px] text-[#222]">About</h4>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          About us
        </a>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          Delivery Information
        </a>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          Privacy Policy
        </a>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          Terms & Conditions
        </a>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          Contact Us
        </a>
      </div>
      <div className="col mb-[20px] flex flex-col items-start">
        <h4 className="pb-[20px] text-[14px] text-[#222]">My Account</h4>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          Sign In
        </a>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          View Cart
        </a>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          My Wishlist
        </a>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          Track My Order
        </a>
        <a
          href="#"
          className="m-0 mb-[10px] text-[13px] text-[#222] no-underline hover:text-[#088178]"
        >
          Help
        </a>
      </div>
      <div className="col install mb-[20px] flex flex-col items-start">
        <h4 className="pb-[20px] text-[14px] text-[#222]">Install App</h4>
        <p className="m-0 my-[15px] mb-[8px] text-[13px] text-[#465b52]">
          From App Store or Google Play
        </p>
        <div className="row">
          <img
            src="images/pay/app.jpg"
            alt=""
            className="my-[10px] mb-[15px] rounded-[6px] border border-[#088178]"
          />
          <img
            src="images/pay/play.jpg"
            alt=""
            className="my-[10px] mb-[15px] rounded-[6px] border border-[#088178]"
          />
        </div>
        <p className="m-0 my-[15px] mb-[8px] text-[13px] text-[#465b52]">
          Secured Payment Gateway
        </p>
        <img src="images/pay/pay.png" alt="" />
      </div>
    </footer>
  );
}

export default Footer;
