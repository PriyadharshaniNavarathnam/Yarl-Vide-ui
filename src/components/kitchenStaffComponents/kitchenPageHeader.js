import { useState } from "react";
import KitchenStaffSearchBar from "./kitchenStaffSearchBar";
import "./kitchenPageHeader.css"

const KitchenPageHeader=({setSearchText})=>{
    return (
        <div  className="kitchen-page-header" >
            <h1 className="kitchen-page-title">Orders</h1>
            <KitchenStaffSearchBar setSearchText={setSearchText}/>
          </div>
    );
}
export default KitchenPageHeader;