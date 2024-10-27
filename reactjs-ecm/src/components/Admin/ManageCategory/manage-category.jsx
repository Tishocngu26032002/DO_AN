import React, { useState } from 'react';
import AdminHeader from "../AdminHeader/admin-header.jsx";


const initialCategories = [
  { id: 1, c_name: 'Category 1', c_avatar: '/images/product/262.png', c_banner: '', c_description: 'Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1 Description 1', c_hot: 0, c_status: true },
  { id: 2, c_name: 'Category 2', c_avatar: '/images/product/264.png', c_banner: '', c_description: 'Description 2 Description 2 Description 2 Description 2 Description 2 Description 2 Description 2 Description 2 Description 2 Description 2 Description 2', c_hot: 1, c_status: false },
];

const ManageCategory = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({
    c_name: '', c_avatar: '', c_banner: '', c_description: '', c_hot: 0, c_status: true
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setNewCategory({ ...newCategory, [name]: URL.createObjectURL(files[0]) });
    }
  };

  const handleAddCategory = () => {
    setCategories([...categories, { ...newCategory, id: categories.length + 1 }]);
    setNewCategory({ c_name: '', c_avatar: '', c_banner: '', c_description: '', c_hot: 0, c_status: true });
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map(category => 
      category.id === editingCategory.id ? newCategory : category
    );
    setCategories(updatedCategories);
    setEditingCategory(null);
    setNewCategory({ c_name: '', c_avatar: '', c_banner: '', c_description: '', c_hot: 0, c_status: true });
  };

  const toggleDescription = (id) => {
    setExpandedDescription(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-700">Manage Categories</h1>
        
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">{editingCategory ? 'Update Category' : 'Add New Category'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <input 
              type="text" 
              name="c_name" 
              value={newCategory.c_name} 
              onChange={handleInputChange} 
              placeholder="Category Name" 
              className="border p-2 rounded"
            />
            <input 
              type="file" 
              name="c_avatar" 
              onChange={handleFileChange} 
              className="border p-2 rounded"
            />
            <input 
              type="text" 
              name="c_banner" 
              value={newCategory.c_banner} 
              onChange={handleInputChange} 
              placeholder="Category Banner" 
              className="border p-2 rounded"
            />
            <input 
              type="text" 
              name="c_description" 
              value={newCategory.c_description} 
              onChange={handleInputChange} 
              placeholder="Category Description" 
              className="border p-2 rounded"
            />
            <input 
              type="number" 
              name="c_hot" 
              value={newCategory.c_hot} 
              onChange={handleInputChange} 
              placeholder="Hot Level" 
              className="border p-2 rounded"
            />
            <select 
              name="c_status" 
              value={newCategory.c_status} 
              onChange={handleInputChange} 
              className="border p-2 rounded"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>
          <button 
            onClick={editingCategory ? handleUpdateCategory : handleAddCategory} 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-4 rounded shadow"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Existing Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map(category => (
              <div key={category.id} className="bg-white shadow-md p-6 rounded-lg border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.c_name}</h3>
                <p className="text-gray-600 mb-2"><strong>Avatar:</strong> <img src={category.c_avatar} alt={category.c_name} className="w-16 h-16 rounded"/></p>
                <p className="text-gray-600 mb-2"><strong>Banner:</strong> {category.c_banner}</p>
                <p className="text-gray-600 mb-2">
                  <strong>Description:</strong>
                  <span className='block'>
                    {expandedDescription[category.id] ? category.c_description : `${category.c_description.substring(0, 100)}...`}
                  </span>
                  <button 
                    onClick={() => toggleDescription(category.id)} 
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {expandedDescription[category.id] ? 'Show Less' : 'Show More'}
                  </button>
                </p>
                <p className="text-gray-600 mb-2"><strong>Hot Level:</strong> {category.c_hot}</p>
                <p className="text-gray-600 mb-2"><strong>Status:</strong> {category.c_status ? 'Active' : 'Inactive'}</p>
                <div className="flex items-center mt-4 space-x-3">
                  <button 
                    onClick={() => handleEditCategory(category)} 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageCategory;
