import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader/admin-header.jsx";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaFilter } from "react-icons/fa";
import { createSupplier,deleteSuppliers,deleteSupplier, getSupplier,updateSupplier,} from "../../../services/supplier-service.js";
import { authLocal } from "../../../util/auth-local.js";
import { uploadImage } from "../../../services/image-service.js";
import { ClipLoader } from 'react-spinners';

const Modal = ({ children, showModal, setShowModal }) =>
  showModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="shadow-lg rounded-lg bg-white p-6">
        {children}
        <button
          onClick={() => setShowModal(false)}
          className="ml-4 mt-4 rounded bg-red-500 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  ) : null;

const ManageSupplier = () => {
  const { page: paramPage, limit: paramLimit } = useParams(); 
  const navigate = useNavigate(); // Hook điều hướng
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({
    name: "",
    image: "",
    phone: "",
    address: "",

  });
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [page, setPage] = useState(Number(paramPage) || 1);
  const [limit, setLimit] = useState(Number(paramLimit) || 4);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchSuppliers = async () => {
    const response = await getSupplier(page, limit);
    if (response.success) {
      setSuppliers(response.data.data); 
      setTotalPages(Math.ceil(response.data.total / limit));
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, [page, limit, showModal]);

  useEffect(() => {
    navigate(`/manage-supplier/${page}/${limit}`); 
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSupplier({ ...newSupplier, [name]: value });
  };


  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    setLoading(true); 
    if (files.length > 0) {
      try {
  
        const response = await uploadImage(files[0]); 
        if (response && Array.isArray(response) && response.length > 0) {
          
          setNewSupplier({ ...newSupplier, [name]: response[0] }); 
          console.log("Uploaded image URL:", response[0]); 
        } else {
          console.error("No URL returned from the server.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }finally {
        setLoading(false); 
      }
    }
  };
  
  const addSupplier = async (supplierData) => {

    try {
      const response = await createSupplier(supplierData);
      if (response.success) {
        setSuppliers([...suppliers, response.data]);
        setShowModal(false);
        setNewSupplier({
          name: "",
          image: "",
          phone: "",
          address: "",
        }); 
      }
    } catch (error) {
      console.error("Failed to add supplier:", error);
      
    }
  };
  
  const handleAddSupplier = () => {
    if (!newSupplier.image) {
      console.error("Image is required for adding supplier.");
      return; 
    }
    addSupplier(newSupplier);
  };

  const updateOneSupplier = async (supplierData) => {
    const supplierId = supplierData.id; 
    console.log(supplierId);
    try {
      const response = await updateSupplier(supplierId, supplierData);
      if (response.success) {
    
        setSuppliers((prevSuppliers) =>
          prevSuppliers.map((supplier) =>
            supplier.id === supplierData.id ? response.data : supplier
          ),
        );
        setEditingSupplier(null); 
        setShowModal(false); 
      }
    } catch (error) {
      console.error("Failed to update supplier:", error);
    }
  };
  
  const handleUpdateSupplier = () => {
    if (editingSupplier) {
      if (!newSupplier.image) {
        console.error("Image is required for updating supplier.");
        return; // Nếu không có ảnh, không thực hiện cập nhật
      }
  
      newSupplier.id = editingSupplier.id; 
      console.log(newSupplier);
      updateOneSupplier(newSupplier); 
  

      setNewSupplier({
        name: "",
        image: "",
        phone: "",
        address: "",
        id: "", 
      });
    }
  };
  
  const deleteOneSupplier = async (id) => {
    const response = await deleteSupplier(id);
    if (response.success) {
      setSuppliers(suppliers.filter((supplier) => supplier.id !== id));
    }
  };

  const handleDeleteSupplier = (id) => {
    deleteOneSupplier(id);
    window.location.reload();
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier(supplier);
    setNewSupplier(supplier);
    setShowModal(true);
  };


  
  const handleSelectSupplier = (id) => {
    if (selectedSuppliers.includes(id)) {
      setSelectedSuppliers(
        selectedSuppliers.filter((cateId) => cateId !== id),
      );
    } else {
      setSelectedSuppliers([...selectedSuppliers, id]);
    }
  };

  const deleteSelectedSuppliers = async () => {
    try {
      await Promise.all(
        selectedSuppliers.map((id) => deleteSuppliers(id)),
      );
      setSuppliers(
        suppliers.filter(
          (supplier) => !selectedSuppliers.includes(supplier.id),
        ),
      );
      setSelectedSuppliers([]);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting selected suppliers:", error);
    }
  };

  const handleDeleteSelectedSuppliers = () => {
    deleteSelectedSuppliers();
  };

  // Hàm lọc danh sách suppliers
  const filteredSuppliers = suppliers.filter((supplier) => {
    if (!supplier.name) return false;

    const matchesSearch = supplier.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="p-4 lg:mx-12">
      <h1 className="mb-8 mt-4 text-center text-4xl font-bold text-[#006532]">
          Manage Suppliers
        </h1>

        <Modal showModal={showModal} setShowModal={setShowModal}>
          <h2 className="mb-4 text-2xl font-semibold text-[#006532]">
            {editingSupplier ? "Update Supplier" : "Add New Supplier"}
          </h2>
          {loading && (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-gray-900 bg-opacity-50">
              <ClipLoader color="#006532" size={50} loading={loading} />
            </div>
            )}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <input
              type="text"
              name="name"
              value={newSupplier.name}
              onChange={handleInputChange}
              placeholder="Supplier Name"
              className="rounded border p-2"
            />
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="rounded border p-2"
            />
            
            <input
              type="text"
              name="phone"
              value={newSupplier.phone}
              onChange={handleInputChange}
              placeholder="Supplier Phone"
              className="rounded border p-2"
            />
            
            <input
              type="text"
              name="address"
              value={newSupplier.address}
              onChange={handleInputChange}
              placeholder="Supplier Address"
              className="rounded border p-2"
            />
          </div>
          <button
            onClick={editingSupplier ? handleUpdateSupplier : handleAddSupplier}
            className="shadow mt-4 rounded bg-[#006532] px-4 py-2 text-white hover:bg-[#005a2f]"
          >
            {editingSupplier ? "Update Supplier" : "Add Supplier"}
          </button>
        </Modal>

        {/* Thanh tìm kiếm và lọc */}
        <div className="mb-3 mt-4 flex flex-col justify-between rounded-lg bg-white px-6 py-3 md:flex-row">
          <div className="flex w-1/5 items-center space-x-2">
            <div className="mt-1 pr-4 tablet:absolute tablet:left-10 tablet:mt-[148px]">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedSuppliers(
                      suppliers.map((supplier) => supplier.id),
                    );
                  } else {
                    setSelectedSuppliers([]);
                  }
                }}
              />
            </div>
            <div className="tablet:absolute tablet:left-16 tablet:mt-36">
              {selectedSuppliers.length > 0 && (
                <FaTrash
                  onClick={handleDeleteSelectedSuppliers}
                  className="text-gray-400 hover:text-red-500"
                />
              )}
            </div>
          </div>
          <div className="mb-2 flex w-full items-center space-x-2 md:mb-0 md:w-2/5">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-[#00653287] px-4 py-2"
              />
              <FaSearch className="absolute right-4 top-3 text-gray-400" />
            </div>
          </div>
         
        </div>

        <div>
          <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="shadow-md rounded-lg border border-t-4 border-[#e0e0e0] border-t-[#006532] bg-white p-6 transition-shadow duration-300 ease-in-out hover:shadow-custom-dark"
              >
                <h3 className="mb-2 text-xl font-semibold text-[#006532]">
                  {supplier.name}
                </h3>
                <p className="mb-2 text-gray-600">
                  <strong>Avatar:</strong>{" "}
                  <img
                    src={supplier.image}
                    alt={supplier.name}
                    className="h-16 w-16 rounded"
                  />
                </p>
                <p className="mb-2 text-gray-600">
                  <strong>Phone:</strong> {supplier.phone}
                </p>
                <p className="mb-2 text-gray-600">
                  <strong>Address:</strong>{supplier.address}</p>

              
                <div className="mt-4 flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedSuppliers.includes(supplier.id)}
                    onChange={() => handleSelectSupplier(supplier.id)}
                    className="mt-[2px] size-[14px]"
                  />
                  <button
                    onClick={() => handleEditSupplier(supplier)}
                    className="rounded py-1 pl-1 text-[#006532] hover:text-[#56bb89]"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteSupplier(supplier.id)}
                    className="rounded py-1 pl-1 text-red-700 hover:text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nút phân trang */}
        <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 rounded px-3 py-1 ${
              index + 1 === page
                ? "bg-[#006532] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-blue-200"
            }`}
            disabled={index + 1 === page}
          >
            {index + 1}
          </button>
        ))}
      </div>

        <button
          onClick={() => {
            setNewSupplier({
              name: "",
              image: "",
              phone: "",
              address: "",
        
            });
            setEditingSupplier(null);
            setShowModal(true);
          }}
          className="shadow-lg fixed bottom-10 right-10 rounded-full bg-[#006532] p-4 text-white transition-colors duration-300 hover:bg-[#4d9d75]"
        >
          <FaPlus size={24} />
        </button>
      </div>
    </div>
  );
};

export default ManageSupplier;