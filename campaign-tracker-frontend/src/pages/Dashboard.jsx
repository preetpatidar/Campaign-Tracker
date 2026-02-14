import { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setError("API URL is not configured.");
      setLoading(false);
      return;
    }

    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/stats/`);
        setStats(res.data);
      } catch (err) {
        console.error("Dashboard API Error:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  const statusCounts = stats.status_counts || [];

  const chartData = {
    labels: statusCounts.map((s) => s.status),
    datasets: [
      {
        data: statusCounts.map((s) => s.count),
        backgroundColor: [
          "#3B82F6",
          "#22C55E",
          "#F59E0B",
          "#EF4444",
        ],
        borderWidth: 0,
        hoverOffset: 12,
        cutout: "65%",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          font: { size: 14 },
          color: document.documentElement.classList.contains("dark")
            ? "#fff"
            : "#374151",
        },
      },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#fff",
        bodyColor: "#fff",
        padding: 12,
        cornerRadius: 8,
      },
    },
    animation: {
      animateRotate: true,
      duration: 1200,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Dashboard
      </h2>

      {/* Metric Cards */}
      <div className="grid md:grid-cols-3 gap-8 mb-12">

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Campaigns
          </p>
          <h2 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
            {stats.total_campaigns || 0}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Total Budget
          </p>
          <h2 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
            ₹ {stats.total_budget?.total || 0}
          </h2>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg transition">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Active Campaigns
          </p>
          <h2 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
            {statusCounts.find((s) => s.status === "Active")?.count || 0}
          </h2>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
        <h3 className="text-lg font-semibold mb-6 text-gray-700 dark:text-gray-200">
          Campaign Status Distribution
        </h3>

        {statusCounts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-center">
            No campaign data available.
          </p>
        ) : (
          <div className="max-w-sm mx-auto h-72">
            <Doughnut data={chartData} options={options} />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;
