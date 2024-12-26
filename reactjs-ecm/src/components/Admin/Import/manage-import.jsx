import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AdminHeader from "../AdminHeader/admin-header.jsx";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaEye,
  FaSort,
} from "react-icons/fa";
import { MdOutlineInbox } from "react-icons/md";
import {
  getImportPrs,
  deleteImportPr,
  updateImportPr,
  createImportPr,
} from "../../../services/import-product-service.js";
import {
  showNotification,
  notificationTypes,
  NotificationList,
} from "../../Notification/NotificationService.jsx";
import NotificationHandler from "../../Notification/notification-handle.jsx";
import { getUserId, getToken } from "../../../util/auth-local.js";
import { fetchProducts } from "../../../services/product-service.js";

const Modal = ({ children, showModal, setShowModal }) =>
  showModal ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="shadow-lg w-1/2 rounded-lg bg-white p-6">
        {children}
        <button
          onClick={() => setShowModal(false)}
          className="ml-3 mt-4 rounded bg-red-600 px-4 py-2 text-white"
        >
          Close
        </button>
      </div>
    </div>
  ) : null;

const ManageImport = () => {
  const {
    currentPage: paramCurrentPage,
    importPrsPerPage: paramImportPrsPerPage,
  } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const [importPrs, setImportPrs] = useState([]);
  const [allImportPrs, setAllImportPrs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [currentImportPr, setCurrentImportPr] = useState({
    total_amount: "",
    user_id: "",
    importProducts: [{ product_id: "", quantity: "", price_in: "" }],
  });

  const [selectedImportPrs, setSelectedImportPrs] = useState([]);
  const [showViewPopup, setShowViewPopup] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const importPrsPerPage = parseInt(paramImportPrsPerPage) || 4;
  const currentPage = parseInt(paramCurrentPage) || 1;
  const [totalPages, setTotalPages] = useState(1);
  const [locations, setLocations] = useState({});
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [importPrToDelete, setImportPrToDelete] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [showConfirmPopupMulti, setShowConfirmPopupMulti] = useState(false);
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    const fetchImportPrs = async () => {
      const fetchedImportPrs = [];
      let page = 1;
      let totalImportPrs = 0;
      try {
        do {
          const result = await getImportPrs(page, importPrsPerPage);
          if (result.success) {
            fetchedImportPrs.push(...result.data.list);
            totalImportPrs = result.data.total;
            page++;
          } else {
            throw new Error(result.message);
          }
        } while (fetchedImportPrs.length < totalImportPrs);

        setAllImportPrs(fetchedImportPrs);
        setTotalPages(Math.ceil(totalImportPrs / importPrsPerPage));
        setImportPrs(
          fetchedImportPrs.slice(
            (currentPage - 1) * importPrsPerPage,
            currentPage * importPrsPerPage,
          ),
        );
      } catch (error) {
        console.error("Failed to fetch importPrs:", error);
        sessionStorage.setItem(
          "notification",
          JSON.stringify({
            message: "Lỗi trong quá trình xử lý!",
            type: notificationTypes.ERROR,
          }),
        );
      }
    };

    fetchImportPrs();
  }, [currentPage, importPrsPerPage]);

  const sortedImportPrs = React.useMemo(() => {
    let sortableImportPrs = [...importPrs];
    if (sortConfig.key) {
      sortableImportPrs.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableImportPrs;
  }, [importPrs, sortConfig]);

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handlePageChange = (page) => {
    const queryParams = new URLSearchParams();
    navigate(
      `/admin/manage-import/${page}/${importPrsPerPage}?${queryParams.toString()}`,
    );
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const productsData = await fetchProducts(1, 10); // Kiểm tra API có dữ liệu trả về
        setProductList(productsData.products || []); // Đảm bảo là mảng
        console.log(productList);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  const openAddModal = () => {
    setCurrentImportPr({
      total_amount: "",
      user_id: "",
      importProducts: [{ product_id: "", quantity: "", price_in: "" }],
    });
    setShowAddPopup(true);
  };
  const handleAddProductField = () => {
    if (!currentImportPr.importProducts) {
      setCurrentImportPr({
        ...currentImportPr,
        importProducts: [{ product_id: "", quantity: "", price_in: "" }],
      });
    } else {
      setCurrentImportPr({
        ...currentImportPr,
        importProducts: [
          ...currentImportPr.importProducts,
          { product_id: "", quantity: "", price_in: "" },
        ],
      });
    }
  };

  const handleDeleteProductField = (index) => {
    const updatedProducts = currentImportPr.importProducts.filter(
      (_, i) => i !== index,
    );
    setCurrentImportPr({ ...currentImportPr, importProducts: updatedProducts });
  };

  const handleSaveImportPr = async () => {
    try {
      // Chuẩn bị dữ liệu importPrData
      const userId = getUserId();
      const importPrData = {
        totalAmount: parseFloat(currentImportPr.total_amount), // Chuyển sang số
        user_id: userId, // user_id trong API của bạn
        products: currentImportPr.importProducts.map((product) => ({
          product_id: product.product_id,
          quantity: product.quantity,
          price_in: product.price_in,
        })),
      };

      // Kiểm tra dữ liệu trước khi gửi
      console.log("ImportPrData:", importPrData);
      await createImportPr(importPrData);
    } catch (error) {
      console.error("Error in handleSaveImportPr:", error);
    }
  };

  const handleDeleteImportPr = async (importPrId) => {
    try {
      const adminID = getUserId();
      console.log(adminID);
      await Promise.all([
        deleteImportPr(adminID, importPrId),
        // deleteLocationImportPr(adminID,importPrId)
      ]);

      sessionStorage.setItem(
        "notification",
        JSON.stringify({
          message: "Xóa đơn nhập hàng thành công!",
          type: notificationTypes.SUCCESS,
        }),
      );
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete importPr or importPr location:", error);

      sessionStorage.setItem(
        "notification",
        JSON.stringify({
          message: "Xóa không thành công.",
          type: notificationTypes.ERROR,
        }),
      );
      window.location.reload();
    }
  };

  const handleDeleteSelectedImportPrs = async () => {
    try {
      const adminID = getUserId();
      await Promise.all(
        selectedImportPrs.map((importPrId) =>
          Promise.all([
            deleteImportPr(adminID, importPrId),
            // deleteLocationImportPr(adminID, importPrId)
          ]),
        ),
      );

      sessionStorage.setItem(
        "notification",
        JSON.stringify({
          message: "Xóa đơn nhập hàng thành công!",
          type: notificationTypes.SUCCESS,
        }),
      );
      window.location.reload();
    } catch (error) {
      console.error(
        "Failed to delete selected importPrs or their locations:",
        error,
      );

      sessionStorage.setItem(
        "notification",
        JSON.stringify({
          message: "Xóa không thành công.",
          type: notificationTypes.ERROR,
        }),
      );
      window.location.reload();
    }
  };

  //   const handleDeleteClick = (importPrId) => {
  //     setImportPrToDelete(importPrId);
  //     setShowConfirmPopup(true);
  //   };

  const confirmDelete = () => {
    handleDeleteImportPr(importPrToDelete);
    setShowConfirmPopup(false);
  };

  const cancelDelete = () => {
    setShowConfirmPopup(false);
    setImportPrToDelete(null);
  };

  //   const handleMultiDeleteClick = () => {
  //     setShowConfirmPopupMulti(true);
  //   };

  const confirmMultiDelete = () => {
    handleDeleteSelectedImportPrs();
    setShowConfirmPopupMulti(false);
  };

  const cancelMultiDelete = () => {
    setShowConfirmPopupMulti(false);
  };

  //   const handleSelectImportPr = (id) => {
  //     if (selectedImportPrs.includes(id)) {
  //       setSelectedImportPrs(selectedImportPrs.filter(importPrId => importPrId !== id));
  //     } else {
  //       setSelectedImportPrs([...selectedImportPrs, id]);
  //     }
  //   };

  const handleViewImportPr = (importPr) => {
    setCurrentImportPr({
      ...importPr,
    });
    setShowViewPopup(true);
  };

  const renderPagination = () => {
    const visiblePages = 5; // Hiển thị tối đa 5 trang

    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);

    return (
      <div id="pagination" className="section-p1">
        {currentPage > 1 && (
          <button
            className="page mx-1 rounded bg-gray-200 p-2"
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Trước
          </button>
        )}
        {[...Array(endPage - startPage + 1)].map((_, index) => (
          <a
            key={startPage + index}
            data-page={startPage + index}
            className={`page ${
              currentPage === startPage + index
                ? "active bg-[#006532] text-white"
                : "bg-gray-200"
            } mx-1 rounded p-2`}
            onClick={() => handlePageChange(startPage + index)}
          >
            {startPage + index}
          </a>
        ))}
        {currentPage < totalPages && (
          <button
            className="page mx-1 rounded bg-gray-200 p-2"
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Tiếp
          </button>
        )}
      </div>
    );
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="fixed z-50 space-y-3">
        <NotificationList notifications={notifications} />
      </div>
      <NotificationHandler setNotifications={setNotifications} />
      <AdminHeader />
      {showAddPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative max-h-full w-11/12 overflow-y-auto rounded-lg bg-white p-8 md:w-3/4 lg:w-1/2">
            <h2 className="mb-4 text-2xl font-bold">Thêm đơn nhập hàng</h2>
            <div className="-mx-2 mb-4 flex flex-wrap">
              <div className="mb-4 w-full px-2 md:w-1/2">
                <label className="mb-2 block">Tổng số lượng:</label>
                <input
                  type="number"
                  value={currentImportPr.total_amount}
                  onChange={(e) =>
                    setCurrentImportPr({
                      ...currentImportPr,
                      total_amount: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border px-4 py-2"
                />
              </div>
            </div>
            <h3 className="mb-4 mt-4 text-xl font-bold">Sản phẩm</h3>
            {currentImportPr.importProducts.map((product, index) => (
              <div key={index} className="-mx-2 mb-4 flex flex-wrap">
                <div className="mb-4 w-full px-2 md:w-1/2">
                  <label className="mb-2 block">Tên sản phẩm:</label>
                  <select
                    value={product.product_id || ""} // Ensure that `product.product_id` is being accessed properly
                    onChange={(e) => {
                      const updatedProducts =
                        currentImportPr.importProducts.map((p, i) =>
                          i === index
                            ? { ...p, product_id: e.target.value }
                            : p,
                        );
                      setCurrentImportPr({
                        ...currentImportPr,
                        importProducts: updatedProducts,
                      });
                    }}
                    className="w-full rounded-lg border px-4 py-2"
                  >
                    <option value="">Chọn sản phẩm</option>
                    {productList.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 w-full px-2 md:w-1/2">
                  <label className="mb-2 block">Số lượng:</label>
                  <input
                    type="number"
                    value={product.quantity}
                    onChange={(e) => {
                      const updatedProducts =
                        currentImportPr.importProducts.map((p, i) =>
                          i === index ? { ...p, quantity: e.target.value } : p,
                        );
                      setCurrentImportPr({
                        ...currentImportPr,
                        importProducts: updatedProducts,
                      });
                    }}
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>

                <div className="mb-4 w-full px-2 md:w-1/2">
                  <label className="mb-2 block">Giá nhập:</label>
                  <input
                    type="number"
                    value={product.price_in}
                    onChange={(e) => {
                      const updatedProducts =
                        currentImportPr.importProducts.map((p, i) =>
                          i === index ? { ...p, price_in: e.target.value } : p,
                        );
                      setCurrentImportPr({
                        ...currentImportPr,
                        importProducts: updatedProducts,
                      });
                    }}
                    className="w-full rounded-lg border px-4 py-2"
                  />
                </div>
                <div className="mb-4 w-full px-2 md:w-1/2">
                  <label className="mb-2 block"></label>
                  <button
                    onClick={() => handleDeleteProductField(index)} // Thêm index vào đây
                    className="mt-6 rounded-lg px-4 py-2 text-white"
                  >
                    <FaTrash className="text-2xl text-red-600 hover:text-[#bcc3bf]" />{" "}
                    {/* Hiển thị biểu tượng xóa */}
                  </button>
                </div>
              </div>
            ))}

      <button
        onClick={handleAddProductField}
        className="bg-[#006532] text-white px-4 py-2 rounded-lg hover:bg-[#004f29] mb-4"
      >
        Thêm sản phẩm
      </button>
      <div className="flex justify-end space-x-4">
        <button
          onClick={ handleSaveImportPr}
          className="bg-[#006532] text-white px-4 py-2 rounded-lg hover:bg-[#004f29]"
        >
          Lưu
        </button>
        <button
          onClick={() => setShowAddPopup(false)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
        >
          Hủy
        </button>
      </div>
    </div>
  </div>
)}
      <div className="w-5/6 p-4 ml-[260px]">
        <h1 className="text-4xl font-bold mb-8 mt-4 text-[#006532] text-start">Quản lý đơn nhập hàng</h1>

        {/* Thanh tìm kiếm và bộ lọc */}
        <div className="mb-3 mt-4 flex flex-col items-center rounded-lg border-2 bg-white px-6 py-3 shadow-custom-slate md:flex-row">
          <div className="flex w-1/5 items-center space-x-2">
            <div className="mt-1 pr-4 tablet:absolute tablet:left-10 tablet:mt-[148px]">
              <input
                type="checkbox"
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedImportPrs(
                      sortedImportPrs.map((importPr) => importPr.id),
                    );
                  } else {
                    setSelectedImportPrs([]);
                  }
                }}
              />
            </div>
            <div className="tablet:absolute tablet:left-16 tablet:mt-36">
              {selectedImportPrs.length > 0 && (
                <FaTrash
                  // onClick={handleMultiDeleteClick}
                  className="text-gray-400 hover:text-red-500"
                />
              )}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto shadow-custom-slate">
          <table className="shadow-lg min-w-full overflow-hidden rounded-lg bg-white">
            <thead className="bg-[#006532] text-white">
              <tr>
                <th className="py-3 pl-6 pr-3 text-left">
                  {/*  */}
                  <MdOutlineInbox />
                </th>
                <th className="py-3 text-left">STT </th> 
                <th className="py-3  px-6 text-left">Mã đơn</th> 
                <th className="py-3 px-6 text-left">Ngày tạo <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('createdAt')}/></th>
                <th className="py-3 px-6 text-left">Tổng số tiền <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('total_amount')}/></th>
                <th className="py-3 px-6 text-left">Tên nhân viên <FaSort className="inline ml-1 cursor-pointer" onClick={() => requestSort('employee_id')}/></th>
                <th className="py-3 px-6 text-left">Hành động</th>
              </tr>
            </thead>
            <tbody>
            {sortedImportPrs.length === 0 ? (
            <tr>
              <td colSpan="11" className="py-4 text-center">No importPrs found.</td>
            </tr>
          ) : (
            sortedImportPrs.map((importPr, index) => (
              <tr key={importPr.id} className="border-b hover:bg-[#e0f7e0]">
                <td className="py-4 pl-6 pr-3">
                  <input
                    type="checkbox"
                    checked={selectedImportPrs.includes(importPr.id)}
                    // onChange={() => handleSelectImportPr(importPr.id)}
                  />
                </td>
                <td className="py-3">{(currentPage - 1) * importPrsPerPage + index + 1}</td>
                <td className="py-3 px-6">{importPr.import_code}</td>
                <td className="py-3 px-6 w-1/6 hidden xl:table-cell "> {(() => {
                    const date = new Date(importPr.createdAt);
                    const time = date.toLocaleTimeString('vi-VN', { hour12: false });
                    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    return `${time} ${formattedDate}`;
                  })()}</td>
                  <td className="py-4 px-6">{importPr.total_amount}</td>
                  <td className="py-4 px-6">{importPr.employee_id}</td>
                <td className="py-3 px-6">
                  <div className="flex space-x-4">
                    <button onClick={() => handleViewImportPr(importPr)} className="text-blue-600 hover:text-blue-700">
                      <FaEye size={18} />
                    </button>
                    {/* <button onClick={() => openUpdateModal(importPr)} className="text-[#006532] hover:text-[#005a2f]">
                      <FaEdit />
                    </button> */}
                        {/* <button onClick={() => handleDeleteClick(importPr.id)} className="text-gray-400 hover:text-red-500">
                      <FaTrash />
                    </button> */}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {showViewPopup && currentImportPr && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="w-1/2 rounded-lg bg-white p-8">
              <h2 className="mb-4 text-2xl font-bold">Chi tiết đơn nhập</h2>
              <div className="mb-4">
                <p>
                  <strong>ID:</strong> {currentImportPr.id}
                </p>
                <p>
                  <strong>Tổng số tiền:</strong> {currentImportPr.total_amount}
                </p>
                <p>
                  <strong>Tên nhân viên:</strong>{" "}
                  {currentImportPr.employee_name}
                </p>
                <p>
                  <strong>Ngày tạo:</strong> {currentImportPr.createdAt}
                </p>
                <h3 className="mt-4 text-xl font-bold">Sản phẩm</h3>
                <table className="shadow-lg mt-4 min-w-full overflow-hidden rounded-lg bg-white">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left">Tên sản phẩm</th>
                      <th className="px-4 py-2 text-left">Số lượng</th>
                      <th className="px-4 py-2 text-left">Giá nhập</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentImportPr.importProducts.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{product.id}</td>
                        <td className="px-4 py-2">{product.quantity}</td>
                        <td className="px-4 py-2">{product.price_in}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setShowViewPopup(false)}
                className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
        {showConfirmPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="shadow-lg rounded bg-white p-6">
              <h2 className="mb-4 text-xl">
                Bạn có chắc chắn muốn xóa đơn nhập hàng này?
              </h2>
              <div className="flex justify-end">
                <button
                  onClick={cancelDelete}
                  className="mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmDelete}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
        {showConfirmPopupMulti && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="shadow-lg rounded bg-white p-6">
              <h2 className="mb-4 text-xl">
                Bạn có chắc chắn muốn xóa các đơn nhập hàng này?
              </h2>
              <div className="flex justify-end">
                <button
                  onClick={cancelMultiDelete}
                  className="mr-2 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
                >
                  Hủy
                </button>
                <button
                  onClick={confirmMultiDelete}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-700"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        )}
        {/* <div className="flex justify-center mt-4"> */}
        {/* Hiển thị các nút phân trang */}
        {/* {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${index + 1 === currentPage ? 'bg-[#006532] text-white' : 'bg-gray-200 text-gray-800 hover:bg-blue-200'}`}
            disabled={index + 1 === currentPage} // Vô hiệu hóa nút hiện tại
          >
            {index + 1}
          </button>
        ))} */}
        {/* </div> */}
        <section
          id="pagination"
          className="section-p1 flex justify-center space-x-2"
        >
          <div className="mb-4 mt-2 flex justify-center">
            {renderPagination()}
          </div>
        </section>
        <div className="mt-6 flex justify-end">
          <button
            onClick={openAddModal}
            className="shadow-lg fixed bottom-4 right-4 flex items-center justify-center rounded-full bg-[#006532] p-4 text-white hover:bg-[#005a2f]"
          >
            <FaPlus size={24} /> {/* Icon nút */}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageImport;
