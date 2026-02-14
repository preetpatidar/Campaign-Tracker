import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/news/`)
      .then((res) => {
        setNews(res.data.products || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white">
        Industry Insights
      </h2>

      {/* ===== Loading State ===== */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* ===== News Grid ===== */}
          <motion.div
            layout
            className="grid md:grid-cols-3 gap-8"
          >
            {news.slice(0, visibleCount).map((item) => (
              <motion.div
                layout
                key={item.id}
                className="bg-white dark:bg-gray-800 
                           rounded-2xl shadow-lg 
                           hover:shadow-2xl 
                           hover:-translate-y-1 
                           transition-all duration-300 
                           overflow-hidden"
              >
                {/* Image */}
                <div className="w-full h-52 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover 
                               transition-transform duration-300 
                               hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {item.description?.slice(0, 90)}...
                  </p>

                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">
                      ${item.price}
                    </span>

                    <span className="text-xs bg-gray-200 dark:bg-gray-700 
                                     text-gray-700 dark:text-gray-300 
                                     px-2 py-1 rounded-full">
                      ⭐ {item.rating}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* ===== Show More / Show Less Button ===== */}
          <div className="flex justify-center mt-10">
            {visibleCount < news.length ? (
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="px-6 py-3 rounded-xl 
                           bg-blue-600 hover:bg-blue-700 
                           text-white font-semibold 
                           shadow-lg hover:shadow-2xl 
                           transition-all duration-300"
              >
                Show More
              </button>
            ) : (
              news.length > 6 && (
                <button
                  onClick={() => setVisibleCount(6)}
                  className="px-6 py-3 rounded-xl 
                             bg-gray-600 hover:bg-gray-700 
                             text-white font-semibold 
                             shadow-lg transition-all duration-300"
                >
                  Show Less
                </button>
              )
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}

export default News;
