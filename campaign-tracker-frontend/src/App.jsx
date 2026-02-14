import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import CampaignList from "./pages/CampaignList";
import CampaignForm from "./pages/CampaignForm";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Landing from "./pages/Landing";

import { Toaster } from "react-hot-toast";

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <Router>
        <Toaster position="top-right" />

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">

          <nav className="bg-white dark:bg-gray-800 shadow-md p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600 dark:text-white">
              Campaign Tracker
            </h1>

            <div className="flex items-center space-x-6">
              <Link className="hover:text-blue-500 text-gray-600 dark:text-gray-200" to="/app">Campaigns</Link>
              <Link className="hover:text-blue-500 text-gray-600 dark:text-gray-200" to="/app/add">Add</Link>
              <Link className="hover:text-blue-500 text-gray-600 dark:text-gray-200" to="/app/dashboard">Dashboard</Link>
              <Link className="hover:text-blue-500 text-gray-600 dark:text-gray-200" to="/app/news">News</Link>

              <button onClick={() => setDark(!dark)}>
                {dark ? (
                  <SunIcon className="w-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-6 text-gray-600" />
                )}
              </button>
            </div>
          </nav>

          <div className="p-6">
            <Routes>
  <Route path="/" element={<Landing />} />
  <Route path="/app" element={<CampaignList />} />
  <Route path="/app/add" element={<CampaignForm />} />
  <Route path="/app/edit/:id" element={<CampaignForm />} />
  <Route path="/app/dashboard" element={<Dashboard />} />
  <Route path="/app/news" element={<News />} />
</Routes>

          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
