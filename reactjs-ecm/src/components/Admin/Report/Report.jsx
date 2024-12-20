import AdminHeader from "../AdminHeader/admin-header.jsx";
import React, { useEffect, useState } from "react";
import {
  LineChart,
  AreaChart,
  RadarChart,
  Line,
  Area,
  Radar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PolarGrid,
  PolarAngleAxis,
} from "recharts";
import { BarChart, Bar } from "recharts";
import { PieChart, Pie, Cell } from "recharts";
import {
  getDashboardData,
  getDataLineChart,
  getSalesByCategory,
  getSalesBySupplier,
  getTopCustomers,
  getTopProducts,
} from "../../../services/report-service.js";

const Report = () => {
  const [timeFilter, setTimeFilter] = useState("Tuần");
  const [dataLineChartFilter, setDataLineChartFilter] = useState("Tuần");
  const [topProductsFilter, setTopProductsFilter] = useState("Tuần");
  const [topCustomersFilter, setTopCustomersFilter] = useState("Tuần");
  const [categorySalesFilter, setCategorySalesFilter] = useState("Tuần");
  const [supplierSalesFilter, setSupplierSalesFilter] = useState("Tuần");

  const [dashboardData, setDashboardData] = useState(null);
  const [dataLineChart, setDataLineChart] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topCustomers, setTopCustomers] = useState([]);
  const [salesByCategory, setSalesByCategory] = useState([]);
  const [salesBySupplier, setSalesBySupplier] = useState([]);

  // Fetch dữ liệu dashboard tổng quan
  const fetchDashboardData = async (filter) => {
    try {
      const response = await getDashboardData(filter);

      if (response.success) {
        setDashboardData(response.data);
      } else {
        console.error("Failed to fetch dashboard data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  // Fetch dữ liệu Doanh thu Ngân Sách Lãi
  const fetchDataLineChart = async (dataLineChartFilter) => {
    try {
      const response = await getDataLineChart(dataLineChartFilter);

      if (response.success) {
        setDataLineChart(response.data);
      } else {
        console.error("Failed to fetch LineChart data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching LineChart data:", error);
    }
  };

  // Fetch dữ liệu Top 5 sản phẩm
  const fetchTopProducts = async (topProductsFilter) => {
    try {
      const response = await getTopProducts(topProductsFilter);
      console.log("response", response);
      if (response.success) {
        setTopProducts(response.data);
      } else {
        console.error("Failed to fetch top products data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching top products data:", error);
    }
  };

  const fetchTopCustomers = async (topCustomersFilter) => {
    try {
      const response = await getTopCustomers(topCustomersFilter);

      if (response) {
        setTopCustomers(response);
      } else {
        console.error("Failed to fetch top customers data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching top customers:", error);
    }
  };

  const fetchSalesByCategory = async (categorySalesFilter) => {
    try {
      const response = await getSalesByCategory(categorySalesFilter);

      if (response.success) {
        setSalesByCategory(response.data);
      } else {
        console.error(
          "Failed to fetch revenue by category data:",
          response.message,
        );
      }
    } catch (error) {
      console.error("Error fetch revenue by category data:", error);
    }
  };

  const fetchSalesBySupplier = async (supplierSalesFilter) => {
    try {
      const response = await getSalesBySupplier(supplierSalesFilter);

      if (response.success) {
        setSalesBySupplier(response.data);
      } else {
        console.error(
          "Failed to fetch revenue by supplier data:",
          response.message,
        );
      }
    } catch (error) {
      console.error("Error fetch revenue by supplier data:", error);
    }
  };

  useEffect(() => {
    fetchDashboardData(timeFilter);
  }, [timeFilter]);

  useEffect(() => {
    fetchDataLineChart(dataLineChartFilter);
  }, [dataLineChartFilter]);

  useEffect(() => {
    fetchTopProducts(topProductsFilter);
  }, [topProductsFilter]);

  useEffect(() => {
    fetchTopCustomers(topCustomersFilter);
  }, [topCustomersFilter]);

  useEffect(() => {
    fetchSalesByCategory(categorySalesFilter);
  }, [categorySalesFilter]);

  useEffect(() => {
    fetchSalesBySupplier(supplierSalesFilter);
  }, [supplierSalesFilter]);

  const getComparisonText = (timeFilter) => {
    switch (timeFilter) {
      case "Tuần":
        return "So với tuần trước:";
      case "Tháng":
        return "So với tháng trước:";
      case "Quý":
        return "So với quý trước:";
      case "Năm":
        return "So với năm trước:";
      default:
        return "So với thời gian trước:";
    }
  };

  return (
    <div>
      <AdminHeader />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mb-8">
          {/* Chọn thời gian */}
          <div className="mb-6 flex space-x-4">
            {["Tuần", "Tháng", "Quý", "Năm"].map((filter) => (
              <button
                key={filter}
                className={`shadow-md rounded-lg border p-2 text-white ${
                  timeFilter === filter ? "bg-[#004d26]" : "bg-[#006532]"
                } hover:bg-[#004d26]`}
                onClick={() => {
                  setTimeFilter(filter);
                }}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Các thẻ thông tin */}
        <div className="mb-8 grid grid-cols-2 gap-6 md:grid-cols-4">
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="text-xl font-semibold text-[#006532]">Doanh thu</h4>
            <p className="text-3xl font-bold text-[#006532]">
              {dashboardData?.thisTime?.revenue || 0} VND
            </p>
            <p className="text-sm text-gray-500">
              {getComparisonText(timeFilter)} +
              {(dashboardData?.thisTime?.revenue || 0) -
                (dashboardData?.lastTime?.revenue || 0)}{" "}
              VND
            </p>
          </div>
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="text-xl font-semibold text-[#006532]">Sản phẩm</h4>
            <p className="text-3xl font-bold text-[#006532]">
              {dashboardData?.thisTime?.product || 0}
            </p>
            <p className="text-sm text-gray-500">
              {getComparisonText(timeFilter)} +
              {(dashboardData?.thisTime?.product || 0) -
                (dashboardData?.lastTime?.product || 0)}{" "}
              sản phẩm
            </p>
          </div>
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="text-xl font-semibold text-[#006532]">Khách hàng</h4>
            <p className="text-3xl font-bold text-[#006532]">
              {dashboardData?.thisTime?.customer || 0}
            </p>
            <p className="text-sm text-gray-500">
              {getComparisonText(timeFilter)} +
              {(dashboardData?.thisTime?.customer || 0) -
                (dashboardData?.lastTime?.customer || 0)}{" "}
              khách hàng
            </p>
          </div>
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="text-xl font-semibold text-[#006532]">Đơn hàng</h4>
            <p className="text-3xl font-bold text-[#006532]">
              {dashboardData?.thisTime?.order || 0}
            </p>
            <p className="text-sm text-gray-500">
              {getComparisonText(timeFilter)} +
              {(dashboardData?.thisTime?.order || 0) -
                (dashboardData?.lastTime?.order || 0)}{" "}
              đơn hàng
            </p>
          </div>
        </div>

        {/* Biểu đồ Line */}
        <div className="mb-8">
          <div className="flex gap-4">
            <h4 className="mb-4 text-2xl font-semibold text-[#006532]">
              Doanh thu, Ngân sách, Lãi
            </h4>
            <select
              className="mb-4 rounded border px-3 py-2 text-sm"
              value={dataLineChartFilter}
              onChange={(e) => setDataLineChartFilter(e.target.value)}
            >
              <option value="Tuần">Tuần</option>
              <option value="Tháng">Tháng</option>
              <option value="Quý">Quý</option>
              <option value="Năm">Năm</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={dataLineChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time_period" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total_revenue" stroke="#006532" />
              <Line type="monotone" dataKey="total_cost" stroke="#82ca9d" />
              <Line type="monotone" dataKey="profit" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Bar: Top5 sản phẩm */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h4 className="mb-4 text-xl font-semibold text-[#006532]">
                Top 5 sản phẩm có doanh thu cao nhất
              </h4>
              <select
                className="mb-4 rounded border px-3 py-2 text-sm"
                value={topProductsFilter}
                onChange={(e) => setTopProductsFilter(e.target.value)}
              >
                <option value="Tuần">Tuần</option>
                <option value="Tháng">Tháng</option>
                <option value="Quý">Quý</option>
                <option value="Năm">Năm</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#006532" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h4 className="mb-4 text-xl font-semibold text-[#006532]">
                Top 5 khách hàng mua nhiều nhất
              </h4>
              <select
                className="mb-4 rounded border px-3 py-2 text-sm"
                value={topCustomersFilter}
                onChange={(e) => setTopCustomersFilter(e.target.value)}
              >
                <option value="Tuần">Tuần</option>
                <option value="Tháng">Tháng</option>
                <option value="Quý">Quý</option>
                <option value="Năm">Năm</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCustomers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="userName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ Donut */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h4 className="mb-4 text-xl font-semibold text-[#006532]">
                Doanh số theo Category
              </h4>
              <select
                className="mb-4 rounded border px-3 py-2 text-sm"
                value={categorySalesFilter}
                onChange={(e) => setCategorySalesFilter(e.target.value)}
              >
                <option value="Tuần">Tuần</option>
                <option value="Tháng">Tháng</option>
                <option value="Quý">Quý</option>
                <option value="Năm">Năm</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByCategory}
                  dataKey="revenue"
                  nameKey="categoryName"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#006532"
                  label={(entry) => `${entry.categoryName}: ${entry.revenue}`}
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.revenue > 300 ? "#82ca9d" : "#ff7300"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <h4 className="mb-4 text-xl font-semibold text-[#006532]">
                Doanh số theo Supplier
              </h4>
              <select
                className="mb-4 rounded border px-3 py-2 text-sm"
                value={supplierSalesFilter}
                onChange={(e) => setSupplierSalesFilter(e.target.value)}
              >
                <option value="Tuần">Tuần</option>
                <option value="Tháng">Tháng</option>
                <option value="Quý">Quý</option>
                <option value="Năm">Năm</option>
              </select>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesBySupplier}
                  dataKey="revenue"
                  nameKey="supplierName"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#006532"
                  label={(entry) => `${entry.supplierName}: ${entry.revenue}`}
                >
                  {salesBySupplier.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.revenue > 300 ? "#82ca9d" : "#ff7300"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
