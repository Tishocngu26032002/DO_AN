import React, { useState } from "react";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import Footer from "../Footer/footer";
import Header from "../Header/header";
// import React, { useState } from "react";
// import { FaStar, FaShoppingCart } from "react-icons/fa";
// // import b1 from '../../assets/images/b1.png';
// // import f1 from "../../assets/images/f1.png";
// // import b14 from '../../assets/images/b14.png';

const categories = [
  { id: "all", name: "Tất cả các danh mục" },
  { id: "pig", name: "Thức ăn cho lợn" },
  { id: "poultry", name: "Thức ăn cho gia cầm" },
  { id: "fishery", name: "Thức ăn cho thủy sản" },
];

const products = [
  {
    id: 1,
    category: "pig",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Pig1",
    price: 78,
  },
  {
    id: 2,
    category: "pig",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Pig2",
    price: 78,
  },
  {
    id: 3,
    category: "pig",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Pig3",
    price: 78,
  },
  {
    id: 4,
    category: "poultry",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Poultry1",
    price: 78,
  },
  {
    id: 5,
    category: "poultry",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Poultry2",
    price: 78,
  },
  {
    id: 6,
    category: "poultry",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Poutry3",
    price: 78,
  },
  {
    id: 7,
    category: "fishery",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Fishery1",
    price: 78,
  },
  {
    id: 8,
    category: "fishery",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Fishery2",
    price: 78,
  },
  {
    id: 9,
    category: "poultry",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Poutry4",
    price: 78,
  },
  {
    id: 10,
    category: "fishery",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Fishery3",
    price: 78,
  },
  {
    id: 11,
    category: "fishery",
    img: "images/products/f1.png",
    brand: "adidas",
    title: "Fishery4",
    price: 78,
  },
];

const ShopGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearchTerm = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearchTerm;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-full">
      <Header />
      {/* Page Header */}
      <section
        id="page-header"
        className="flex h-[40vh] w-full flex-col items-center justify-center bg-cover bg-center px-4 text-center"
        style={{ backgroundImage: "url(images/banner/banner-shop.jpg)" }}
      >
        <h2 className="text-[30px] font-bold text-white">Cám nhà Tuyên</h2>
        <p className="text-white">Đại lý cám số 1 Hiệp Hòa</p>
      </section>

      {/* Search bar */}
      <section id="newsletter" className="section-p1 section-m1">
        <div className="flex flex-wrap items-center justify-between bg-[#041e42] bg-[url(src/assets/images/b14.png)] bg-[20%_30%] bg-no-repeat p-4">
          <div className="relative w-1/3">
            <select
              className="h-[3.125rem] w-full rounded border border-transparent px-5 text-[14px]"
              onChange={(e) => handleCategoryChange(e.target.value)}
              value={selectedCategory}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex w-1/3">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-[3.125rem] w-full rounded border border-transparent px-5 text-[14px]"
            />
          </div>
        </div>
      </section>

      {/* Product list */}
      <section
        id="product1"
        className="section-p1 mx-auto w-full max-w-[1200px]"
      >
        <div className="pro-container mt-8 grid grid-cols-1 justify-center gap-4 sm:grid-cols-2 md:grid-cols-3 md:px-8 lg:grid-cols-4 lg:px-8">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="relative mb-6 w-full min-w-[250px] cursor-pointer rounded-[25px] border border-[#cce7d0] p-3 shadow-lg transition-shadow duration-200 ease-in-out hover:shadow-2xl sm:w-[23%]"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full rounded-[20px]"
              />
              <div className="py-2 text-left">
                <span className="text-xs text-gray-600">{product.brand}</span>
                <h5 className="pt-2 text-sm font-medium">{product.title}</h5>
                {/* <div className="flex text-yellow-400 text-xs">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div> */}
                <h4 className="pt-2 text-base font-bold text-[#088178]">
                  ${product.price}
                </h4>
              </div>
              <a
                href="#"
                className="absolute bottom-5 right-2 flex h-10 w-10 items-center justify-center rounded-full border border-[#cce7d0] bg-[#e8f6ea] text-[#088178]"
              >
                <FaShoppingCart />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Pagination */}
      <section
        id="pagination"
        className="section-p1 flex justify-center space-x-2"
      >
        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 rounded p-2 ${currentPage === index + 1 ? "bg-[#088178] text-white" : "bg-gray-200"}`}
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
