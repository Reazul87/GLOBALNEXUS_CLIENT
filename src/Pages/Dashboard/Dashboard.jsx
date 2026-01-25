import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import useAxiosSecure from "../../Hooks/useAxiosSecure/useAxiosSecure";
import Loading from "../../Components/Loading";

const COLORS = ["#f59e0b", "#3b82f6", "#10b981"];

const Dashboard = () => {
  const axiosSecure = useAxiosSecure();

  const { data: summary, isLoading: summaryLoading } = useQuery({
    queryKey: ["dashboard-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/summary");
      return res.data;
    },
  });

  const { data: monthlyStats = [], isLoading: monthlyLoading } = useQuery({
    queryKey: ["dashboard-monthly"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/monthly-stats");
      return res.data;
    },
  });

  const { data: topProducts = [], isLoading: topLoading } = useQuery({
    queryKey: ["dashboard-top-products"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/top-products");
      return res.data;
    },
  });

  const { data: lowStock = [], isLoading: lowLoading } = useQuery({
    queryKey: ["dashboard-low-stock"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/low-stock");
      return res.data;
    },
  });

  const { data: recentActivity = {}, isLoading: activityLoading } = useQuery({
    queryKey: ["dashboard-recent-activity"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/recent-activity");
      return res.data;
    },
  });

  if (
    summaryLoading ||
    topLoading ||
    lowLoading ||
    monthlyLoading ||
    activityLoading
  )
    return <Loading />;

  // const pieData = [
  //   { name: "Pending", value: summary?.pending },
  //   { name: "In Progress", value: summary?.inProgress },
  //   { name: "Resolved", value: summary?.resolved },
  // ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-12 text-accent">
        Overview
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Kpi title="Total Products" value={summary?.totalProducts} />
        <Kpi title="Total Exports" value={summary?.myExports} />
        <Kpi title="Total Stock" value={summary?.totalAvailableQuantity} />
        <Kpi title="Low Stock Items" value={lowStock.length} highlight />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* <div className="card bg-base-100 shadow-xl p-6 w-full h-80 sm:h-96 lg:h-80">
          <h2 className="text-xl font-bold text-center mb-4">Product Status</h2>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius="80%">
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div> */}

        <div className="card bg-base-100 shadow-xl col-span-full p-6 w-full h-80 sm:h-96 lg:h-80">
          <h2 className="text-xl font-bold text-center mb-4">
            Monthly Imports / Exports
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyStats}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="imports" fill="#3b82f6" />
              <Bar dataKey="exports" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Table
          title="Top Products"
          data={topProducts}
          columns={["product_name", "totalImported"]}
        />

        <Table
          title="Low Stock Alert"
          data={lowStock}
          columns={["product_name", "available_quantity"]}
          danger
        />
      </div>

      <div className="card bg-base-100 shadow-xl p-6 mt-12">
        <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
        <ul className="space-y-2 max-h-80 overflow-y-auto">
          {recentActivity?.recentImports?.map((item) => (
            <li key={item._id} className="text-sm">
              📥 Imported {item.import_quantity} of {item.product_name}
            </li>
          ))}
          {recentActivity?.recentExports?.map((item) => (
            <li key={item._id} className="text-sm">
              📤 Exported {item.product_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Kpi = ({ title, value, highlight }) => (
  <div
    className={`card shadow-xl p-6 text-center ${
      highlight ? "bg-red-200" : "bg-base-100"
    }`}
  >
    <h3 className="text-3xl font-bold">{value}</h3>
    <p className="text-gray-600 mt-2">{title}</p>
  </div>
);

const Table = ({ title, data, columns, danger }) => (
  <div className="card bg-base-100 shadow-xl p-6 overflow-x-auto">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <table className="table w-full min-w-[300px]">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col} className="capitalize">
              {col === "totalImported"
                ? "total imported"
                : col.replace("_", " ")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id} className={danger ? "text-red-600" : ""}>
            {columns.map((col) => (
              <td key={col}>{row[col]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Dashboard;
