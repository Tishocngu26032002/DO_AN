import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaShoppingCart, FaUserPlus } from "react-icons/fa";
import { SiBuzzfeed } from "react-icons/si";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const ProductionStatistics = () => {
  const [overview, setOverview] = useState({});
  const [data, setData] = useState([]);
  const [timeFrame, setTimeFrame] = useState("day");

  useEffect(() => {
    const fakeOverviewData = {
      totalRevenue: 12000000,
      totalOrders: 150,
      totalProductsSold: 300,
      newUsers: 25,
    };

    const generateChartData = () => {
      if (timeFrame === "day") {
        return [
          { date: "2024-10-01", clothing: 50, shoes: 30, accessories: 20 },
          { date: "2024-10-02", clothing: 40, shoes: 25, accessories: 15 },
          { date: "2024-10-03", clothing: 60, shoes: 20, accessories: 30 },
          { date: "2024-10-04", clothing: 70, shoes: 35, accessories: 25 },
          { date: "2024-10-05", clothing: 80, shoes: 45, accessories: 35 },
        ];
      } else if (timeFrame === "week") {
        return [
          { date: "Tuần 1", clothing: 200, shoes: 100, accessories: 50 },
          { date: "Tuần 2", clothing: 250, shoes: 150, accessories: 75 },
          { date: "Tuần 3", clothing: 300, shoes: 200, accessories: 100 },
          { date: "Tuần 4", clothing: 350, shoes: 250, accessories: 150 },
        ];
      } else if (timeFrame === "month") {
        return [
          { date: "2024-05", clothing: 300, shoes: 150, accessories: 100 },
          { date: "2024-06", clothing: 400, shoes: 200, accessories: 150 },
          { date: "2024-07", clothing: 350, shoes: 250, accessories: 200 },
          { date: "2024-08", clothing: 450, shoes: 300, accessories: 250 },
          { date: "2024-09", clothing: 500, shoes: 350, accessories: 300 },
          { date: "2024-10", clothing: 600, shoes: 400, accessories: 350 },
        ];
      }
      return [];
    };

    setOverview(fakeOverviewData);
    setData(generateChartData());
  }, [timeFrame]);

  return (
    <div className="p-5">
      <h1 className="mb-5 text-2xl font-bold text-[#006532]">Hôm nay</h1>
      <div className="mb-5 grid grid-cols-4 gap-4">
        <div className="flex items-center justify-between rounded bg-[#908dd4] p-4 shadow">
          <div>
            <h2 className="text-lg font-semibold">Tổng tiền thu vào</h2>
            <p className="text-xl">{overview.totalRevenue} VNĐ</p>
          </div>
          <FaMoneyBillWave className="mr-[40px] text-5xl text-[#006532]" />{" "}
          {/* Thay đổi kích thước icon */}
        </div>
        <div className="flex items-center justify-between rounded bg-[#82ca9d] p-4 shadow">
          <div>
            <h2 className="text-lg font-semibold">Số lượng đơn hàng</h2>
            <p className="text-xl">{overview.totalOrders}</p>
          </div>
          <FaShoppingCart className="mr-[40px] text-5xl text-[#006532]" />{" "}
          {/* Thay đổi kích thước icon */}
        </div>
        <div className="flex items-center justify-between rounded bg-[#ffc658] p-4 shadow">
          <div>
            <h2 className="text-lg font-semibold">Sản phẩm bán ra</h2>
            <p className="text-xl">{overview.totalProductsSold}</p>
          </div>
          <SiBuzzfeed className="mr-[40px] text-5xl text-[#006532]" />{" "}
          {/* Thay đổi kích thước icon */}
        </div>
        <div className="flex items-center justify-between rounded bg-[#58f9ff] p-4 shadow">
          <div>
            <h2 className="text-lg font-semibold">Người dùng mới</h2>
            <p className="text-xl">{overview.newUsers}</p>
          </div>
          <FaUserPlus className="mr-[40px] text-5xl text-[#006532]" />{" "}
          {/* Thay đổi kích thước icon */}
        </div>
      </div>

      <h1 className="mb-5 text-2xl font-bold text-[#006532]">
        Biểu đồ Bán ra theo thể loại
      </h1>

      <div className="mb-5">
        <label className="mr-2">Chọn khoảng thời gian:</label>
        <select
          value={timeFrame}
          onChange={(e) => setTimeFrame(e.target.value)}
          className="rounded border p-2"
        >
          <option value="day">Ngày</option>
          <option value="week">Tuần</option>
          <option value="month">Tháng</option>
        </select>
      </div>

      {data.length > 0 ? (
        <LineChart width={600} height={300} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="clothing"
            stroke="#8884d8"
            name="Thuỷ sản"
          />
          <Line
            type="monotone"
            dataKey="shoes"
            stroke="#82ca9d"
            name="Gia cầm"
          />
          <Line
            type="monotone"
            dataKey="accessories"
            stroke="#ffc658"
            name="Lợn"
          />
        </LineChart>
      ) : (
        <p>Không có dữ liệu để hiển thị.</p>
      )}
    </div>
  );
};

export default ProductionStatistics;
