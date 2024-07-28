// TopTabNavigation.js
import React, { useState } from "react";
import "./topTabNavigation.css"; // Import CSS for navigation bar styles

const TopTabNavigation = ({ onSelectTab }) => {
  const [activeTab, setActiveTab] = useState("Main Floor");
  const handleTabClick = (tab) => {
    onSelectTab(tab);
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="top-tab-navigation dark:bg-gray-700 dark:text-white py-3">
      <div
        className={`tab dark:border-amber-600 ${
          activeTab === "Main Floor"
            ? "text-white bg-[rgb(193,64,0)] dark:text-amber-700 dark:bg-orange-300"
            : "text-black bg-white dark:text-white dark:bg-gray-900"
        }`}
        onClick={() => handleTabClick("Main Floor")}
      >
        Main Floor
      </div>
      <div
        className={`tab dark:border-amber-600 ${
          activeTab === "Upper Floor"
            ? "text-white bg-[rgb(193,64,0)] dark:text-amber-700 dark:bg-orange-300"
            : "text-black bg-white dark:text-white dark:bg-gray-900"
        }`}
        onClick={() => handleTabClick("Upper Floor")}
      >
        Upper Floor
      </div>
    </div>
     
    </div>
    
  );
};

export default TopTabNavigation;
