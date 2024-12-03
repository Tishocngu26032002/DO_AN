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
  getSalesByCategory,
  getSalesBySupplier,
  getTopCustomers,
  getTopProducts,
} from "../../../services/report-service.js";

// Dữ liệu giả lập
const revenueData = [
  { name: "Week 1", revenue: 4000, budget: 3000, profit: 1000 },
  { name: "Week 2", revenue: 4500, budget: 3500, profit: 1200 },
  { name: "Week 3", revenue: 5000, budget: 4000, profit: 1500 },
  { name: "Week 4", revenue: 6000, budget: 5000, profit: 2000 },
];

const Report = () => {
  const [timeFilter, setTimeFilter] = useState("Tuần");
  const [dashboardData, setDashboardData] = useState(null);
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

  // Fetch dữ liệu Top 10 sản phẩm
  const fetchTopProducts = async (filter) => {
    try {
      const response = await getTopProducts(filter);

      if (response.success) {
        setTopProducts(response.data);
      } else {
        console.error("Failed to fetch top products data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching top products data:", error);
    }
  };

  const fetchTopCustomers = async (filter) => {
    try {
      const response = await getTopCustomers(filter);

      if (response.success) {
        setTopCustomers(response.data);
      } else {
        console.error("Failed to fetch top customers data:", response.message);
      }
    } catch (error) {
      console.error("Error fetching top customers:", error);
    }
  };

  const fetchSalesByCategory = async (filter) => {
    try {
      const response = await getSalesByCategory(filter);

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

  const fetchSalesBySupplier = async (filter) => {
    try {
      const response = await getSalesBySupplier(filter);

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
    fetchTopProducts(timeFilter);
    fetchTopCustomers(timeFilter);
    fetchSalesByCategory(timeFilter);
    fetchSalesBySupplier(timeFilter);
  }, [timeFilter]);

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
          <h4 className="mb-4 text-2xl font-semibold text-[#006532]">
            Doanh thu, Ngân sách, Lãi
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#006532" />
              <Line type="monotone" dataKey="budget" stroke="#82ca9d" />
              <Line type="monotone" dataKey="profit" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ Bar: Top10 sản phẩm */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-xl font-semibold text-[#006532]">
              Top 10 sản phẩm có doanh thu cao nhất
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="revenue" fill="#006532" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-xl font-semibold text-[#006532]">
              Top 10 khách hàng mua nhiều nhất
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topCustomers}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ Donut */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-xl font-semibold text-[#006532]">
              Doanh số theo Category
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByCategory}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#006532"
                  label
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.value > 300 ? "#82ca9d" : "#ff7300"}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="shadow-lg rounded-lg border border-gray-200 bg-white p-6">
            <h4 className="mb-4 text-xl font-semibold text-[#006532]">
              Doanh số theo Supplier
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesBySupplier}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#006532"
                  label
                >
                  {salesBySupplier.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.value > 300 ? "#82ca9d" : "#ff7300"}
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
