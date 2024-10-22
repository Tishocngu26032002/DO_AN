import React, { useState, useEffect } from 'react';

const ProductManagement = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({ name: '', price: '', category: '' });

    useEffect(() => {
        const fetchProducts = async () => {
            const fakeProducts = [
                { id: 1, name: 'Thức ăn gà', price: 100000, category: 'Gà' },
                { id: 2, name: 'Thức ăn lợn', price: 150000, category: 'Lợn' },
            ];
            setProducts(fakeProducts);
        };
        fetchProducts();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = { ...form, id: products.length + 1 };
        setProducts([...products, newProduct]);
        setForm({ name: '', price: '', category: '' });
    };

    const handleDelete = (id) => {
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

            {/* Form thêm sản phẩm */}
            <form className="mb-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Tên sản phẩm</label>
                    <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Giá</label>
                    <input
                        type="number"
                        value={form.price}
                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Danh mục</label>
                    <input
                        type="text"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Thêm sản phẩm
                </button>
            </form>

            {/* Danh sách sản phẩm */}
            <div>
                <h2 className="text-xl font-bold mb-4">Danh sách sản phẩm</h2>
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">ID</th>
                            <th className="px-4 py-2">Tên</th>
                            <th className="px-4 py-2">Giá</th>
                            <th className="px-4 py-2">Danh mục</th>
                            <th className="px-4 py-2">Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border px-4 py-2">{product.id}</td>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.price}</td>
                                <td className="border px-4 py-2">{product.category}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 text-white p-2 rounded"
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
