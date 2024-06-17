import React from "react";
import KitchenStaffSearchBar from "./kitchenStaffSearchBar";
import logo from "../../assets/images/IMG-20240427-WA0001_prev_ui.png"; // Adjust the path to your logo image
import "./kitchenPageHeader.css";

const KitchenPageHeader = ({ showSearchBar, setSearchText }) => {
  return (
    <div className="kitchen-page-header">
      <img src={logo} alt="Yarl VBB Logo" className="kitchen-logo" />
      <div className="kitchen-page-heading">
        <h1 className="kitchen-page-title">Orders</h1>
      </div>
      {showSearchBar && <KitchenStaffSearchBar setSearchText={setSearchText} />}
    </div>
  );
};

export default KitchenPageHeader;
