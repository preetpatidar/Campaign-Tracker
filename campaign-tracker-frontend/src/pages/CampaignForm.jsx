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

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/campaigns/${id}/`)
        .then(res => setCampaign(res.data));
    }
  }, [id]);

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/campaigns/${id}/`, campaign);
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/campaigns/`, campaign);
    }
    toast.success("Campaign saved successfully!");

    navigate("/app");
  };

  return (
    <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="min-h-screen flex items-center justify-center"
>
  <div className="w-full max-w-lg bg-white dark:bg-gray-800 
                  p-8 rounded-2xl shadow-xl 
                  dark:shadow-gray-900/40">

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
          className="w-full px-4 py-2 rounded-lg border 
                     bg-gray-50 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-800 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition"
          name="title"
          value={campaign.title}
          onChange={handleChange}
          placeholder="Enter campaign title"
        />
      </div>

      {/* Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Budget
        </label>
        <input
          className="w-full px-4 py-2 rounded-lg border 
                     bg-gray-50 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-800 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition"
          name="budget"
          value={campaign.budget}
          onChange={handleChange}
          placeholder="Enter budget"
        />
      </div>
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


      {/* Start Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          Start Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 rounded-lg border 
                     bg-gray-50 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-800 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition"
          name="start_date"
          value={campaign.start_date}
          onChange={handleChange}
        />
      </div>

      {/* End Date */}
      <div>
        <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
          End Date
        </label>
        <input
          type="date"
          className="w-full px-4 py-2 rounded-lg border 
                     bg-gray-50 dark:bg-gray-700
                     border-gray-300 dark:border-gray-600
                     text-gray-800 dark:text-white
                     focus:outline-none focus:ring-2 focus:ring-blue-500
                     transition"
          name="end_date"
          value={campaign.end_date}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold
                   bg-blue-600 hover:bg-blue-700
                   text-white shadow-md hover:shadow-lg
                   transition-all duration-300"
      >
        {id ? "Update Campaign" : "Create Campaign"}
      </button>

    </form>
  </div>
</motion.div>

  );
}

export default CampaignForm;
