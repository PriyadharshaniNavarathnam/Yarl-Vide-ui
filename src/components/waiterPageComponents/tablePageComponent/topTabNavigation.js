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
      <div className="top-tab-navigation">
      <div
        className="tab"
        style={{
          color: activeTab == "Main Floor" ? "white" : "black",
          backgroundColor:
            activeTab == "Main Floor" ? "rgb(193, 64, 0)" : "white",
        }}
        onClick={() => handleTabClick("Main Floor")}
      >
        Main Floor
      </div>
      <div
        className="tab"
        style={{
          color: activeTab == "Upper Floor" ? "white" : "black",
          backgroundColor:
            activeTab == "Upper Floor" ? "rgb(193, 64, 0)" : "white",
        }}
        onClick={() => handleTabClick("Upper Floor")}
      >
        Upper Floor
      </div>
    </div>
     
    </div>
    
  );
};

export default TopTabNavigation;
