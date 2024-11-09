import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PiShoppingCart } from "react-icons/pi";
import Header from '../Header/header';
import Footer from '../Footer/footer';

const categories = [
  { id: "all", name: "Tất cả các danh mục" },
  { id: "pig", name: "Thức ăn cho lợn" },
  { id: "poultry", name: "Thức ăn cho gia cầm" },
  { id: "fishery", name: "Thức ăn cho thủy sản" },
];

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

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category_id === selectedCategory;
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full text-[#006532]">
      <Header />

      {/* Banner */}
      <section id="page-header" className="h-[292px] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url("images/banner/image-4.jpg")` }}>
        <div className="flex h-full w-full items-center justify-center bg-opacity-70 bg-[#006532] text-white">
          <h2 className="text-4xl font-semibold">Giỏ Hàng Của Bạn</h2>
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
