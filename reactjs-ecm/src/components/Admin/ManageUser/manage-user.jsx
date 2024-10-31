import React, { useState } from 'react';
import AdminHeader from "../AdminHeader/admin-header.jsx";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from 'react-icons/fa';

const initialUsers = [
  { id: 1, name: 'User 1', password: 'password1', email: 'user1@example.com', role: 'customer', active: 1, createDate: '2023-01-01', updateDate: '2023-01-01' },
  { id: 2, name: 'User 2', password: 'password2', email: 'user2@example.com', role: 'employee', active: 0, createDate: '2023-02-01', updateDate: '2023-02-01' },
];

const Modal = ({ children, showModal, setShowModal }) => (
  showModal ? (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        {children}
        <button onClick={() => setShowModal(false)} className="mt-4 ml-3 bg-red-600 text-white px-4 py-2 rounded">Close</button>
      </div>
    </div>
  ) : null
);

const ManageUser = () => {
  const [users, setUsers] = useState(initialUsers);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const handleSaveUser = () => {
    if (currentUser.id) {
      setUsers(users.map(user => 
        user.id === currentUser.id ? { ...currentUser, updateDate: new Date().toISOString().split('T')[0] } : user
      ));
    } else {
      const newUser = { ...currentUser, id: users.length + 1, createDate: new Date().toISOString().split('T')[0], updateDate: new Date().toISOString().split('T')[0] };
      setUsers([...users, newUser]);
    }
    setShowModal(false);
    setCurrentUser(null);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentUser({ name: '', email: '', role: 'customer', active: 1 });
    setShowModal(true);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesStatus = filterStatus ? user.active === parseInt(filterStatus) : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="lg:mx-12 p-4">
        <h1 className="text-4xl font-bold mb-8 mt-4 text-[#006532] text-center">Manage User</h1>

        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">{currentUser?.id ? 'Update User' : 'Add User'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Name:</label>
              <input 
                type="text" 
                value={currentUser?.name} 
                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} 
                className="border border-[#006532] p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Email:</label>
              <input 
                type="email" 
                value={currentUser?.email} 
                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} 
                className="border border-[#006532] p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Role:</label>
              <select 
                value={currentUser?.role} 
                onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })} 
                className="border border-[#006532] p-2 rounded w-full"
              >
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700">Status:</label>
              <select 
                value={currentUser?.active} 
                onChange={(e) => setCurrentUser({ ...currentUser, active: parseInt(e.target.value) })} 
                className="border border-[#006532] p-2 rounded w-full"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
          </div>
          <button 
            onClick={handleSaveUser} 
            className="bg-[#006532] hover:bg-[#005a2f] text-white px-4 py-2 mt-4 rounded shadow"
          >
            {currentUser?.id ? 'Save Changes' : 'Add User'}
          </button>
        </Modal>

        {/* Thanh tìm kiếm và bộ lọc */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2 ">
            <div className="relative ">
              <input 
                type="text" 
                placeholder="Search by name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="border border-[#006532] p-2 rounded pl-3 w-[400px]" // thêm padding bên trái để tạo không gian cho biểu tượng
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" /> {/* Định vị biểu tượng */}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select 
              value={filterRole} 
              onChange={(e) => setFilterRole(e.target.value)} 
              className="border border-[#006532] p-2 rounded"
            >
              <option value="">All Roles</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
            <FaFilter />
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)} 
              className="border border-[#006532] p-2 rounded"
            >
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-[#006532] text-white">
              <tr>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Role</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Create Date</th>
                <th className="py-3 px-6 text-left">Update Date</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b hover:bg-[#e0f7e0]">
                  <td className="py-3 px-6">{user.name}</td>
                  <td className="py-3 px-6">{user.email}</td>
                  <td className="py-3 px-6 capitalize">{user.role}</td>
                  <td className="py-3 px-6">{user.active ? 'Active' : 'Inactive'}</td>
                  <td className="py-3 px-6">{user.createDate}</td>
                  <td className="py-3 px-6">{user.updateDate}</td>
                  <td className="py-3 px-6">
                    <div className="flex space-x-4">
                      <button 
                        onClick={() => openUpdateModal(user)} 
                        className="text-[#006532] hover:text-[#005a2f]">
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)} 
                        className="text-red-600 hover:text-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mt-6">
         
          <button
        onClick={openAddModal}
        className="fixed bottom-4 right-4 bg-[#006532] hover:bg-[#005a2f] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaPlus size={24} /> {/* Icon nút */}
      </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
