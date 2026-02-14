import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (!API_URL) {
      setError("API URL not configured.");
      setLoading(false);
      return;
    }

    const fetchNews = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/news/`);
        setNews(res.data.products || res.data || []);
      } catch (err) {
        console.error("News API Error:", err);
        setError("Failed to load industry insights.");
        toast.error("Unable to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [API_URL]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
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
        Industry Insights
      </h2>

      {news.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400">
          No news available at the moment.
        </div>
      ) : (
        <>
          {/* News Grid */}
          <motion.div layout className="grid md:grid-cols-3 gap-8">
            {news.slice(0, visibleCount).map((item, index) => (
              <motion.div
                layout
                key={item.id || index}
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
                    src={item.thumbnail || "https://via.placeholder.com/400x300"}
                    alt={item.title || "News image"}
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/400x300")
                    }
                    className="w-full h-full object-cover 
                               transition-transform duration-300 
                               hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-white mb-2">
                    {item.title || "Untitled"}
                  </h3>

                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {item.description
                      ? item.description.slice(0, 90) + "..."
                      : "No description available."}
                  </p>

                  <div className="flex justify-between items-center">
                    {item.price && (
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        ${item.price}
                      </span>
                    )}

                    {item.rating && (
                      <span
                        className="text-xs bg-gray-200 dark:bg-gray-700 
                                   text-gray-700 dark:text-gray-300 
                                   px-2 py-1 rounded-full"
                      >
                        ⭐ {item.rating}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Show More / Show Less */}
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
