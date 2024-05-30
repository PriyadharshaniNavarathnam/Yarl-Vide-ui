import "./toggleSwitch.css";
import React, { useState } from 'react';
import { updateNotificationFoodStatus } from "../../../services/notificationPageApi";

 
const ToggleSwitch = ({label,foodStatus,orderID}) => {
  const [isChecked, setIsChecked] = useState(foodStatus==="delivered"?true:false);
      const handleToggle = () => {
        if(!isChecked){
          const confirmToggle = window.confirm('Are you sure you want to change status to delivered?');
        if (confirmToggle) {
          updateNotificationFoodStatus({orderID:orderID, foodStatus:'delivered'})
          setIsChecked(true);
          
        }
        }else{
          alert("Order already delivered!!")
        }
      };
 

  return (
    <div>
      {foodStatus==="processing"?<div style={{color:"red", fontSize:"100%"}} >Processing </div> :<div className="toggle-switch-container"  >
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox"
               name={label} id={label} onChange={handleToggle} checked={isChecked}/>
        <label className="label" htmlFor={label} >
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>}
    </div>
  );
};
 
export default ToggleSwitch;