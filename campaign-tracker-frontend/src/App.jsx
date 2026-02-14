import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  MoonIcon,
  SunIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import CampaignList from "./pages/CampaignList";
import CampaignForm from "./pages/CampaignForm";
import Dashboard from "./pages/Dashboard";
import News from "./pages/News";
import Landing from "./pages/Landing";
import { Toaster } from "react-hot-toast";

function Navbar({ dark, setDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Campaigns", path: "/app" },
    { name: "Add", path: "/app/add" },
    { name: "Dashboard", path: "/app/dashboard" },
    { name: "News", path: "/app/news" },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4 sticky top-0 z-50">
      <div className="flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600 dark:text-white">
          Campaign Tracker
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`transition font-medium ${
                location.pathname === link.path
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-200 hover:text-blue-500"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <button onClick={() => setDark(!dark)}>
            {dark ? (
              <SunIcon className="w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 text-gray-600 dark:text-gray-200" />
            )}
          </button>
        </div>

        {/* Mobile Controls */}
        <div className="md:hidden flex items-center space-x-4">

          <button onClick={() => setDark(!dark)}>
            {dark ? (
              <SunIcon className="w-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 text-gray-600 dark:text-gray-200" />
            )}
          </button>

          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <XMarkIcon className="w-7 text-gray-700 dark:text-white" />
            ) : (
              <Bars3Icon className="w-7 text-gray-700 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`font-medium ${
                location.pathname === link.path
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-600 dark:text-gray-200 hover:text-blue-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

function App() {
  const [dark, setDark] = useState(false);

  return (
    <div className={dark ? "dark" : ""}>
      <Router>
        <Toaster position="top-right" />

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">

          <Navbar dark={dark} setDark={setDark} />

          <div className="p-6 max-w-7xl mx-auto">
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
