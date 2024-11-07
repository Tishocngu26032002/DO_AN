import AdminHeader from "../AdminHeader/admin-header.jsx";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { fetchProducts, addProduct, editProduct, deleteProduct } from '../../../services/product-service.js';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [form, setForm] = useState({
    name: '',
    priceout: '',
    category_id: '', 
    supplier_id: '', 
    url_images: '', 
    description: '',
    stockQuantity: '',
    weight: '',
    expire_date: ''
  });
  const [filterCategory, setFilterCategory] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts(currentPage, productsPerPage);
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, [currentPage, productsPerPage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await editProduct(editId, form);
        setProducts(products.map(product =>
          product.id === editId ? { ...form, id: editId } : product
        ));
        setEditMode(false);
        setEditId(null);
      } else {
        const newProduct = await addProduct(form);
        setProducts([...products, newProduct]);
      }
      setForm({
        name: '',
        priceout: '',
        category_id: '',
        supplier_id: '',
        url_images: '',
        description: '',
        stockQuantity: '',
        weight: '',
        expire_date: ''
      });
      setIsModalOpen(false);
      handleFilter(filterCategory);
    } catch (error) {
      console.error("Error saving product:", error);
    }
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

  const handleFilter = (category) => {
    setFilterCategory(category);
    setFilteredProducts(
      category === ''
        ? products
        : products.filter((product) => product.category === category)
    );
  };

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#225a3e]">Quản lý sản phẩm</h1>

        {/* Filter by Category */}
        <div className="mb-4">
          <label className="block text-gray-700">Lọc theo danh mục</label>
          <input
            type="text"
            value={filterCategory}
            onChange={(e) => handleFilter(e.target.value)}
            placeholder="Nhập danh mục cần lọc..."
            className="w-full p-2 border border-gray-300 rounded focus:border-[#225a3e]"
          />
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
              {filteredProducts.map((product) => (
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
                  { label: 'Hình ảnh', field: 'url_images', type: 'text' },
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
      </div>
    </>
  );
};

export default ManageProduct;
