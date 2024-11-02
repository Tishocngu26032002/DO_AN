import React, { useState } from 'react';
import AdminHeader from "../AdminHeader/admin-header.jsx";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaEye, FaSort } from 'react-icons/fa';
import { MdOutlineInbox,MdOutlineCancel } from "react-icons/md";
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
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  
  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig !== null) {
      sortableUsers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = key => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };
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

  const handleDeleteSelectedUsers = () => {
    setUsers(users.filter(user => !selectedUsers.includes(user.id)));
    setSelectedUsers([]); // Reset selected users
  };

  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentUser({ name: '', email: '', role: 'customer', active: 1 });
    setShowModal(true);
  };

  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };
  const handleViewUser = (user) => {
    setCurrentUser(user);
    setShowViewPopup(true);
  };
  const filteredUsers = sortedUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole ? user.role === filterRole : true;
    const matchesStatus = filterStatus ? user.active === parseInt(filterStatus) : true;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="lg:mx-12 p-4">
        <h1 className="text-4xl font-bold mb-8 mt-4 text-[#006532] text-start">Manage User</h1>

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
        <div className="flex items-center flex-col md:flex-row  mt-4 mb-3 px-6 py-3 bg-white rounded-lg">
        <div className="flex items-center space-x-2 w-1/5 ">
          <div className='pr-4 mt-1 tablet:absolute tablet:mt-[148px] tablet:left-10 '>
            <input 
                    type="checkbox" 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(filteredUsers.map(user => user.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                   
                  />

          </div>
          <div className=' tablet:mt-36 tablet:left-16 tablet:absolute'>
            {selectedUsers.length > 0 && (
              <FaTrash 
                onClick={handleDeleteSelectedUsers} 
                className='text-gray-400 hover:text-red-500  ' 
              />
            )}
          </div>
        </div>
          <div className="flex items-center  space-x-2 mb-2 md:mb-0 w-full md:w-2/5 ">
            <div className="relative w-full ">
              <input 
                type="text" 
                placeholder="Search by name" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="border border-[#006532] p-2 rounded pl-3 w-full"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center space-x-2 w-2/5 tablet:w-full justify-end">
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

        <div className="overflow-x-auto ">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-[#006532] text-white">
              <tr>
                <th className="py-3 pl-6 pr-3 text-left">
                  {/*  */}
                  <MdOutlineInbox />
                </th>
                <th className="py-3 pr-6 text-left">STT </th> 
                <th className="py-3 px-6 text-left">ID <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('id')}/></th>
                <th className="py-3 px-6 text-left">Name<FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('name')}/></th>
                <th className="py-3 px-6 text-left hidden md:table-cell ">Email <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('email')}/></th>
                <th className="py-3 px-6 text-left hidden sm:table-cell">Role <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('role')}/></th>
                <th className="py-3 px-6 text-left hidden lg:table-cell ">Status <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('active')}/></th>
                <th className="py-3 px-6 text-left hidden xl:table-cell">Create Date <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('createDate')}/></th>
                <th className="py-3 px-6 text-left hidden xl:table-cell">Update Date <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('updateDate')}/></th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user, index) => (
                <tr key={user.id} className="border-b hover:bg-[#e0f7e0]">
                  <td className="py-4 pl-6 pr-3">
                    <input 
                      type="checkbox" 
                      checked={selectedUsers.includes(user.id)} 
                      onChange={() => handleSelectUser(user.id)} 
                    />
                  </td>
                  <td className="py-3 pr-6">{index + 1}</td> 
                  <td className="py-3 px-6">{user.id}</td> 
                  <td className="py-3 px-6 ">{user.name}</td>
                  <td className="py-3 px-6 hidden md:table-cell">{user.email}</td>
                  <td className="py-3 px-6 capitalize hidden sm:table-cell ">{user.role}</td>
                  <td className="py-3 px-6 hidden lg:table-cell">{user.active ? 'Active' : 'Inactive'}</td>
                  <td className="py-3 px-6 hidden xl:table-cell">{user.createDate}</td>
                  <td className="py-3 px-6 hidden xl:table-cell">{user.updateDate}</td>
                  <td className="py-3 px-6">
                    <div className="flex space-x-4">
                    <button 
                        onClick={() =>  handleViewUser(user)} 
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <FaEye size={18} />
                      </button>
                      <button 
                        onClick={() => openUpdateModal(user)} 
                        className="text-[#006532] hover:text-[#005a2f]">
                        <FaEdit />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user.id)} 
                        className="text-gray-400 hover:text-red-500">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showViewPopup && currentUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-[#006532]">Order: {currentUser.id}</h2>
              <p className="text-black"><strong className="text-[#006532]">Name:</strong> {currentUser.name}</p>
              <p className="text-black"><strong className="text-[#006532]">Email:</strong> {currentUser.email}</p>
              <p className="text-black"><strong className="text-[#006532]">Role:</strong> {currentUser.role}</p>
              <p className="text-black"><strong className="text-[#006532]">Status:</strong> {currentUser.active ? 'Active' : 'Inactive'}</p>
              <p className="text-black"><strong className="text-[#006532]">Create Date:</strong> {currentUser.createDate}</p>
              <p className="text-black"><strong className="text-[#006532]">Update Date:</strong> {currentUser.updateDate}</p>
       
              <button 
                onClick={() => setShowViewPopup(false)} 
                className="mt-4 bg-[#006532] text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
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
