import { useState } from "react";
import KitchenStaffSearchBar from "./kitchenStaffSearchBar";
import "./kitchenPageHeader.css"
import { logout } from "../../services/loginPageApi";

const KitchenPageHeader=({setSearchText})=>{
    return (
        <div  className="kitchen-page-header" >
            <h1 className="kitchen-page-title"  onClick={logout}>Orders</h1>
            <KitchenStaffSearchBar setSearchText={setSearchText}/>
          </div>
    );
}
export default KitchenPageHeader;