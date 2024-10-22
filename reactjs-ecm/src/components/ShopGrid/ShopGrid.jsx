import React, { useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import f1 from '../../assets/f3.jpg';

const categories = [
    { id: 'all', name: 'Tất cả các danh mục' },
    { id: 'pig', name: 'Thức ăn cho lợn' },
    { id: 'poultry', name: 'Thức ăn cho gia cầm' },
    { id: 'fishery', name: 'Thức ăn cho thủy sản' }
];

const products = [
    { id: 1, category: 'pig', img: f1, brand: "adidas", title: "Pig1", price: 78 },
    { id: 2, category: 'pig', img: f1, brand: "adidas", title: "Pig2", price: 78 },
    { id: 3, category: 'pig', img: f1, brand: "adidas", title: "Pig3", price: 78 },
    { id: 4, category: 'poultry', img: f1, brand: "adidas", title: "Poultry1", price: 78 },
    { id: 5, category: 'poultry', img: f1, brand: "adidas", title: "Poultry2", price: 78 },
    { id: 6, category: 'poultry', img: f1, brand: "adidas", title: "Poutry3", price: 78 },
    { id: 7, category: 'fishery', img: f1, brand: "adidas", title: "Fishery1", price: 78 },
    { id: 8, category: 'fishery', img: f1, brand: "adidas", title: "Fishery2", price: 78 },
    { id: 9, category: 'poultry', img: f1, brand: "adidas", title: "Poutry4", price: 78 },
    { id: 10, category: 'fishery', img: f1, brand: "adidas", title: "Fishery3", price: 78 },
    { id: 11, category: 'fishery', img: f1, brand: "adidas", title: "Fishery4", price: 78 },
];

const ShopGrid = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts = products.filter(product => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearchTerm = product.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearchTerm;
    });

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="w-full">
            {/* Page Header */}
            <section
                id="page-header"
                className="bg-cover bg-center flex flex-col justify-center items-center text-center h-[40vh] w-full px-4"
                style={{ backgroundImage: 'url(/src/assets/images/b1.jpg)' }}
            >
                <h2 className="text-white font-bold text-[30px]">Cám nhà Tuyên</h2>
                <p className="text-white">Đại lý cám số 1 Hiệp Hòa</p>
            </section>

            {/* Search bar */}
            <section id="newsletter" className="section-p1 section-m1">
                <div className="flex justify-between items-center flex-wrap bg-[url(src/assets/images/b14.png)] bg-no-repeat bg-[20%_30%] bg-[#041e42] p-4">
                    <div className="relative w-1/3">
                        <select
                            className="h-[3.125rem] px-5 text-[14px] w-full border border-transparent rounded"
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

                    <div className="w-1/3 flex">
                        <input
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="h-[3.125rem] px-5 text-[14px] w-full border border-transparent rounded rounded"
                        />
                    </div>
                </div>
            </section>

            {/* Product list */}
            <section id="product1" className="section-p1 mx-auto w-full max-w-[1200px]">
                <div className="pro-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:px-8 lg:px-8 justify-center mt-8">
                    {currentProducts.map((product) => (
                        <div key={product.id} className="w-full sm:w-[23%] min-w-[250px] p-3 border border-[#cce7d0] rounded-[25px] cursor-pointer shadow-lg mb-6 transition-shadow duration-200 ease-in-out relative hover:shadow-2xl">
                            <img src={product.img} alt={product.title} className="w-full rounded-[20px]" />
                            <div className="text-left py-2">
                                <span className="text-gray-600 text-xs">{product.brand}</span>
                                <h5 className="pt-2 text-sm font-medium">{product.title}</h5>
                                {/* <div className="flex text-yellow-400 text-xs">
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                    <FaStar />
                                </div> */}
                                <h4 className="pt-2 text-base font-bold text-[#088178]">${product.price}</h4>
                            </div>
                            <a href="#" className="absolute bottom-5 right-2 w-10 h-10 flex justify-center items-center rounded-full bg-[#e8f6ea] border border-[#cce7d0] text-[#088178]">
                                <FaShoppingCart />
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pagination */}
            <section id="pagination" className="section-p1 flex justify-center space-x-2">
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`mx-1 p-2 rounded ${currentPage === index + 1 ? 'bg-[#088178] text-white' : 'bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </section>

            {/* Newsletter */}
            <section id="newsletter" className="bg-[#041e42] flex flex-wrap justify-between items-center p-4 bg-[url(src/assets/images/b14.png)] bg-no-repeat bg-[20%_30%] mt-8">
                <div className="newstext w-full md:w-1/2">
                    <h4 className="text-[22px] font-bold text-white">Đăng ký để nhận thông báo</h4>
                    <p className="text-[14px] font-semibold text-[#818ea0]">
                        Nhận cập nhật qua email về các sản phẩm mới nhất và các ưu đãi đặc biệt của chúng tôi.
                    </p>
                </div>
                <div className="form w-full md:w-1/2 flex mt-4 md:mt-0">
                    <input
                        type="text"
                        placeholder="Địa chỉ email của bạn"
                        className="h-[3.125rem] px-5 text-[14px] w-full border border-transparent rounded-l"
                    />
                    <button className="bg-[#088178] text-white h-[3.125rem] px-4 rounded-l-none flex items-center justify-center flex-shrink-0">Đăng ký</button>
                </div>
            </section>
        </div>
    );
};

export default ShopGrid;
