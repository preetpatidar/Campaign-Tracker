import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Landing() {
  return (
    <div className="min-h-screen 
                    bg-gradient-to-br 
                    from-blue-600 via-indigo-600 to-purple-700 
                    dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
                    text-white transition-all duration-500">

      {/* ===== Hero Section ===== */}
      <div className="max-w-6xl mx-auto px-6 py-28 text-center">

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-bold mb-6 leading-tight"
        >
          Manage Campaigns
          <span className="block text-blue-200 dark:text-blue-400">
            Like a Modern SaaS 🚀
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl opacity-90 mb-12 max-w-3xl mx-auto"
        >
          Track budgets, analyze performance, and manage marketing campaigns
          with a beautifully designed analytics dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-6"
        >
          <Link
            to="/app"
            className="bg-white text-blue-600 
                       px-8 py-3 rounded-xl 
                       font-semibold shadow-lg 
                       hover:scale-105 hover:shadow-2xl 
                       transition-all duration-300"
          >
            Launch Dashboard
          </Link>

          <a
            href="#features"
            className="border border-white px-8 py-3 rounded-xl 
                       hover:bg-white hover:text-blue-600 
                       transition-all duration-300"
          >
            Explore Features
          </a>
        </motion.div>
      </div>

      {/* ===== Features Section ===== */}
      <div
        id="features"
        className="bg-white dark:bg-gray-900 
                   text-gray-800 dark:text-gray-200 
                   py-24 transition-all duration-500"
      >
        <div className="max-w-6xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Everything you need to manage marketing campaigns efficiently.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">

          {/* Card 1 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 
                       p-8 rounded-2xl 
                       shadow-lg hover:shadow-2xl 
                       transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">
              Full CRUD Operations
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Create, update, delete and manage campaigns with seamless user experience.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 
                       p-8 rounded-2xl 
                       shadow-lg hover:shadow-2xl 
                       transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">
              Real-Time Analytics
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Interactive dashboard with live campaign statistics and visual insights.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-gray-800 
                       p-8 rounded-2xl 
                       shadow-lg hover:shadow-2xl 
                       transition-all duration-300"
          >
            <h3 className="text-xl font-semibold mb-4">
              Third-Party API Integration
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Integrated external APIs for dynamic data and enhanced functionality.
            </p>
          </motion.div>

        </div>
      </div>

      {/* ===== Footer ===== */}
      <div className="py-8 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Campaign Tracker SaaS — Built with Django & React
      </div>

    </div>
  );
}

export default Landing;
