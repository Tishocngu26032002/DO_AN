import AdminHeader from "../AdminHeader/admin-header.jsx";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { uploadImage } from "../../../services/image-service.js";
import {
  fetchProducts,
  searchProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../../../services/product-service.js";
import { getCategory } from "../../../services/category-service.js";
import { getSupplier } from "../../../services/supplier-service.js";
import { notificationTypes } from "../../Notification/NotificationService.jsx";

const ManageProduct = () => {
  const { currentPage: pageParam, productsPerPage: perPageParam } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    priceout: "",
    banner: "",
    category_id: "",
    supplier_id: "",
    url_image: "",
    description: "",
    stockQuantity: "",
    weight: "",
    expire_date: "",
  });
  const [filterCategory, setFilterCategory] = useState("");
  const [category, setCategory] = useState([]);
  const [supplier, setSupplier] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [searchQuery, setSearchQuery] = useState({
    name: "",
    category: "",
  });
  const [searchMode, setSearchMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalProducts, setTotalProducts] = useState();
  const [loading, setLoading] = useState(false);
  const currentPage = parseInt(pageParam) || 1;
  const productsPerPage = parseInt(perPageParam) || 8;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await getCategory(1, 20);
        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const loadSupplier = async () => {
      try {
        const response = await getSupplier(1, 20);
        setSupplier(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    loadSupplier();
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        if (!searchMode) {
          const { products: productsData, totalProducts } = await fetchProducts(
            currentPage,
            productsPerPage,
          );
          setProducts(productsData || []);
          console.log("productsDataa", productsData);
          setFilteredProducts(productsData || []);
          setTotalProducts(totalProducts);
        }
      } catch (error) {
        console.error("Error loading products:", error);
      }
    };
    loadProducts();
  }, [currentPage, productsPerPage, searchMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formattedForm = {
        ...form,
        expire_date: form.expire_date
          ? new Date(form.expire_date).toISOString().split("T")[0]
          : "",
      };

      // Nếu có ảnh (url_image) trong form thì sử dụng trực tiếp, không cần gọi API upload ảnh nữa
      // if (!form.url_images) {
      // Nếu không có ảnh thì có thể xử lý các công việc khác như thông báo hoặc xử lý lỗi
      // Bạn có thể thêm mã xử lý logic nếu cần
      // console.warn("No image provided.");
      // }

      // Tiến hành thêm hoặc chỉnh sửa sản phẩm
      if (editMode) {
        await editProduct(editId, formattedForm);
        window.location.reload(); // Reload lại trang sau khi cập nhật
        setProducts(
          products.map((product) =>
            product.id === editId ? { ...formattedForm, id: editId } : product,
          ),
        );
        setEditMode(false);
        setEditId(null);
      } else {
        const newProduct = await addProduct(formattedForm);
        window.location.reload(); // Reload lại trang sau khi thêm mới sản phẩm
        setProducts([...products, newProduct]);
      }

      // Reset form sau khi hoàn tất thao tác
      setForm({
        name: "",
        priceout: "",
        banner: "",
        category_id: "",
        supplier_id: "",
        url_image: "",
        description: "",
        stockQuantity: "",
        weight: "",
        expire_date: "",
      });
      setIsModalOpen(false);
      handleFilter(filterCategory); // Giữ nguyên tính năng lọc sau khi thao tác
    } catch (error) {
      console.error("Error saving product:", error);
      sessionStorage.setItem(
        "notification",
        JSON.stringify({
          message: "Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại",
          type: notificationTypes.ERROR,
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    const { name, files } = e.target;
    setLoading(true);
    if (files.length > 0) {
      try {
        const response = await uploadImage(files[0]);
        if (response && Array.isArray(response) && response.length > 0) {
          response[0] = JSON.stringify(response[0]);
          if (response[0].startsWith('"') && response[0].endsWith('"')) {
            response[0] = response[0].slice(1, -1); // Loại bỏ dấu ngoặc kép
          }
          setForm({ ...form, [name]: response[0] });
          console.log("Uploaded image URL:", response[0]);
        } else {
          console.error("No URL returned from the server.");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        sessionStorage.setItem(
          "notification",
          JSON.stringify({
            message: "Lỗi trong quá trình thêm ảnh. Vui lòng thử lại",
            type: notificationTypes.ERROR,
          }),
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFilter = (categoryId) => {
    setFilterCategory(categoryId);
    setSearchMode(false);
    if (categoryId) {
      setFilteredProducts(
        products.filter((product) => product.category_id === categoryId),
      );
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    const filters = {
      ...(searchQuery.name && { name: searchQuery.name }),
      ...(searchQuery.category && { category: searchQuery.category }),
    };

    const fetchFilteredProducts = async () => {
      try {
        const { products: searchedProducts, totalProducts } =
          await searchProducts(currentPage, productsPerPage, filters);
        setFilteredProducts(searchedProducts || []);
        setTotalProducts(totalProducts);
      } catch (error) {
        console.error("Error searching products:", error);
      }
    };

    fetchFilteredProducts();
  }, [searchQuery.name, searchQuery.category, currentPage]);

  const handleDelete = async (id) => {
    try {
      const res = await deleteProduct(id);
      console.log("res delete", res);
      // window.location.reload();
      setProducts(products.filter((product) => product.id !== id));
      handleFilter(filterCategory);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (id) => {
    const product = products.find((product) => product.id === id);
    console.log("pờ rô đắc", product);
    setForm({
      name: product.name,
      priceout: product.priceout,
      banner: "",
      category_id: product.category_id,
      supplier_id: product.supplier_id,
      url_image: product.url_images,
      description: product.description,
      stockQuantity: product.stockQuantity,
      weight: product.weight,
      expire_date: product.expire_date,
    });
    setEditMode(true);
    setEditId(id);
    setIsModalOpen(true);
  };

  const handlePageChange = (page) => {
    navigate(`admin/manage-product/${page}/${productsPerPage}`);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminHeader />
      <div className="ml-[260px] w-5/6 p-4">
        <h1 className="mb-4 mt-4 text-4xl font-bold text-[#222222]">
          Quản lý sản phẩm
        </h1>

        <div className="shadow-md mb-4 rounded-md bg-white p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                value={searchQuery.name}
                onChange={(e) =>
                  setSearchQuery({ ...searchQuery, name: e.target.value })
                }
                className="w-full rounded-md border border-gray-300 p-2"
                placeholder="Nhập tên sản phẩm"
              />
            </div>
            <div>
              <select
                value={filterCategory}
                onChange={(e) => handleFilter(e.target.value)}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="">Tất cả danh mục</option>
                {category.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        {/* Product List */}
        <div>
          <table className="shadow-lg min-w-full overflow-hidden rounded-lg bg-white">
            <thead className="bg-[#006532] text-white">
              <tr>
                <th className="border-y px-4 py-2">STT</th>
                <th className="border-y px-4 py-2">Tên sản phẩm</th>
                <th className="border-y px-4 py-2">Giá</th>
                <th className="border-y px-4 py-2">Danh mục</th>
                <th className="border-y px-4 py-2">Nhà cung cấp</th>
                <th className="border-y px-4 py-2">Mô tả</th>
                <th className="border-y px-4 py-2">Số lượng trong kho</th>
                <th className="border-y px-4 py-2">Khối lượng</th>
                <th className="border-y px-4 py-2">Hình ảnh</th>
                <th className="border-y px-4 py-2">Ngày hết hạn</th>
                <th className="border-y px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, index) => (
                  <tr key={index} className="border-t">
                    <td className="border-y px-4 py-2">{index + 1}</td>
                    <td className="border-y px-4 py-2">{product.name}</td>
                    <td className="border-y px-4 py-2">{product.priceout}</td>
                    <td className="border-y px-4 py-2">
                      {category.find(
                        (category) => category.id === product.category_id,
                      )?.name || "Không rõ"}
                    </td>
                    <td className="border-y px-4 py-2">
                      {supplier.find(
                        (supplier) => supplier.id === product.supplier_id,
                      )?.name || "Không rõ"}
                    </td>
                    <td className="border-y px-4 py-2">
                      {product.description}
                    </td>
                    <td className="border-y px-4 py-2">
                      {product.stockQuantity}
                    </td>
                    <td className="border-y px-4 py-2">{product.weight}</td>
                    {/* <td className="border px-4 py-2 text-center">
                      <img
                        src={product.url_image}
                        alt={product.name}
                        className="mx-auto h-12"
                      />
                    </td> */}

                    <td className="border-y px-4 py-2 text-center">
                      {product.url_images ? (
                        <img
                          src={product.url_images}
                          alt={product.name}
                          className="mx-auto h-12"
                        />
                      ) : (
                        <p>Không có ảnh</p> // Hiển thị nếu không có ảnh
                      )}
                    </td>

                    <td className="border-y px-4 py-2">
                      {new Date(product.expire_date).toLocaleDateString(
                        "vi-VN",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        },
                      )}
                    </td>
                    <td className="mt-4 flex justify-center space-x-2 px-4 py-2">
                      <button
                        onClick={() => handleEdit(product.id)}
                        className="text-[#225a3e] hover:text-green-700"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="py-4 text-center">
                    Không có sản phẩm nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Floating Add Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="shadow-lg fixed bottom-4 right-4 rounded-full bg-[#225a3e] p-4 text-white"
        >
          <FaPlus />
        </button>

        {/* Product Form Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="shadow-lg w-1/3 rounded bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">
                {editMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {/* Form Fields */}
                  {[
                    { label: "Tên sản phẩm", field: "name", type: "text" },
                    { label: "Giá", field: "priceout", type: "number" },
                    { label: "Mô tả", field: "description", type: "text" },
                    {
                      label: "Số lượng trong kho",
                      field: "stockQuantity",
                      type: "number",
                    },
                    { label: "Khối lượng", field: "weight", type: "number" },
                    {
                      label: "Ngày hết hạn",
                      field: "expire_date",
                      type: "date",
                    },
                  ].map(({ label, field, type }, index) => (
                    <div className="mb-4" key={index}>
                      <label className="block text-gray-700">{label}</label>
                      <input
                        type={type}
                        value={form[field] || ""}
                        onChange={(e) =>
                          setForm({ ...form, [field]: e.target.value })
                        }
                        className="w-full rounded border border-gray-300 p-2 focus:border-[#225a3e]"
                        required={field !== "supplier"} // Set 'required' if field is not optional
                      />
                    </div>
                  ))}

                  {/* Dropdown for category */}
                  <div className="mb-4">
                    <label className="block text-gray-700">Chọn danh mục</label>
                    <select
                      id="category"
                      value={form.category_id}
                      onChange={(e) =>
                        setForm({ ...form, category_id: e.target.value })
                      }
                      required
                      className="w-full rounded border border-gray-300 p-2 focus:border-[#225a3e]"
                    >
                      <option value="">-- Chọn danh mục --</option>
                      {category.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown for supplier */}
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Chọn nhà cung cấp
                    </label>
                    <select
                      id="supplier"
                      value={form.supplier_id}
                      onChange={(e) =>
                        setForm({ ...form, supplier_id: e.target.value })
                      }
                      required
                      className="w-full rounded border border-gray-300 p-2 focus:border-[#225a3e]"
                    >
                      <option value="">-- Chọn nhà cung cấp --</option>
                      {supplier.map((supplier) => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Input for image upload */}
                <div className="flex flex-wrap">
                  <div className="mb-4 mr-5 w-[48%]">
                    <label className="block text-gray-700">Hình ảnh 1</label>
                    <input
                      type="file"
                      name="url_images"
                      multiple // cho phép chọn nhiều file
                      // accept="image/*"
                      onChange={handleImageChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  <div className="mb-4 w-[48%]">
                    <label className="block text-gray-700">Hình ảnh 2</label>
                    <input
                      type="file"
                      name="url_images"
                      multiple // cho phép chọn nhiều file
                      // accept="image/*"
                      onChange={handleImageChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Hình ảnh 3</label>
                    <input
                      type="file"
                      name="url_images"
                      multiple // cho phép chọn nhiều file
                      // accept="image/*"
                      onChange={handleImageChange}
                      className="w-full rounded-md border border-gray-300 p-2"
                    />
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="rounded bg-[#225a3e] p-2 text-white"
                  >
                    {editMode ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsModalOpen(false);
                      setEditMode(false);
                      setForm({
                        name: "",
                        priceout: "",
                        description: "",
                        stockQuantity: "",
                        weight: "",
                        expire_date: "",
                        url_images: "",
                      });
                    }}
                    className="ml-2 rounded bg-gray-500 p-2 text-white"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="mt-4 flex justify-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`mx-1 rounded px-3 py-1 ${
                index + 1 === currentPage
                  ? "bg-[#006532] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-200"
              }`}
              disabled={index + 1 === currentPage}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ManageProduct;
