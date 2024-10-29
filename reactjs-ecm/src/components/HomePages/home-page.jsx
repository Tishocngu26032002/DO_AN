import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";
// import Header from "../Header/Header.jsx";
import Footer from "../Footer/footer";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../../services/service";
import Header from "../Header/header";

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts(query = "") {
    try {
      const data = await getProducts(query);
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="body w-full">
      <Header />
      <section className="hero mobile:bg-custom flex h-[90vh] w-full flex-col items-start justify-center bg-[url('/images/hero4.jpg')] bg-cover bg-[top_25%_right_0] px-[80px] tablet:h-[70vh] tablet:bg-[top_30%_right_30%] tablet:px-[80px] mobile:px-[20px] mobile:py-[0px]">
        <h4 className="pb-[15px] text-[20px] text-[#222]">Trade-in-offer</h4>
        <h2 className="text-[46px] leading-[54px] text-[#222] mobile:text-[32px]">
          Super value deals
        </h2>
        <h1 className="text-[50px] leading-[64px] text-[#088178] mobile:text-[38px]">
          On all products
        </h1>
        <p className="my-[15px] mb-[20px] text-[16px] text-[#465b52]">
          Save more with coupons & up to 70% off!
        </p>
        <button className="cursor-pointer border-0 bg-transparent bg-[url('/images/button.png')] bg-no-repeat px-[80px] py-[14px] pl-[65px] pr-[80px] text-[15px] font-bold text-[#088178]">
          Shop Now
        </button>
      </section>

      <section className="feature section-p1 flex flex-wrap items-center justify-between px-[80px] py-[40px] tablet:justify-center tablet:p-[40px] mobile:p-[20px]">
        <div className="fe-box my-[15px] w-[180px] rounded-[4px] border border-[#cce7d0] px-[15px] py-[25px] text-center shadow-[20px_20px_34px_rgba(0,0,0,0.03)] hover:shadow-[10px_10px_54px_rgba(70,62,221,0.1)] tablet:m-[15px]">
          <img
            src="images/features/f1.png"
            alt=""
            className="mb-[10px] w-full"
          />
          <h6 className="inline-block rounded-[4px] bg-[#fddde4] px-[8px] pb-[6px] pt-[9px] text-[12px] font-bold leading-[1] text-[#088178]">
            Free Shipping
          </h6>
        </div>
        <div className="fe-box my-[15px] w-[180px] rounded-[4px] border border-[#cce7d0] px-[15px] py-[25px] text-center shadow-[20px_20px_34px_rgba(0,0,0,0.03)] hover:shadow-[10px_10px_54px_rgba(70,62,221,0.1)] tablet:m-[15px]">
          <img
            src="images/features/f2.png"
            alt=""
            className="mb-[10px] w-full"
          />
          <h6 className="inline-block rounded-[4px] bg-[#cdebbc] px-[8px] pb-[6px] pt-[9px] text-[12px] font-bold leading-[1] text-[#088178]">
            Online Order
          </h6>
        </div>
        <div className="fe-box my-[15px] w-[180px] rounded-[4px] border border-[#cce7d0] px-[15px] py-[25px] text-center shadow-[20px_20px_34px_rgba(0,0,0,0.03)] hover:shadow-[10px_10px_54px_rgba(70,62,221,0.1)] tablet:m-[15px]">
          <img
            src="images/features/f3.png"
            alt=""
            className="mb-[10px] w-full"
          />
          <h6 className="inline-block rounded-[4px] bg-[#d1e8f2] px-[8px] pb-[6px] pt-[9px] text-[12px] font-bold leading-[1] text-[#088178]">
            Save Money
          </h6>
        </div>
        <div className="fe-box my-[15px] w-[180px] rounded-[4px] border border-[#cce7d0] px-[15px] py-[25px] text-center shadow-[20px_20px_34px_rgba(0,0,0,0.03)] hover:shadow-[10px_10px_54px_rgba(70,62,221,0.1)] tablet:m-[15px]">
          <img
            src="images/features/f4.png"
            alt=""
            className="mb-[10px] w-full"
          />
          <h6 className="inline-block rounded-[4px] bg-[#cdd4f8] px-[8px] pb-[6px] pt-[9px] text-[12px] font-bold leading-[1] text-[#088178]">
            Promotions
          </h6>
        </div>
        <div className="fe-box my-[15px] w-[180px] rounded-[4px] border border-[#cce7d0] px-[15px] py-[25px] text-center shadow-[20px_20px_34px_rgba(0,0,0,0.03)] hover:shadow-[10px_10px_54px_rgba(70,62,221,0.1)] tablet:m-[15px]">
          <img
            src="images/features/f5.png"
            alt=""
            className="mb-[10px] w-full"
          />
          <h6 className="inline-block rounded-[4px] bg-[#f6dbf6] px-[8px] pb-[6px] pt-[9px] text-[12px] font-bold leading-[1] text-[#088178]">
            Happy Sell
          </h6>
        </div>
        <div className="fe-box my-[15px] w-[180px] rounded-[4px] border border-[#cce7d0] px-[15px] py-[25px] text-center shadow-[20px_20px_34px_rgba(0,0,0,0.03)] hover:shadow-[10px_10px_54px_rgba(70,62,221,0.1)] tablet:m-[15px]">
          <img
            src="images/features/f6.png"
            alt=""
            className="mb-[10px] w-full"
          />
          <h6 className="inline-block rounded-[4px] bg-[#fff2e5] px-[8px] pb-[6px] pt-[9px] text-[12px] font-bold leading-[1] text-[#088178]">
            F24/7 Support
          </h6>
        </div>
      </section>

      {/* <section className="product1 section-p1 px-[80px] py-[40px] text-center">
        <h2 className="text-[46px] leading-[54px] text-[#222] mobile:text-[32px]">
          Featured Products
        </h2>
        <p className="my-[15px] mb-[20px] text-[16px] text-[#465b52]">
          Seasonal Products
        </p>
        <div className="pro-container flex flex-wrap justify-between pt-[20px] tablet:justify-center">
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)] tablet:m-[15px]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/f1.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/f2.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/f3.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/f4.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/f5.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/f6.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/f7.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/f8.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
        </div>
      </section> */}
      <section className="product1 section-p1 px-[80px] py-[40px] text-center">
        <h2 className="text-[46px] leading-[54px] text-[#222] mobile:text-[32px]">
          Featured Products
        </h2>
        <p className="my-[15px] mb-[20px] text-[16px] text-[#465b52]">
          Seasonal Products
        </p>
        <div className="pro-container flex flex-wrap justify-between pt-[20px] tablet:justify-center">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]"
            >
              <img
                className="w-full rounded-[20px]"
                src={product.images}
                alt={product.name}
              />
              <div className="des py-[10px] text-start">
                <span className="text-[12px] text-[#606063]">
                  {product.category.name}
                </span>
                <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                  {product.title}
                </h5>
                <div className="star flex">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"
                    />
                  ))}
                </div>
                <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                  ${product.price}
                </h4>
              </div>
              <Link to="">
                <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="banner section-m1 my-[40px] flex h-[40vh] w-full flex-col items-center justify-center bg-[url('images/banner/b2.jpg')] bg-cover bg-center text-center tablet:h-[20vh]">
        <h4 className="text-[16px] text-white">Repair Services</h4>
        <h2 className="py-[10px] text-[30px] leading-[54px] text-white mobile:text-[32px]">
          Up to <span className="text-[#ef3636]">70% Off</span> - DPS Protein
          tăng trọng
        </h2>
        <button className="normal cursor-pointer rounded-[4px] border-0 bg-white px-[30px] py-[15px] text-[14px] font-semibold text-[#000] outline-none transition duration-200 ease-in-out hover:bg-[#088178] hover:text-white">
          Explore More
        </button>
      </section>

      <section className="product1 section-p1 px-[80px] py-[40px] text-center">
        <h2 className="text-[46px] leading-[54px] text-[#222] mobile:text-[32px]">
          Latest Products
        </h2>
        <p className="my-[15px] mb-[20px] text-[16px] text-[#465b52]">
          New Products
        </p>
        <div className="pro-container flex flex-wrap justify-between pt-[20px] tablet:justify-center">
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)] tablet:m-[15px]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/n1.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/n2.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/n3.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/n4.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/n5.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/n6.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/n7.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
          <div className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]">
            <img
              className="w-full rounded-[20px]"
              src="images/products/n8.jpg"
              alt=""
            />
            <div className="des py-[10px] text-start">
              <span className="text-[12px] text-[#606063]">adidas</span>
              <h5 className="pt-[7px] text-[14px] text-[#1a1a1a]">
                Cartoon Astronaut T-Shirts
              </h5>
              <div className="star flex">
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
                <FaStar className="fas fa-star h-[20px] w-[20px] text-[12px] text-[rgb(243,181,25)]"></FaStar>
              </div>
              <h4 className="pt-[7px] text-[15px] font-bold text-[#088178]">
                $78
              </h4>
            </div>
            <a href="#">
              <PiShoppingCartBold className="fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"></PiShoppingCartBold>
            </a>
          </div>
        </div>
      </section>

      <section className="sm-banner section-p1 flex flex-wrap justify-between px-[80px] py-[40px] mobile:w-[100px]">
        <div className="banner-box flex h-[50vh] w-full min-w-[300px] flex-col items-start justify-center bg-[url('images/banner/b17.jpg')] bg-cover bg-center p-[30px] text-center tablet:h-[30vh] tablet:w-[calc(50%-10px)] mobile:mb-[20px] mobile:h-[40vh]">
          <h4 className="text-[20px] font-light text-white">crazy deals</h4>
          <h2 className="text-[28px] font-extrabold leading-[54px] text-white mobile:text-[32px]">
            buy 1 get 1 free
          </h2>
          <span className="pb-[15px] text-[14px] font-medium text-white">
            Bã đậu nành is on sale
          </span>
          <button className="white cursor-pointer border border-white bg-transparent px-[18px] py-[11px] text-[13px] font-semibold text-white outline-none transition duration-200 ease-in-out">
            Learn more
          </button>
        </div>
        <div className="banner-box flex h-[50vh] w-full min-w-[300px] flex-col items-start justify-center bg-[url('images/banner/b10.jpg')] bg-cover bg-center p-[30px] text-center tablet:h-[30vh] tablet:w-[calc(50%-10px)] mobile:mb-[20px] mobile:h-[40vh]">
          <h4 className="text-[20px] font-light text-white">50% Off</h4>
          <h2 className="text-[28px] font-extrabold leading-[54px] text-white mobile:text-[32px]">
            FISH FOOD
          </h2>
          <span className="pb-[15px] text-[14px] font-medium text-white">
            Fish Food is on sale
          </span>
          <button className="white cursor-pointer border border-white bg-transparent px-[18px] py-[11px] text-[13px] font-semibold text-white outline-none transition duration-200 ease-in-out">
            Collection
          </button>
        </div>
      </section>

      
      <Footer />
    </div>
  );
}

export default HomePage;
