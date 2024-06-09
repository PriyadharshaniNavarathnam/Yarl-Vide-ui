import {  useState } from "react";
import "./orderDetailsKitchen.css";
import { toast ,ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import { faArrowRight} from "@fortawesome/free-solid-svg-icons";
//import './Notification.css'; // Import your CSS file for styling

const OrderDetailsKitchen = ({
  orderId,
  dateAndTime,
  setIsOrderSelected,
  ordersDetails,
}) => {
  
  const handleButtonClick = () => {
    toast.success('Notification was sent to waiter.', {
      position: 'top-right', // Specify the position directly as a string
      autoClose: 3000,
    });
  };
  const OrderDetails = ({ foodName, quantity, custermixeText }) => {
    const [collapsed, setCollapsed] = useState(true);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };
    return (
      <div className="kitchen-order-food-details">
        <div className="kitchen-sub-order-food-details">
          <div className="kitchen-order-food-name">{foodName}</div>
          <div style={{ display: "flex" }}>
            <div style={{ paddingRight: "30%", fontWeight: "bold" }}>
              {quantity}
            </div>
            <span
              className={`kitchen-arrow ${
                collapsed ? "kitchen-collapsed" : ""
              }`}
              onClick={toggleCollapse}
            >
              &#x25BC;
            </span>
          </div>
        </div>
        {!collapsed && (
          <div className="kitchen-collapsible-content">
            <p>{custermixeText===""?"No Custermization":custermixeText}</p>
          </div>
        )}
      </div>
    );
  };
  const handleCloseIconClick = () => {
    setIsOrderSelected(false);
  };

  return (
    
    <div className="kitchen-order-details-kitchen">
     <div className="order-details-container">
      <label className="order-details-label">Order Details</label>
      <FontAwesomeIcon
        icon={faCircleXmark}
        className="kitchen-order-close-icon"
        onClick={handleCloseIconClick}
      />
    </div>
    <div className="orderId">Order Id: {orderId}</div>
    <div className="container_date_label">
      <div className="name">Yarl Vibe</div>
      <div className="date">{dateAndTime}</div>
    </div>
      
     <div style={{width:"100%",justifyContent:"center", overflowY:"auto", height:"80%"}}>
     {Object.keys(ordersDetails).map((foodKey) => (
        <div key={foodKey} style={{width:"100%",display:"flex",justifyContent:"center"}}>
          <OrderDetails
            foodName={ordersDetails[foodKey].FoodName}
            quantity={ordersDetails[foodKey].Quantity}
            custermixeText={ordersDetails[foodKey].FoodCustomizingText}
          />
        </div>
      ))}
     </div>
     <label className="label">Send Notification To Waiter</label>
     <button className="ready-button" onClick={handleButtonClick}>
      Ready{' '}
      <FontAwesomeIcon
        icon={faArrowRight}
        className="kitchen-order-close-icon"
        onClick={handleCloseIconClick}
      />
    </button>
   
    </div>
  );
};
export default OrderDetailsKitchen;