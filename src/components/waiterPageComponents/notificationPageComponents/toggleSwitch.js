import "./toggleSwitch.css";
import React, { useState } from 'react';
import { updateNotificationFoodStatus } from "../../../services/notificationPageApi";
import ConfirmationDialog from '../../DialogBox';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToggleSwitch = ({ label, foodStatus, orderID }) => {
  const [isChecked, setIsChecked] = useState(foodStatus === "delivered");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(() => () => {});

  const handleToggle = async () => {
    if (!isChecked) {
      setDialogMessage('Are you sure you want to change status to delivered?');
      setDialogAction(() => async () => {
        try {
          await updateNotificationFoodStatus({ orderID, foodStatus: 'delivered' });
          setIsChecked(true); // Update local state
         
        } catch (error) {
          console.error("Error updating food status:", error);
          toast.error("Failed to update order status.");
        }
      });
      setDialogOpen(true);
    } else {
      toast.error("Order already delivered!");
    }
  };

  const handleConfirm = () => {
    dialogAction();
    setDialogOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      {foodStatus === "processing" ? (
        <div style={{ color: "red", fontSize: "100%" }}>Processing</div>
      ) : (
        <div className="toggle-switch-container">
          <div className="toggle-switch">
            <input
              type="checkbox"
              className="checkbox"
              name={label}
              id={label}
              onChange={handleToggle}
              checked={isChecked}
            />
            <label className="label" htmlFor={label}>
              <span className="inner" />
              <span className="switch" />
            </label>
          </div>
        </div>
      )}
      <ToastContainer />
      <ConfirmationDialog
        open={dialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        message={dialogMessage}
      />
    </div>
  );
};

export default ToggleSwitch;
