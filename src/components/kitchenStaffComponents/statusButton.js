import React, { useState } from 'react';
import './statusButton.css';
import { UpdateOrderStatus } from '../../services/kitchenStaffPageApi';
import ConfirmationDialog from '../DialogBox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const StatusButton = ({ foodStatus, orderID }) => {
  const [status, setStatus] = useState(foodStatus);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(() => {});

  const handleClick = () => {
    if (status === 'pending') {
      setDialogMessage('Are you sure you want to accept the order?');
      setDialogAction(() => () => {
        setStatus('processing');
        UpdateOrderStatus({ orderID: orderID, foodStatus: 'processing' });
        
      });
      setDialogOpen(true);
    }  else if (status === 'completed' ) {
      toast.error("Order has already been Completed.");
    } else if (status === 'delivered' ) {
      toast.error("Order has already been delivered.");
    } 
    setTimeout(() => {
      window.location.reload();
    }, 3000);
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
      <button className={`status-button ${status}`} onClick={handleClick}>
        {status === 'pending' && 'Pending'}
        {status === 'processing' && 'Processing'}
        {status === 'completed' && 'Completed'}
        {status === 'delivered' && 'Delivered'}
      </button>
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

export default StatusButton;
