import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  // Example progress data
  const progressData = [
    { label: "Posts Completed", value: 70 },
    { label: "Tasks Completed", value: 45 },
    { label: "Analytics Viewed", value: 90 },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-black/90 text-white border-r border-pink-400/30 backdrop-blur-md p-6 transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:translate-x-0`}
    >
      {/* User Profile */}
      <div className="flex flex-col items-center mb-8">
        <FaUserCircle className="text-pink-400 w-16 h-16 mb-2" />
        <h2 className="text-white font-bold text-lg">John Doe</h2>
        <p className="text-pink-300 text-sm">Admin</p>
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-4 mb-6">
        <button className="text-left px-3 py-2 rounded-lg hover:bg-pink-500/30 transition-colors">
          Home
        </button>
        <button className="text-left px-3 py-2 rounded-lg hover:bg-pink-500/30 transition-colors">
          Analytics
        </button>
        <button className="text-left px-3 py-2 rounded-lg hover:bg-pink-500/30 transition-colors">
          Posts
        </button>
        <button className="text-left px-3 py-2 rounded-lg hover:bg-pink-500/30 transition-colors">
          Settings
        </button>
      </nav>

      {/* Progress Bars */}
      <div className="flex flex-col gap-4">
        {progressData.map((item, idx) => (
          <div key={idx}>
            <p className="text-sm text-pink-300 mb-1">{item.label}</p>
            <div className="bg-gray-800 rounded-full h-3 w-full overflow-hidden">
              <div
                className="bg-pink-500 h-3 rounded-full"
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="absolute top-4 right-[-40px] sm:hidden bg-pink-500 p-2 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-bold">{isOpen ? "<" : ">"}</span>
      </button>
    </aside>
  );
};

export default Sidebar;
