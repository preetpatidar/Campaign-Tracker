import { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { motion } from "framer-motion";


ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState([]);
  const [stats, setStats] = useState({});


  useEffect(() => {
    axios.get("http://localhost:8000/api/stats/")
      .then(res => {
        setData(res.data.status_counts)
        setStats(res.data)
  });
  }, []);

  const chartData = {
    labels: stats.status_counts?.map(s => s.status) || [],
    datasets: [
      {
        data: stats.status_counts?.map(s => s.count) || [],
        backgroundColor: [
          "#3B82F6", // blue
          "#22C55E", // green
          "#F59E0B", // yellow
          "#EF4444", // red
        ],
        borderWidth: 0,
        hoverOffset: 12,
        cutout: "65%", // makes it modern donut
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
          font: {
            size: 14,
          },
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

  {/* ===== Metric Cards ===== */}
  <div className="grid md:grid-cols-3 gap-8 mb-12">

    {/* Total Campaigns */}
    <div className="bg-white dark:bg-gray-800 
                    p-6 rounded-2xl shadow-lg 
                    hover:shadow-2xl 
                    transition-all duration-300">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Campaigns
      </p>
      <h2 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
        {stats.total_campaigns || 0}
      </h2>
    </div>

    {/* Total Budget */}
    <div className="bg-white dark:bg-gray-800 
                    p-6 rounded-2xl shadow-lg 
                    hover:shadow-2xl 
                    transition-all duration-300">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Total Budget
      </p>
      <h2 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
        ₹ {stats.total_budget?.total || 0}
      </h2>
    </div>

    {/* Active Campaigns */}
    <div className="bg-white dark:bg-gray-800 
                    p-6 rounded-2xl shadow-lg 
                    hover:shadow-2xl 
                    transition-all duration-300">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Active Campaigns
      </p>
      <h2 className="text-3xl font-bold mt-3 text-gray-900 dark:text-white">
        {stats.status_counts?.find(s => s.status === "Active")?.count || 0}
      </h2>
    </div>

  </div>

  {/* ===== Chart Section ===== */}
  <div className="bg-white dark:bg-gray-800 
                  p-8 rounded-2xl shadow-xl 
                  dark:shadow-gray-900/40">

    <h3 className="text-lg font-semibold mb-6 text-gray-700 dark:text-gray-200">
      Campaign Status Breakdown
    </h3>

    <div className="bg-white dark:bg-gray-800 
                rounded-2xl shadow-xl 
                dark:shadow-gray-900/40 
                p-8 transition-all duration-300">

  <h3 className="text-lg font-semibold mb-6 
                 text-gray-800 dark:text-white">
    Campaign Status Distribution
  </h3>

  <div className="max-w-sm mx-auto h-72 dark:text-white">
  <Doughnut data={chartData} options={options} />
</div>


</div>


  </div>

</motion.div>

  );
}

export default Dashboard;
