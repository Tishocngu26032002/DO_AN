import React, { useState } from 'react';
import AdminHeader from "../AdminHeader/admin-header.jsx";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

const initialCategories = [
  { id: 1, c_name: 'Category 1', c_avatar: '/images/product/262.png', c_banner: '', c_description: 'Description 1....', c_hot: 0, c_status: true },
  { id: 2, c_name: 'Category 2', c_avatar: '/images/product/264.png', c_banner: '', c_description: 'Description 2...', c_hot: 1, c_status: false },
];

const Modal = ({ children, showModal, setShowModal }) => (
  showModal ? (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {children}
        <button onClick={() => setShowModal(false)} className="mt-4 ml-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  ) : null
);

const ManageCategory = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [newCategory, setNewCategory] = useState({
    c_name: '', c_avatar: '', c_banner: '', c_description: '', c_hot: 0, c_status: true
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterHot, setFilterHot] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
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
    setShowModal(false);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
    setShowModal(true);
  };

  const handleUpdateCategory = () => {
    const updatedCategories = categories.map(category => 
      category.id === editingCategory.id ? newCategory : category
    );
    setCategories(updatedCategories);
    setEditingCategory(null);
    setNewCategory({ c_name: '', c_avatar: '', c_banner: '', c_description: '', c_hot: 0, c_status: true });
    setShowModal(false);
  };

  const toggleDescription = (id) => {
    setExpandedDescription(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };
  const handleSelectCategory = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter(cateId => cateId !== id));
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };
  const handleDeleteSelectedCategories = () => {
    setCategories(categories.filter(category => !selectedCategories.includes(category.id)));
    setSelectedCategories([]); // Reset selected users
  };
  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.c_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHot = filterHot ? category.c_hot === parseInt(filterHot) : true;
    const matchesStatus = filterStatus ? category.c_status === (filterStatus === '1') : true;
    return matchesSearch && matchesHot && matchesStatus;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className=" lg:mx-12 p-4">
        <h1 className="text-4xl font-bold mb-8 mt-4 text-[#006532] text-center">Manage Categories</h1>

        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2 className="text-2xl font-semibold mb-4 text-[#006532]">{editingCategory ? 'Update Category' : 'Add New Category'}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            className="bg-[#006532] hover:bg-[#005a2f] text-white px-4 py-2 mt-4 rounded shadow"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </Modal>

        {/* Thanh tìm kiếm và lọc */}
        <div className="flex items-center flex-col md:flex-row  mt-4 mb-3 px-6 py-3 bg-white rounded-lg">
          <div className="flex items-center space-x-2 w-1/5 ">
              <div className='pr-4 mt-1 tablet:absolute tablet:mt-[148px] tablet:left-10 '>
                <input 
                        type="checkbox" 
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedCategories(categories.map(category => category.id));
                          } else {
                            setSelectedCategories([]);
                          }
                        }}
                      
                      />
                </div>
              <div className=' tablet:mt-36 tablet:left-16 tablet:absolute'>
              {selectedCategories.length > 0 && (
                <FaTrash 
                  onClick={handleDeleteSelectedCategories} 
                  className='text-gray-400 hover:text-red-500  ' 
                />
              )}
              </div>
            </div>
            <div className="flex items-center  space-x-2 mb-2 md:mb-0 w-full md:w-2/5 ">
              <div className="relative w-full " >
                <input 
                  type="text" 
                  placeholder="Search by name" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="border border-[#00653287] rounded-lg px-4 py-2 w-full"
                />
                <FaSearch className="absolute top-3 right-4 text-gray-400" />
              </div>
            </div> 
          <div className="flex items-center space-x-2 w-2/5 tablet:w-full justify-end">
            <select 
              value={filterHot} 
              onChange={(e) => setFilterHot(e.target.value)} 
              className="border border-[#00653287] p-2 rounded"
            >
              <option value="">All Hot Levels</option>
              <option value="0">0</option>
              <option value="1">1</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)} 
              className="border border-[#00653287] p-2 rounded"
            >
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
            {filteredCategories.map(category => (
              <div key={category.id} className="bg-white shadow-md p-6 rounded-lg border border-[#e0e0e0] hover:shadow-custom-dark transition-shadow duration-300 ease-in-out border-t-4 border-t-[#006532]">
                <h3 className="text-xl font-semibold text-[#006532] mb-2">{category.c_name}</h3>
                <p className="text-gray-600 mb-2"><strong>Avatar:</strong> <img src={category.c_avatar} alt={category.c_name} className="w-16 h-16 rounded" /></p>
                <p className="text-gray-600 mb-2"><strong>Banner:</strong> {category.c_banner}</p>
                <p className="text-gray-600 mb-2">
                  <strong>Description:</strong>
                  <span className='block'>
                    {expandedDescription[category.id] ? category.c_description : `${category.c_description.substring(0, 100)}...`}
                  </span>
                  <button 
                    onClick={() => toggleDescription(category.id)} 
                    className="text-[#006532] hover:text-[#005a2f] transition-colors duration-300"
                  >
                    {expandedDescription[category.id] ? 'Show Less' : 'Show More'}
                  </button>
                </p>
                <p className="text-gray-600 mb-2"><strong>Hot Level:</strong> {category.c_hot}</p>
                <p className="text-gray-600 mb-2"><strong>Status:</strong> {category.c_status ? 'Active' : 'Inactive'}</p>
                <div className="flex items-center mt-4 space-x-3">
                <input 
                      type="checkbox" 
                      checked={selectedCategories.includes(category.id)} 
                      onChange={() => handleSelectCategory(category.id)} 
                      className='size-[14px] mt-[2px]'
                    />
                  <button 
                    onClick={() =>handleEditCategory(category)} 
                    className="pl-1 text-[#006532] py-1 rounded hover:text-[#56bb89]"
                  >
                    <FaEdit /> 
                  </button>
                  <button 
                    onClick={() => handleDeleteCategory(category.id)} 
                    className=" text-red-700 pl-1 py-1 rounded hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          onClick={() => {
            setNewCategory({
              c_name: '',
              c_avatar: '',
              c_banner: '',
              c_description: '',
              c_hot: 0,
              c_status: true
            });
            setEditingCategory(null);
            setShowModal(true);
          }} 
          className="fixed bottom-10 right-10 bg-[#006532] text-white p-4 rounded-full shadow-lg hover:bg-[#4d9d75] transition-colors duration-300"
        >
          <FaPlus size={24} />
        </button>
      </div>
    </div>
  );
};

export default ManageCategory;
