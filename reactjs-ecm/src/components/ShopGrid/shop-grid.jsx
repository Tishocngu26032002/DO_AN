import React, { useEffect, useState } from "react";
import { PER_PAGE } from "../../constants/per-page";
import { createCart, getCarts, updateCart } from "../../services/cart-service";
import { getProducts, getQueryProducts } from "../../services/product-service";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Link, useNavigate } from "react-router-dom";
import { PiShoppingCart } from "react-icons/pi";
import { getCategory } from "../../services/category-service";
import { authLocal, userIdLocal } from "../../util/auth-local";
import img from '../../../public/images/banner/image-4.jpg'
const ShopGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const productsPerPage = 8;

  // Gọi API lấy dữ liệu sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:6006/product/${currentPage}/${productsPerPage}`);
        if (response.data.success) {
          const fetchedProducts = response.data.data.data.map((product) => ({
            id: product.id,
            title: product.name,
            price: product.priceout,
            brand: product.category.name, // Nếu bạn muốn hiển thị tên danh mục là 'brand'
            img: product.url_images, // Sử dụng ảnh từ url_images
          }));
          setProducts(fetchedProducts);
          setTotalPages(Math.ceil(response.data.data.total / productsPerPage));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePageChange = (page) => {
    setParams((prev) => ({ ...prev, page: page }));
  };

  const handleAddToCart = async (productId) => {
    const product = products.find((prod) => prod.id === productId);
    const cartIndex = carts.findIndex((cart) => cart.product_id === product.id);

    let token = authLocal.getToken();
    token = token.replace(/^"|"$/g, "");

    let userId = userIdLocal.getUserId();
    userId = userId.replace(/^"|"$/g, "");

    if (cartIndex !== -1) {
      await updateCart(
        {
          ...carts[cartIndex],
          quantity: carts[cartIndex].quantity + 1,
        },
        token,
      );
    } else {
      await createCart(
        {
          ...product,
          product_id: product.id,
          quantity: 1,
          user_id: userId,
        },
        token,
      );
    }
    getCartsOnPage();
  };

  const handleSearch = (e) => {
    setParams((prev) => ({
      ...prev,
      name: e.target.value.trim(),
      page: 1,
    }));
  };

  const handleFilter = (e) => {
    setParams((prev) => ({
      ...prev,
      category_id: e.target.value.trim(),
      page: 1,
    }));
  };

  const renderProducts = () => {
    if (products.length === 0) return;

    return products.map((product) => (
      <div
      key={product.id}
      onClick={() => navigate(`/product-detail/${product.id}`)}
      className="pro ease relative m-4 w-1/5 min-w-[250px] cursor-pointer rounded-2xl border border-[#cce7d0] bg-white p-3 shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)]"
    >
      <img
        src={product.url_images} alt={product.name}
        className="w-full rounded-xl"
      />
      <div className="des pt-3 text-start">
        <span className="text-[13px] text-[#1a1a1a]">{product.category.name}</span>
        <h5 className="pt-2 text-[15px] font-semibold text-[#006532]">
        {product.name}
        </h5>
        <h5 className="pt-2 text-[13px] text-[#1a1a1a]">Bao: {product.weight}kg</h5>
        <h4 className="flex pt-2 text-[16px] font-semibold text-[#006532]">
          <p className="mr-1 mt-[2px] text-sm font-normal underline">
            đ
          </p>
          {new Intl.NumberFormat('vi-VN').format(product.priceout)}
        </h4>
      </div>
      <a
        href="#"
        className="cart absolute bottom-5 right-2 -mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#cce7d0] bg-[#e8f6ea] font-medium leading-10 text-[#006532]"
      >
      <Link to="">
        <PiShoppingCart
          data-id={product.id}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleAddToCart(product.id);
          }}
         />
         </Link>
      </a>
  </div>
      
    ));
  };

  const renderPagination = () => {
    if (params.total < PER_PAGE) return null;

    const totalPages = Math.ceil(params.total / PER_PAGE);
    return (
      <div id="pagination" className="section-p1">
        {[...Array(totalPages)].map((_, index) => (
          <a
            key={index + 1}
            data-page={index + 1}
            className={`page ${
              params.page === index + 1
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
    <div className="w-full text-[#006532]">
      <Header />
      <section
        id="page-header"
        className="h-[47vh]"
        style={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="flex h-full w-full flex-col items-center justify-center bg-[rgba(8,28,14,0.50)] text-center">
          <h2 className="text-2xl font-bold text-white">Cám........</h2>
          <p className="text-white"></p>
          <a href="#" className="to-top">
            <i className="fas fa-chevron-up"></i>
          </a>
        </div>
      </section>

      {/* Search bar */}
      <section id="search-bar" className="py-6 bg-[#e8f6ea]">
        <div className="mx-auto max-w-[1200px] flex items-center justify-between space-x-4 px-6">
          <select
            className="h-12 w-1/3 rounded-lg border border-[#cce7d0] px-4 text-[#006532] text-sm focus:outline-none"
            onChange={(e) => handleCategoryChange(e.target.value)}
            value={selectedCategory}
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 w-2/3 rounded-lg border border-[#cce7d0] px-4 text-[#006532] text-sm focus:outline-none"
          />
        </div>
      </section>

      {/* Product list */}
      <section id="product1" className="section-p1 mx-auto w-full max-w-[1200px]">
        <div className="pro-container mt-8 grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 md:px-8 lg:grid-cols-4 lg:px-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="pro ease relative m-4 w-1/5 min-w-[250px] cursor-pointer rounded-2xl border border-[#cce7d0] p-3 shadow-[20px_20px_30px_rgba(0,0,0,0.02)] transition duration-200 hover:shadow-[20px_20px_30px_rgba(0,0,0,0.06)] bg-white"
            >
              <img src={product.img} alt={product.title} className="w-full rounded-xl" />
              <div className="des pt-3 text-start">
                <span className="text-sm text-[#006532]">{product.brand}</span>
                <h5 className="pt-2 text-sm text-[#1a1a1a]">{product.title}</h5>
                <h4 className="m pt-2 text-lg font-bold text-[#006532]">${product.price}</h4>
              </div>
              <a
                href="#"
                className="cart absolute bottom-5 -mb-3 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#cce7d0] bg-[#e8f6ea] font-medium leading-10 text-[#006532]"
              >
                <PiShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>


      {/* Pagination */}
      <section id="pagination" className="my-8 flex justify-center">
        <div className="space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-lg transition ${
                currentPage === index + 1 ? "bg-[#006532] text-white" : "bg-gray-200 text-[#006532]"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ShopGrid;
