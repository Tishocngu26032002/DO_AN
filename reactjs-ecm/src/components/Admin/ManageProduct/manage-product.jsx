import AdminHeader from "../AdminHeader/admin-header.jsx";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from 'react-icons/fa';

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', category: '', manufacturer: '', image: '' });
  const [filterCategory, setFilterCategory] = useState(''); 
  const [editMode, setEditMode] = useState(false); 
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const fakeProducts = [
        { id: 1, name: 'Thức ăn gà', price: 100000, category: 'Gà', manufacturer: 'Nhà SX A', image: '/images/product/262.png' },
        { id: 2, name: 'Thức ăn lợn', price: 150000, category: 'Lợn', manufacturer: 'Nhà SX B', image: '/images/product/264.png' },
      ];
      setProducts(fakeProducts);
      setFilteredProducts(fakeProducts);
    };
    fetchProducts();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      setProducts(products.map(product => product.id === editId ? { ...form, id: editId } : product));
      setEditMode(false);
      setEditId(null);
    } else {
      const newProduct = { ...form, id: products.length + 1 };
      setProducts([...products, newProduct]);
    }
    setForm({ name: '', price: '', category: '', manufacturer: '', image: '' });
    handleFilter(filterCategory);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
    handleFilter(filterCategory);
  };

  const handleEdit = (id) => {
    const product = products.find((product) => product.id === id);
    setForm({ name: product.name, price: product.price, category: product.category, manufacturer: product.manufacturer, image: product.image });
    setEditMode(true);
    setEditId(id);
  };

  const handleFilter = (category) => {
    setFilterCategory(category);
    setFilteredProducts(category === '' ? products : products.filter((product) => product.category === category));
  };

  return (
    <>
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#225a3e]">Quản lý sản phẩm</h1>

        {/* Product Form */}
        <form className="mb-6" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Tên sản phẩm</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:border-[#225a3e]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Giá</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:border-[#225a3e]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Danh mục</label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:border-[#225a3e]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Nhà sản xuất</label>
            <input
              type="text"
              value={form.manufacturer}
              onChange={(e) => setForm({ ...form, manufacturer: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:border-[#225a3e]"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Hình ảnh URL</label>
            <input
              type="text"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:border-[#225a3e]"
            />
          </div>
          <button type="submit" className="bg-[#225a3e] text-white p-2 rounded">
            {editMode ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
          </button>
        </form>

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
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Tên</th>
                <th className="px-4 py-2">Giá</th>
                <th className="px-4 py-2">Danh mục</th>
                <th className="px-4 py-2">Nhà sản xuất</th>
                <th className="px-4 py-2">Hình ảnh</th>
                <th className="px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="px-4 py-2">{product.category}</td>
                  <td className="px-4 py-2">{product.manufacturer}</td>
                  <td className="px-4 py-2">
                    <img src={product.image} alt={product.name} className="w-12 h-12 object-cover" />
                  </td>
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
      </div>
    </>
  );
};

export default ManageProduct;
