import React, { useEffect, useState } from "react";
import { PER_PAGE } from "../../services/constants";
import { createCart, getCarts, updateCart } from "../../services/cart-api";
import { getProducts } from "../../services/product-api";
import { getQueryString } from "../../util/utils";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Link, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { PiShoppingCartBold } from "react-icons/pi";

const ShopGrid = () => {
  const navigate = useNavigate();
  const [params, setParams] = useState({
    _limit: PER_PAGE,
    _page: 1,
    _totalRows: 0,
    title_like: "",
  });
  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    // Gọi hàm khi trang được render lần đầu
    getProductsOnPage();
  }, [params._page, params.title_like]); // Chỉ chạy lại khi _page hoặc title_like thay đổi

  useEffect(() => {
    getCartsOnPage();
  }, []);

  const getProductsOnPage = async () => {
    try {
      const { data, pagination } = await getProducts(getQueryString(params));
      // console.log("data:", data);
      // console.log("pagination:", pagination);
      setProducts(data);

      // Kiểm tra nếu _totalRows thay đổi thì mới cập nhật params
      if (pagination._totalRows !== params._totalRows) {
        setParams((prev) => ({
          ...prev,
          _totalRows: pagination._totalRows,
        }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getCartsOnPage = async () => {
    try {
      const cartsData = await getCarts({ isUser: "abc" });
      setCarts(cartsData);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setParams((prev) => ({ ...prev, _page: page }));
  };

  const handleAddToCart = async (productId) => {
    const product = products.find((prod) => prod.id === Number(productId));
    const cartIndex = carts.findIndex((cart) => cart.productId === product.id);

    if (cartIndex !== -1) {
      await updateCart({
        ...carts[cartIndex],
        quantity: carts[cartIndex].quantity + 1,
      });
    } else {
      await createCart({
        ...product,
        productId: product.id,
        quantity: 1,
        userId: "abc",
        id: null,
      });
    }
    getCartsOnPage();
  };

  const handleSearch = (e) => {
    setParams((prev) => ({
      ...prev,
      title_like: e.target.value.trim(),
      _page: 1,
    }));
  };

  const renderProducts = () => {
    if (products.length === 0) return;

    return products.map((product) => (
      <div
        className="pro relative my-[15px] w-[23%] min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] px-[12px] py-[10px] shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 ease-in-out hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]"
        key={product.id}
        onClick={() => navigate(`/product-detail`)}
      >
        <img src={product.images[0]} alt={product.name} />
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
          <PiShoppingCartBold
            data-id={product.id}
            className="add-to-cart fas fa-shopping-cart cart absolute bottom-[20px] right-[10px] h-[40px] w-[40px] rounded-[50px] border border-[#cce7d0] bg-[#e8f6ea] p-[5px] font-medium leading-[40px] text-[#088178]"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart(product.id);
            }}
          />
        </Link>
      </div>
    ));
  };

  const renderPagination = () => {
    if (params._totalRows < PER_PAGE) return null;

    const totalPages = Math.ceil(params._totalRows / PER_PAGE);
    return (
      <div id="pagination" className="section-p1">
        {[...Array(totalPages)].map((_, index) => (
          <a
            key={index + 1}
            data-page={index + 1}
            className={`page ${
              params._page === index + 1
                ? "active bg-[#088178] text-white"
                : "bg-gray-200"
            } mx-1 rounded p-2`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </a>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Header />
      <section
        id="page-header"
        className="flex h-[40vh] w-full flex-col items-center justify-center bg-cover bg-center px-4 text-center"
        style={{ backgroundImage: "url(images/banner/banner-shop.jpg)" }}
      >
        <h2 className="text-[30px] font-bold text-white">Cám nhà Tuyên</h2>
        <p className="text-white">Đại lý cám số 1 Hiệp Hòa</p>
      </section>

      <section id="newsletter" className="section-p1 section-m1">
        <div className="flex flex-wrap items-center justify-between bg-[#041e42] bg-[url(src/assets/images/b14.png)] bg-[20%_30%] bg-no-repeat p-4">
          <div className="relative w-1/3">
            <select className="h-[3.125rem] w-full rounded border border-transparent px-5 text-[14px]"></select>
          </div>

          <div className="form flex w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              id="search"
              onInput={handleSearch}
              className="h-[3.125rem] w-full rounded border border-transparent px-5 text-[14px]"
            />
          </div>
        </div>
      </section>

      <section id="product1" className="section-p1 px-[80px] py-[40px]">
        <div
          className="pro-container flex flex-wrap justify-between pt-[20px] tablet:justify-center"
          id="product-render"
        >
          {renderProducts()}
        </div>
      </section>

      <section
        id="pagination"
        className="section-p1 flex justify-center space-x-2"
      >
        <div className="mt-4 flex justify-center">{renderPagination()}</div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopGrid;
