import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function CampaignList() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setError("API URL not configured.");
      setLoading(false);
      return;
    }

    fetchCampaigns();
  }, [API_URL]);

  const fetchCampaigns = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/campaigns/`);
      setCampaigns(res.data);
    } catch (err) {
      console.error("Fetch campaigns error:", err);
      setError("Failed to load campaigns.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCampaign = async (id) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/campaigns/${id}/`);
      toast.success("Campaign deleted!");
      setCampaigns((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete campaign.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Loading campaigns...
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Campaigns
      </h2>

      {campaigns.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No campaigns available. Create one to get started.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {campaigns.map((c) => (
            <div
              key={c.id}
              className="bg-white dark:bg-gray-800 
                         shadow-md dark:shadow-gray-900/40 
                         rounded-xl p-6 
                         hover:shadow-2xl 
                         hover:-translate-y-1 
                         transition-all duration-300"
            >
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {c.title}
              </h3>

              {/* Platform */}
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {c.platform}
              </p>

              {/* Budget */}
              <p className="mt-3 text-xl font-bold text-gray-900 dark:text-gray-200">
                ₹ {c.budget}
              </p>

              {/* Status Badge */}
              <span
                className={`inline-block mt-4 px-3 py-1 rounded-full text-xs font-medium ${
                  c.status === "Active"
                    ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                    : c.status === "Paused"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                    : "bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                {c.status}
              </span>

              {/* Actions */}
              <div className="flex justify-between mt-6">
                <Link
                  to={`/app/edit/${c.id}`}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteCampaign(c.id)}
                  className="text-red-600 dark:text-red-400 font-medium hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

export default CampaignList;
