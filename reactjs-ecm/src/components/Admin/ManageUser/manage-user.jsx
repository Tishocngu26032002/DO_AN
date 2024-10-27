import React, { useState } from 'react';
import AdminHeader from "../AdminHeader/admin-header.jsx";

const initialUsers = [
  { id: 1, name: 'User 1', password: 'password1', email: 'user1@example.com', role: 'customer', active: 1, createDate: '2023-01-01', updateDate: '2023-01-01' },
  { id: 2, name: 'User 2', password: 'password2', email: 'user2@example.com', role: 'employee', active: 0, createDate: '2023-02-01', updateDate: '2023-02-01' },
];

const ManageUser = () => {
  const [users, setUsers] = useState(initialUsers);

  const handleRoleChange = (e, id) => {
    const { value } = e.target;
    setUsers(users.map(user => 
      user.id === id ? { ...user, role: value } : user
    ));
  };

  const handleUpdateUser = (id) => {
    setUsers(users.map(user => 
      user.id === id ? { ...user, updateDate: new Date().toISOString().split('T')[0] } : user
    ));
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8 text-gray-700">Manage Users</h1>

        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Existing Users</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {users.map(user => (
              <div key={user.id} className="bg-white shadow-md p-6 rounded-lg border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="text-gray-600 mb-2"><strong>Role:</strong> {user.role}</p>
                <p className="text-gray-600 mb-2"><strong>Status:</strong> {user.active ? 'Active' : 'Inactive'}</p>
                <p className="text-gray-600 mb-2"><strong>Create Date:</strong> {user.createDate}</p>
                <p className="text-gray-600 mb-4"><strong>Update Date:</strong> {user.updateDate}</p>
                <div className="flex flex-col mt-4 space-x-3">
                  <select 
                    value={user.role} 
                    onChange={(e) => handleRoleChange(e, user.id)} 
                    className="border p-2 rounded text-gray-700"
                  >
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                    <option value="customer">Customer</option>
                  </select>
                  <div className='mt-2 '>
                  <button 
                    onClick={() => handleUpdateUser(user.id)} 
                    className="bg-blue-500 hover:bg-blue-600 text-white -ml-3 px-4 py-2 rounded shadow"
                  >
                    Update Role
                  </button>
                  <button 
                    onClick={() => handleDeleteUser(user.id)} 
                    className="bg-red-500 hover:bg-red-600 text-white px-4 ml-5 py-2 rounded shadow"
                  >
                    Delete
                  </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
