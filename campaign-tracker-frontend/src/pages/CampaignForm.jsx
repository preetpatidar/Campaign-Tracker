import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

function CampaignForm() {
  const [campaign, setCampaign] = useState({
    title: "",
    platform: "Instagram",
    budget: "",
    status: "Active",
    start_date: "",
    end_date: ""
  });

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setError("API URL not configured.");
      return;
    }

    if (id) {
      setFetching(true);
      axios
        .get(`${API_URL}/api/campaigns/${id}/`)
        .then((res) => setCampaign(res.data))
        .catch(() => {
          toast.error("Failed to load campaign.");
          setError("Unable to fetch campaign.");
        })
        .finally(() => setFetching(false));
    }
  }, [id, API_URL]);

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!campaign.title.trim()) {
      toast.error("Title is required.");
      return false;
    }

    if (!campaign.budget || isNaN(campaign.budget) || Number(campaign.budget) <= 0) {
      toast.error("Budget must be a positive number.");
      return false;
    }

    if (!campaign.start_date || !campaign.end_date) {
      toast.error("Start and End dates are required.");
      return false;
    }

    if (campaign.end_date < campaign.start_date) {
      toast.error("End date cannot be before start date.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      toast.error("API URL not configured.");
      return;
    }

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (id) {
        await axios.put(`${API_URL}/api/campaigns/${id}/`, campaign);
        toast.success("Campaign updated successfully!");
      } else {
        await axios.post(`${API_URL}/api/campaigns/`, campaign);
        toast.success("Campaign created successfully!");
      }

      navigate("/app");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save campaign.");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
        Loading campaign...
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
      className="min-h-screen flex items-center justify-center"
    >
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">

        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">
          {id ? "Edit Campaign" : "Create Campaign"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Title
            </label>
            <input
              name="title"
              value={campaign.title}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border 
                         bg-gray-50 dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         text-gray-800 dark:text-white
                         focus:ring-2 focus:ring-blue-500"
              placeholder="Enter campaign title"
            />
          </div>

          {/* Platform */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Platform
            </label>
            <select
              name="platform"
              value={campaign.platform}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border 
                         bg-gray-50 dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         text-gray-800 dark:text-white"
            >
              <option value="Instagram">Instagram</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Budget
            </label>
            <input
              type="number"
              name="budget"
              value={campaign.budget}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border 
                         bg-gray-50 dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         text-gray-800 dark:text-white"
              placeholder="Enter budget"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Status
            </label>
            <select
              name="status"
              value={campaign.status}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border 
                         bg-gray-50 dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         text-gray-800 dark:text-white"
            >
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              Start Date
            </label>
            <input
              type="date"
              name="start_date"
              value={campaign.start_date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border 
                         bg-gray-50 dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         text-gray-800 dark:text-white"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
              End Date
            </label>
            <input
              type="date"
              name="end_date"
              value={campaign.end_date}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border 
                         bg-gray-50 dark:bg-gray-700
                         border-gray-300 dark:border-gray-600
                         text-gray-800 dark:text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold
                       bg-blue-600 hover:bg-blue-700
                       text-white shadow-md
                       disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : id
              ? "Update Campaign"
              : "Create Campaign"}
          </button>
        </form>
      </div>
    </motion.div>
  );
}

export default CampaignForm;
