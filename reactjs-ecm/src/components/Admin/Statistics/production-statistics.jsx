import React, { useState } from 'react';
import { LineChart, AreaChart, RadarChart, Line, Area, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PolarGrid, PolarAngleAxis } from 'recharts';
import { BarChart, Bar } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';

// Dữ liệu giả lập
const revenueData = [
  { name: 'Week 1', revenue: 4000, budget: 3000, profit: 1000 },
  { name: 'Week 2', revenue: 4500, budget: 3500, profit: 1200 },
  { name: 'Week 3', revenue: 5000, budget: 4000, profit: 1500 },
  { name: 'Week 4', revenue: 6000, budget: 5000, profit: 2000 },
];

const topProductsData = [
  { name: 'Product A', revenue: 1200 },
  { name: 'Product B', revenue: 1000 },
  { name: 'Product C', revenue: 800 },
  { name: 'Product D', revenue: 600 },
  { name: 'Product E', revenue: 400 },
];

const topCustomersData = [
  { name: 'Customer 1', orders: 50 },
  { name: 'Customer 2', orders: 45 },
  { name: 'Customer 3', orders: 40 },
  { name: 'Customer 4', orders: 35 },
  { name: 'Customer 5', orders: 30 },
];

const salesByCategory = [
  { name: 'Electronics', value: 400 },
  { name: 'Clothing', value: 300 },
  { name: 'Furniture', value: 250 },
  { name: 'Toys', value: 150 },
];

const salesBySupplier = [
  { name: 'Supplier A', value: 500 },
  { name: 'Supplier B', value: 400 },
  { name: 'Supplier C', value: 300 },
];

function ProductionStatistics() {
  const [timePeriod, setTimePeriod] = useState('week'); // Trạng thái lựa chọn thời gian (Tuần, Tháng, Quý, Năm)

  return (
    <div className="bg-gray-50 min-h-screen p-8">
      <div className="mb-8">
        {/* Chọn thời gian */}
        <div className="flex space-x-4 mb-6">
          <button className="p-2 border rounded-lg text-white bg-[#006532] shadow-md hover:bg-[#004d26]">Tuần</button>
          <button className="p-2 border rounded-lg text-white bg-[#006532] shadow-md hover:bg-[#004d26]">Tháng</button>
          <button className="p-2 border rounded-lg text-white bg-[#006532] shadow-md hover:bg-[#004d26]">Quý</button>
          <button className="p-2 border rounded-lg text-white bg-[#006532] shadow-md hover:bg-[#004d26]">Năm</button>
        </div>
      </div>

      {/* Các thẻ thông tin */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-[#006532]">Doanh thu</h4>
          <p className="text-3xl font-bold text-[#006532]">{revenueData[revenueData.length - 1].revenue} VND</p>
          <p className="text-sm text-gray-500">So với tuần trước: +200 VND</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-[#006532]">Sản phẩm</h4>
          <p className="text-3xl font-bold text-[#006532]">{topProductsData.length}</p>
          <p className="text-sm text-gray-500">So với tháng trước: +5 sản phẩm</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-[#006532]">Khách hàng</h4>
          <p className="text-3xl font-bold text-[#006532]">{topCustomersData.length}</p>
          <p className="text-sm text-gray-500">So với quý trước: +10 khách hàng</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-[#006532]">Đơn hàng</h4>
          <p className="text-3xl font-bold text-[#006532]">{topCustomersData.reduce((acc, curr) => acc + curr.orders, 0)}</p>
          <p className="text-sm text-gray-500">So với năm trước: +50 đơn hàng</p>
        </div>
      </div>

      {/* Biểu đồ Line */}
      <div className="mb-8">
        <h4 className="text-2xl font-semibold text-[#006532] mb-4">Doanh thu, Ngân sách, Lãi</h4>
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

      {/* Biểu đồ Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-[#006532] mb-4">Top 10 sản phẩm có doanh thu cao nhất</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProductsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#006532" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-[#006532] mb-4">Top 10 khách hàng mua nhiều nhất</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topCustomersData}>
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-[#006532] mb-4">Doanh số theo Category</h4>
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
                  <Cell key={`cell-${index}`} fill={entry.value > 300 ? '#82ca9d' : '#ff7300'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200">
          <h4 className="text-xl font-semibold text-[#006532] mb-4">Doanh số theo Supplier</h4>
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
                  <Cell key={`cell-${index}`} fill={entry.value > 300 ? '#82ca9d' : '#ff7300'} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ Radar */}
      <div className="mb-8">
        <h4 className="text-2xl font-semibold text-[#006532] mb-4">Biểu đồ Radar</h4>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart outerRadius="90%" data={salesByCategory}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <Radar name="Doanh số" dataKey="value" stroke="#006532" fill="#006532" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default ProductionStatistics;
