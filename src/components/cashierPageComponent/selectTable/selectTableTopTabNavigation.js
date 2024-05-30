// TopTabNavigation.js
import React, { useState } from "react";
import "./selectTableTopTabNavigation.css"; // Import CSS for navigation bar styles

const SelectTableTopTabNavigation = ({ onSelectTab }) => {
  const [activeTab, setActiveTab] = useState("Main Floor");
  const handleTabClick = (tab) => {
    onSelectTab(tab);
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="select-table-top-tab-navigation">
      <div
        className="select-table-tab"
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
        className="select-table-tab"
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

export default SelectTableTopTabNavigation;
