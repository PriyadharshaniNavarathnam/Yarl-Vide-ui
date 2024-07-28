// TopTabNavigation.js
import React, { useState } from "react";
import "./topTabNavigation.css"; // Import CSS for navigation bar styles

const TopTabNavigationCashier = ({ onSelectTab }) => {
  const [activeTab, setActiveTab] = useState("Short Eats");
  const handleTabClickSE = () => {
    onSelectTab("Short Eats");
    setActiveTab("Short Eats");
  };
  const handleTabClickMC = () => {
    onSelectTab("Main Course");
    setActiveTab("Main Course");
  };

  return (
    <div>
      <div className="top-tab-navigation-cashier dark:bg-gray-900 dark:text-white">
        <div
          className={`tab-cashier dark:border-amber-600 ${
            activeTab === "Short Eats"
              ? "text-white bg-[rgb(193,64,0)] dark:text-amber-700 dark:bg-orange-300"
              : "text-black bg-white dark:text-white dark:bg-gray-900"
          }`}
          onClick={handleTabClickSE}
        >
          Short Eats
        </div>
        <div
          className={`tab-cashier dark:border-amber-600 ${
            activeTab === "Main Course"
              ? "text-white bg-[rgb(193,64,0)] dark:text-amber-700 dark:bg-orange-300"
              : "text-black bg-white dark:text-white dark:bg-gray-900"
          }`}
          onClick={handleTabClickMC}
        >
          Main Course
        </div>
      </div>
    </div>
  );
};

export default TopTabNavigationCashier;
