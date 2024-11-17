import AdminHeader from "../AdminHeader/admin-header.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../../../services/product-service.js';
import { uploadImage } from '../../../services/image-service.js'

const ManageProduct = () => {
  const { currentPage: pageParam, productsPerPage: perPageParam } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    priceout: "",
    category_id: "",
    supplier_id: "",
    url_images: "",
    description: "",
    stockQuantity: "",
    weight: "",
    expire_date: ""
  });
  const [filterCategory, setFilterCategory] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const currentPage = parseInt(pageParam, 10) || 1;
  const productsPerPage = parseInt(perPageParam, 10) || 8;

  useEffect(() => {
    // Load danh mục
    const loadCategories = async () => {
      try {
        const { items: categoriesData } = await getCategory(1, 50);
        setCategories(categoriesData || []);
      } catch (error) {
        console.error("Error loading categories:", error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const { products: productsData, totalProducts } = await fetchProducts(
          currentPage,
          productsPerPage
        );
        console.log("API Response:", productsData, "Total Products:", totalProducts);
        setProducts(productsData || []);
        setFilteredProducts(productsData || []);
        setTotalProducts(totalProducts); // Cập nhật tổng số sản phẩm
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, [currentPage, productsPerPage]);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formattedForm = {
      ...form,
      expire_date: form.expire_date
        ? new Date(form.expire_date).toISOString().split("T")[0]
        : ""
    };

    // Upload hình ảnh nếu có
    if (form.url_images) {
      const uploadResult = await uploadImage(form.url_images); // Gọi service upload
      formattedForm.url_images = uploadResult.imageUrl; // Gán URL từ API trả về
    }

    if (editMode) {
      // Chế độ chỉnh sửa
      await editProduct(editId, formattedForm);
      setProducts(
        products.map((product) =>
          product.id === editId ? { ...formattedForm, id: editId } : product
        )
      );
      setEditMode(false);
      setEditId(null);
    } else {
      // Chế độ thêm sản phẩm mới
      const newProduct = await addProduct(formattedForm);
      setProducts([...products, newProduct]);
    }

    // Reset form và đóng modal
    setForm({
      name: "",
      priceout: "",
      category_id: "",
      supplier_id: "",
      url_images: "",
      description: "",
      stockQuantity: "",
      weight: "",
      expire_date: ""
    });
    setIsModalOpen(false);
    handleFilter(filterCategory);
  } catch (error) {
    console.error("Error saving product:", error);
  }
};

  const handleImageChange = (e) => {
    setForm({ ...form, url_images: e.target.files[0] });
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id));
      handleFilter(filterCategory);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (id) => {
    const product = products.find((product) => product.id === id);
    setForm({
      name: product.name,
      priceout: product.priceout,
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      url_images: product.url_images,
      description: product.description,
      stockQuantity: product.stockQuantity,
      weight: product.weight,
      expire_date: product.expire_date
    });
    setEditMode(true);
    setEditId(id);
    setIsModalOpen(true);
  };

  const handleFilter = async (categoryId) => {
    setFilterCategory(categoryId);
    try {
      const { products: filteredData } = await fetchProductsByCategory(
        categoryId,
        currentPage,
        productsPerPage
      );
      setFilteredProducts(filteredData || []);
    } catch (error) {
      console.error("Error filtering products by category:", error);
    }
  };

  const handlePageChange = (page) => {
    navigate(`/manage-product/${page}/${productsPerPage}`);
    if (filterCategory) {
      handleFilter(filterCategory);
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#225a3e]">Quản lý sản phẩm</h1>

        {/* Filter by Category */}
        <div className="filter-section">
        <label htmlFor="category-filter">Filter by Category:</label>
        <select
          id="category-filter"
          value={filterCategory}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

        {/* Product List */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-[#225a3e]">Danh sách sản phẩm</h2>
          <table className="table-auto w-full text-left border-collapse border border-gray-300">
            <thead className="bg-[#225a3e] text-white">
              <tr>
                <th className="border px-4 py-2">STT</th>
                <th className="border px-4 py-2">Tên sản phẩm</th>
                <th className="border px-4 py-2">Giá</th>
                <th className="border px-4 py-2">Mô tả</th>
                <th className="border px-4 py-2">Số lượng trong kho</th>
                <th className="border px-4 py-2">Khối lượng</th>
                <th className="border px-4 py-2">Hình ảnh</th>
                <th className="border px-4 py-2">Ngày hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {(Array.isArray(filteredProducts) ? filteredProducts : []).map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="border px-4 py-2">{product.id}</td>
                  <td className="border px-4 py-2">{product.name}</td>
                  <td className="border px-4 py-2">{product.priceout}</td>
                  <td className="border px-4 py-2">{product.description}</td>
                  <td className="border px-4 py-2">{product.stockQuantity}</td>
                  <td className="border px-4 py-2">{product.weight}</td>
                  <td className="border px-4 py-2">
                    <img src={product.url_images} alt={product.name} style={{ width: '50px' }} />
                  </td>
                  <td className="border px-4 py-2">{product.expire_date}</td>
                  <td className="px-4 py-2 flex space-x-2">
                    <button onClick={() => handleEdit(product.id)} className="text-[#225a3e]">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(product.id)} className="text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-4 right-4 bg-[#225a3e] text-white p-4 rounded-full shadow-lg"
        >
          <FaPlus />
        </button>

        {/* Product Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-1/3">
              <h2 className="text-xl font-bold mb-4">
                {editMode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
              </h2>
              <form onSubmit={handleSubmit}>
                {/* Form Fields */}
                {[
                  { label: 'Tên sản phẩm', field: 'name', type: 'text' },
                  { label: 'Giá', field: 'priceout', type: 'number' },
                  { label: 'Mô tả', field: 'description', type: 'text' },
                  { label: 'Số lượng trong kho', field: 'stockQuantity', type: 'number' },
                  { label: 'Khối lượng', field: 'weight', type: 'number' },
                  { label: 'Ngày hết hạn', field: 'expire_date', type: 'date' },
                ].map(({ label, field, type }, index) => (
                  <div className="mb-4" key={index}>
                    <label className="block text-gray-700">{label}</label>
                    <input
                      type={type}
                      value={form[field] || ''}
                      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded focus:border-[#225a3e]"
                      required={field !== 'supplier'} // Set 'required' if field is not optional
                    />
                  </div>
                ))}

                {/* Input for image upload */}
                <div className="mb-4">
                  <label className="block text-gray-700">Hình ảnh</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}  // Xử lý sự kiện chọn ảnh
                    className="w-full p-2 border border-gray-300 rounded focus:border-[#225a3e]"
                  />
                </div>

                <button type="submit" className="bg-[#225a3e] text-white p-2 rounded">
                  {editMode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditMode(false);
                    setForm({ name: '', priceout: '', description: '', stockQuantity: '', weight: '', expire_date: '', url_images: '' });
                  }}
                  className="bg-gray-500 text-white p-2 ml-2 rounded"
                >
                  Hủy
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-l disabled:bg-gray-200"
          >
            Trước
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 mx-1 rounded ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-r disabled:bg-gray-200"
          >
            Tiếp
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageProduct;
