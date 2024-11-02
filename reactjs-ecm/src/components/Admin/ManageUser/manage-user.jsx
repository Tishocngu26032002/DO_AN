import React, { useState,useEffect } from 'react';
import AdminHeader from "../AdminHeader/admin-header.jsx";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter, FaEye, FaSort } from 'react-icons/fa';
import { MdOutlineInbox } from "react-icons/md";
import { getUsers, deleteUser,updateUser, createUser } from '../../../services/service';

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
  const [allUsers, setAllUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const usersPerPage = 3; // Số lượng người dùng trên mỗi trang

  useEffect(() => {
    const fetchAllUsers = async () => {
      const fetchedUsers = [];
      let currentPage = 1;
      let totalUsers = 0;

      do {
        const result = await getUsers(currentPage, usersPerPage);
        if (result.success) {
          fetchedUsers.push(...result.data.data);
          totalUsers = result.data.total;
          currentPage++;
        } else {
          console.error('Failed to fetch users:', result.message);
          break;
        }
      } while (fetchedUsers.length < totalUsers);

      setAllUsers(fetchedUsers);
      setTotalPages(Math.ceil(totalUsers / usersPerPage));
      setUsers(fetchedUsers.slice(0, usersPerPage));
    };

    fetchAllUsers();
  }, []);

  const sortedUsers = React.useMemo(() => {
    let sortableUsers = [...users];
    if (sortConfig.key) {
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

  const handleSaveUser = async () => {
    try {
      if (currentUser.id) {
        await updateUser(currentUser.id, currentUser); // Gọi API PATCH
      } else {
        // Thêm người dùng mới
        await createUser(currentUser); // Gọi API POST
      }
      window.location.reload();
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };
  
  

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      window.location.reload(); // Tải lại trang sau khi xóa thành công
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };
  

  const handleDeleteSelectedUsers = async () => {
    try {
      await Promise.all(selectedUsers.map(userId => deleteUser(userId))); // Gọi API xóa từng người dùng
      window.location.reload(); // Tải lại trang sau khi xóa thành công
    } catch (error) {
      console.error('Failed to delete selected users:', error);
    }
  };
  
  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const openAddModal = () => {
    setCurrentUser({ firstname: '', lastname: '', email: '', role: 'customer', isActive: true });
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

  useEffect(() => {
    const filteredUsers = allUsers.filter(user => {
      const matchesSearch = (
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
        // user.phone.includes(searchTerm) 
      );

      const matchesRole = filterRole ? user.role === filterRole : true;
      const matchesStatus = filterStatus ? user.isActive === (filterStatus === '1') : true;

      return matchesSearch && matchesRole && matchesStatus;
    });

    setTotalPages(Math.ceil(filteredUsers.length / usersPerPage));

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    setUsers(filteredUsers.slice(startIndex, endIndex));
  }, [currentPage, searchTerm, allUsers, filterRole, filterStatus]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (e) => {
    setFilterRole(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
    setCurrentPage(1);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <AdminHeader />
      <div className="lg:mx-12 p-4">
        <h1 className="text-4xl font-bold mb-8 mt-4 text-[#006532] text-start">Manage User</h1>

        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">{currentUser?.id ? 'Update User' : 'Add User'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">First Name:</label>
              <input 
                type="text" 
                value={currentUser?.firstName} 
                onChange={(e) => setCurrentUser({ ...currentUser, firstName: e.target.value })} 
                className="border border-[#006532] p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Last Name:</label>
              <input 
                type="text" 
                value={currentUser?.lastName} 
                onChange={(e) => setCurrentUser({ ...currentUser, lastName: e.target.value })} 
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
              <label className="block text-gray-700">Phone:</label>
              <input 
                type="text" 
                value={currentUser?.phone} 
                onChange={(e) => setCurrentUser({ ...currentUser, phone: e.target.value })} 
                className="border border-[#006532] p-2 rounded w-full"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address:</label>
              <input 
                type="text" 
                value={currentUser?.address} 
                onChange={(e) => setCurrentUser({ ...currentUser, address: e.target.value })} 
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
                value={currentUser?.isActive ? '1' : '0'} 
                onChange={(e) => setCurrentUser({ ...currentUser, isActive: e.target.value })} 
                className="border border-[#006532] p-2 rounded w-full"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div>
            {!currentUser?.id && (
              <div>
                <label className="block text-gray-700">Password:</label>
                <input 
                  type="text" 
                  value={currentUser?.password || ''} 
                  onChange={(e) => setCurrentUser({ ...currentUser, password: e.target.value })} 
                  className="border border-[#006532] p-2 rounded w-full"
                />
              </div>)}
          </div>
          <button 
            onClick={handleSaveUser} 
            className="bg-[#006532] hover:bg-[#005a2f] text-white px-4 py-2 mt-4 rounded shadow"
          >
            {currentUser?.id ? 'Save Changes' : 'Add User'}
          </button>
        </Modal>

        {/* Thanh tìm kiếm và bộ lọc */}
        <div className="flex items-center flex-col md:flex-row  mt-4 mb-3 px-6 py-3 bg-white border-2 rounded-lg shadow-custom-slate">
        <div className="flex items-center space-x-2 w-1/5 ">
          <div className='pr-4 mt-1 tablet:absolute tablet:mt-[148px] tablet:left-10 '>
            <input 
                    type="checkbox" 
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedUsers(sortedUsers.map(user => user.id));
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
                onChange={handleSearchChange} 
                className="border border-[#006532] p-2 rounded pl-3 w-full"
              />
              <FaSearch className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>
          <div className="flex items-center space-x-2 w-2/5 tablet:w-full justify-end">
            <select 
              value={filterRole} 
              onChange={handleRoleChange} 
              className="border border-[#006532] p-2 rounded"
            >
              <option value="">All Roles</option>
              <option value="employee">Employee</option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
           
            <select 
              value={filterStatus} 
              onChange={handleStatusChange} 
              className="border border-[#006532] p-2 rounded"
            >
              <option value="">All Status</option>
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto shadow-custom-slate">
          <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <thead className="bg-[#006532] text-white">
              <tr>
                <th className="py-3 pl-6 pr-3 text-left">
                  {/*  */}
                  <MdOutlineInbox />
                </th>
                <th className="py-3 text-left">STT </th> 
                <th className="py-3  px-6 w-1/6 text-left  hidden xl:table-cell">ID <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('id')}/></th>
                <th className="py-3 px-6 text-left hidden sm:table-cell">Họ Tên<FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('firstName')}/></th>
                <th className="py-3 px-6 text-left">Điện thoại<FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('phone')}/></th>
                <th className="py-3 px-6 text-left hidden md:table-cell ">Email <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('email')}/></th>
                <th className="py-3 px-6 text-left hidden xl:table-cell">Địa chỉ<FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('address')}/></th>
                <th className="py-3 px-6 text-left hidden sm:table-cell">Chức vụ <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('role')}/></th>
                <th className="py-3 px-6 text-left hidden lg:table-cell ">Trạng thái <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('isActive')}/></th>
                

                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
            {sortedUsers.length === 0 ? (
            <tr>
              <td colSpan="11" className="py-4 text-center">No users found.</td>
            </tr>
          ) : (
            sortedUsers.map((user, index) => (
              <tr key={user.id} className="border-b hover:bg-[#e0f7e0]">
                <td className="py-4 pl-6 pr-3">
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user.id)}
                    onChange={() => handleSelectUser(user.id)}
                  />
                </td>
                <td className="py-3">{(currentPage - 1) * usersPerPage + index + 1}</td>
                <td className="py-3 px-6 w-1/6 hidden xl:table-cell ">{user.id}</td>
                <td className="py-3 px-6 hidden sm:table-cell">{user.firstName} {user.lastName}</td>
                <td className="py-3 px-6">1234</td>
                <td className="py-3 px-6 hidden md:table-cell">{user.email}</td>
                <td className="py-3 px-6 hidden xl:table-cell">{user.address}</td>
                <td className="py-3 px-6 capitalize hidden sm:table-cell">{user.role}</td>
                <td className="py-3 px-6 hidden lg:table-cell">{user.isActive ? 'Active' : 'Inactive'}</td>
                
                <td className="py-3 px-6">
                  <div className="flex space-x-4">
                    <button onClick={() => handleViewUser(user)} className="text-blue-600 hover:text-blue-700">
                      <FaEye size={18} />
                    </button>
                    <button onClick={() => openUpdateModal(user)} className="text-[#006532] hover:text-[#005a2f]">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteUser(user.id)} className="text-gray-400 hover:text-red-500">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
            </tbody>
          </table>
        </div>
        {showViewPopup && currentUser && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-4 text-[#006532]">User: {currentUser.id}</h2>
              <p className="text-black"><strong className="text-[#006532]">firstname:</strong> {currentUser.firstName}</p>
              <p className="text-black"><strong className="text-[#006532]">lastname:</strong> {currentUser.lastName}</p>
              <p className="text-black"><strong className="text-[#006532]">Email:</strong> {currentUser.email}</p>
              <p className="text-black"><strong className="text-[#006532]">Phone:</strong> {currentUser.phone}</p>
              <p className="text-black"><strong className="text-[#006532]">Address:</strong> {currentUser.address}</p>
              <p className="text-black"><strong className="text-[#006532]">Role:</strong> {currentUser.role}</p>
              <p className="text-black"><strong className="text-[#006532]">Status:</strong> {currentUser.isActive ? 'Active' : 'Inactive'}</p>
              <p className="text-black"><strong className="text-[#006532]">Create Date:</strong> {currentUser.createdAt}</p>
              <p className="text-black"><strong className="text-[#006532]">Update Date:</strong> {currentUser.updatedAt}</p>
       
              <button 
                onClick={() => setShowViewPopup(false)} 
                className="mt-4 bg-[#006532] text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
        <div className="flex justify-center mt-4">
        {/* Hiển thị các nút phân trang */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-[#006532] text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'}`}
            disabled={index + 1 === currentPage} // Vô hiệu hóa nút hiện tại
          >
            {index + 1}
          </button>
        ))}
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




// const Modal = ({ children, showModal, setShowModal }) => (
//   showModal ? (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
//         {children}
//         <button onClick={() => setShowModal(false)} className="mt-4 ml-3 bg-red-600 text-white px-4 py-2 rounded">Close</button>
//       </div>
//     </div>
//   ) : null
// );

// const ManageUser = () => {
//   const [allUsers, setAllUsers] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterRole, setFilterRole] = useState('');
//   const [filterStatus, setFilterStatus] = useState('');
//   const [selectedUsers, setSelectedUsers] = useState([]);
//   const [showViewPopup, setShowViewPopup] = useState(false);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
  
//   const usersPerPage = 2; // Số lượng người dùng trên mỗi trang

//   useEffect(() => {
//     const fetchAllUsers = async () => {
//       const fetchedUsers = [];
//       let currentPage = 1;
//       let totalUsers = 0;

//       do {
//         const result = await getUsers(currentPage, usersPerPage);
//         if (result.success) {
//           fetchedUsers.push(...result.data.data);
//           totalUsers = result.data.total;
//           currentPage++;
//         } else {
//           console.error('Failed to fetch users:', result.message);
//           break;
//         }
//       } while (fetchedUsers.length < totalUsers);

//       setAllUsers(fetchedUsers);
//       setTotalPages(Math.ceil(totalUsers / usersPerPage));
//       setUsers(fetchedUsers.slice(0, usersPerPage));
//     };

//     fetchAllUsers();
//   }, []);

//   const sortedUsers = React.useMemo(() => {
//     let sortableUsers = [...users];
//     if (sortConfig.key) {
//       sortableUsers.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableUsers;
//   }, [users, sortConfig]);

//   const requestSort = key => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleSaveUser = () => {
//     if (currentUser.id) {
//       setUsers(users.map(user => 
//         user.id === currentUser.id ? { ...currentUser, updateDate: new Date().toISOString().split('T')[0] } : user
//       ));
//     } else {
//       const newUser = { ...currentUser, id: users.length + 1, createDate: new Date().toISOString().split('T')[0], updateDate: new Date().toISOString().split('T')[0] };
//       setUsers([...users, newUser]);
//     }
//     setShowModal(false);
//     setCurrentUser(null);
//   };

//   const handleDeleteUser = (id) => {
//     setUsers(users.filter(user => user.id !== id));
//   };

//   const handleDeleteSelectedUsers = () => {
//     setUsers(users.filter(user => !selectedUsers.includes(user.id)));
//     setSelectedUsers([]);
//   };

//   const openUpdateModal = (user) => {
//     setCurrentUser(user);
//     setShowModal(true);
//   };

//   const openAddModal = () => {
//     setCurrentUser({ firstname: '', lastname: '', email: '', role: 'customer', isActive: true });
//     setShowModal(true);
//   };

//   const handleSelectUser = (id) => {
//     if (selectedUsers.includes(id)) {
//       setSelectedUsers(selectedUsers.filter(userId => userId !== id));
//     } else {
//       setSelectedUsers([...selectedUsers, id]);
//     }
//   };

//   const handleViewUser = (user) => {
//     setCurrentUser(user);
//     setShowViewPopup(true);
//   };

//   useEffect(() => {
//     const filteredUsers = allUsers.filter(user => {
//       const matchesSearch = (
//         user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase())
//       );

//       const matchesRole = filterRole ? user.role === filterRole : true;
//       const matchesStatus = filterStatus ? user.isActive === (filterStatus === '1') : true;

//       return matchesSearch && matchesRole && matchesStatus;
//     });

//     setTotalPages(Math.ceil(filteredUsers.length / usersPerPage));

//     const startIndex = (currentPage - 1) * usersPerPage;
//     const endIndex = startIndex + usersPerPage;

//     setUsers(filteredUsers.slice(startIndex, endIndex));
//   }, [currentPage, searchTerm, allUsers, filterRole, filterStatus]);

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   return (
//     <>
//       <div className="flex items-center flex-col md:flex-row mt-4 mb-3 px-6 py-3 bg-white rounded-lg">
//         <div className="flex items-center space-x-2 w-1/5 ">
//           <div className='pr-4 mt-1 tablet:absolute tablet:mt-[148px] tablet:left-10 '>
//             <input 
//               type="checkbox" 
//               onChange={(e) => {
//                 if (e.target.checked) {
//                   setSelectedUsers(users.map(user => user.id));
//                 } else {
//                   setSelectedUsers([]);
//                 }
//               }}
//             />
//           </div>
//           <div className='tablet:mt-36 tablet:left-16 tablet:absolute'>
//             {selectedUsers.length > 0 && (
//               <FaTrash 
//                 onClick={handleDeleteSelectedUsers} 
//                 className='text-gray-400 hover:text-red-500' 
//               />
//             )}
//           </div>
//         </div>
//         <div className="flex items-center space-x-2 mb-2 md:mb-0 w-full md:w-2/5 ">
//           <div className="relative w-full ">
//             <input 
//               type="text" 
//               placeholder="Search by name" 
//               value={searchTerm}
//               onChange={handleSearchChange} 
//               className="border border-[#006532] p-2 rounded pl-3 w-full"
//             />
//             <FaSearch className="absolute right-3 top-3 text-gray-500" />
//           </div>
//         </div>
//         <div className="flex items-center space-x-2 w-2/5 tablet:w-full justify-end">
//           <select 
//             value={filterRole} 
//             onChange={(e) => setFilterRole(e.target.value)} 
//             className="border border-[#006532] p-2 rounded"
//           >
//             <option value="">All Roles</option>
//             <option value="employee">Employee</option>
//             <option value="admin">Admin</option>
//             <option value="customer">Customer</option>
//           </select>
//           <select 
//             value={filterStatus} 
//             onChange={(e) => setFilterStatus(e.target.value)} 
//             className="border border-[#006532] p-2 rounded"
//           >
//             <option value="">All Status</option>
//             <option value="1">Active</option>
//             <option value="0">Inactive</option>
//           </select>
//         </div>
//       </div>

//       <div className="overflow-x-auto ">
//         <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
//           <thead className="bg-[#006532] text-white">
//             <tr>
//               <th className="py-3 pl-6 pr-3 text-left">
//                 <MdOutlineInbox />
//               </th>
//               <th className="py-3 pr-6 text-left">STT</th> 
//               <th className="py-3 px-6 text-left hidden xl:table-cell">ID <FaSort className=" ml-1 cursor-pointer" onClick={() => requestSort('id')}/></th>
//               <th className="py-3 px-6 text-left hidden sm:table-cell">Name <FaSort className=" ml-1 cursor-pointer" onClick={() => requestSort('firstname')}/></th>
//               <th className="py-3 px-6 text-left">Phone <FaSort className=" ml-1 cursor-pointer" onClick={() => requestSort('email')}/></th>
//               <th className="py-3 px-6 text-left">Role <FaSort className=" ml-1 cursor-pointer" onClick={() => requestSort('role')}/></th>
//               <th className="py-3 px-6 text-left">Status <FaSort className=" ml-1 cursor-pointer" onClick={() => requestSort('isActive')}/></th>
//               <th className="py-3 pr-6 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {sortedUsers.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-3">No users found</td>
//               </tr>
//             ) : (
//               sortedUsers.map((user, index) => (
//                 <tr key={user.id}>
//                   <td className="py-3 pl-6 pr-3">
//                     <input type="checkbox" onChange={() => handleSelectUser(user.id)} checked={selectedUsers.includes(user.id)} />
//                   </td>
//                   <td className="py-3 pr-6">{(currentPage - 1) * usersPerPage + index + 1}</td>
//                   <td className="py-3 px-6 hidden xl:table-cell">{user.id}</td>
//                   <td className="py-3 px-6 hidden sm:table-cell">{user.firstname} {user.lastname}</td>
//                   <td className="py-3 px-6">{user.email}</td>
//                   <td className="py-3 px-6">{user.role}</td>
//                   <td className="py-3 px-6">{user.isActive ? 'Active' : 'Inactive'}</td>
//                   <td className="py-3 pr-6 flex justify-end space-x-2">
//                     <FaEye onClick={() => handleViewUser(user)} className="cursor-pointer text-gray-500 hover:text-blue-500" />
//                     <FaEdit onClick={() => openUpdateModal(user)} className="cursor-pointer text-gray-500 hover:text-yellow-500" />
//                     <FaTrash onClick={() => handleDeleteUser(user.id)} className="cursor-pointer text-gray-500 hover:text-red-500" />
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       <div className="flex justify-between mt-4">
//         <button 
//           onClick={openAddModal} 
//           className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//         >
//           Add User
//         </button>
//         <div className="flex space-x-2">
//           {Array.from({ length: totalPages }, (_, index) => (
//             <button 
//               key={index + 1} 
//               onClick={() => handlePageChange(index + 1)} 
//               className={`px-3 py-2 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'bg-white text-green-500'}`}
//             >
//               {index + 1}
//             </button>
//           ))}
//         </div>
//       </div>

//       <Modal showModal={showModal} setShowModal={setShowModal}>
//         <h2 className="text-xl font-bold mb-4">{currentUser?.id ? 'Update User' : 'Add User'}</h2>
//         <div>
//           <label className="block mb-1">First Name</label>
//           <input 
//             type="text" 
//             value={currentUser?.firstname} 
//             onChange={(e) => setCurrentUser({ ...currentUser, firstname: e.target.value })} 
//             className="border border-gray-300 p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Last Name</label>
//           <input 
//             type="text" 
//             value={currentUser?.lastname} 
//             onChange={(e) => setCurrentUser({ ...currentUser, lastname: e.target.value })} 
//             className="border border-gray-300 p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Email</label>
//           <input 
//             type="email" 
//             value={currentUser?.email} 
//             onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} 
//             className="border border-gray-300 p-2 w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1">Role</label>
//           <select 
//             value={currentUser?.role} 
//             onChange={(e) => setCurrentUser({ ...currentUser, role: e.target.value })} 
//             className="border border-gray-300 p-2 w-full"
//           >
//             <option value="customer">Customer</option>
//             <option value="admin">Admin</option>
//             <option value="employee">Employee</option>
//           </select>
//         </div>
//         <div>
//           <label className="block mb-1">Status</label>
//           <select 
//             value={currentUser?.isActive ? '1' : '0'} 
//             onChange={(e) => setCurrentUser({ ...currentUser, isActive: e.target.value === '1' })} 
//             className="border border-gray-300 p-2 w-full"
//           >
//             <option value="1">Active</option>
//             <option value="0">Inactive</option>
//           </select>
//         </div>
//         <button 
//           onClick={handleSaveUser} 
//           className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600"
//         >
//           {currentUser?.id ? 'Update' : 'Add'}
//         </button>
//       </Modal>

//       {showViewPopup && (
//         <Modal showModal={showViewPopup} setShowModal={setShowViewPopup}>
//           <h2 className="text-xl font-bold mb-4">User Details</h2>
//           <p><strong>First Name:</strong> {currentUser?.firstname}</p>
//           <p><strong>Last Name:</strong> {currentUser?.lastname}</p>
//           <p><strong>Email:</strong> {currentUser?.email}</p>
//           <p><strong>Role:</strong> {currentUser?.role}</p>
//           <p><strong>Status:</strong> {currentUser?.isActive ? 'Active' : 'Inactive'}</p>
//         </Modal>
//       )}
//     </>
//   );
// };

// export default ManageUser;
