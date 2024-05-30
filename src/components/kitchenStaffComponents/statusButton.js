import React, { useState } from 'react';
import './statusButton.css';
import { UpdateOrderStatus } from '../../services/kitchenStaffPageApi';

const StatusButton = ({foodStatus, orderID}) => {
  const [status, setStatus] = useState(foodStatus);

  const handleClick = () => {
    if (status === 'pending') {
      if (window.confirm('Are you sure you want to accept the order?')) {
        setStatus('processing');
        UpdateOrderStatus({orderID:orderID, foodStatus:'processing'})
      }
    } else if (status === 'processing') {
      if (window.confirm('Are you sure you want to mark the order as completed?')) {
        setStatus('completed');
       UpdateOrderStatus({orderID:orderID, foodStatus:'completed'})
      }
    } 
  };

  return (
    <button
      className={`status-button ${status}`}
      onClick={handleClick}
    >
      {status === 'pending' && 'Pending'}
      {status === 'processing' && 'Processing'}
      {status === 'completed' && 'Completed'}
      {status === 'delivered' && 'Delivered'}
    </button>
  );
};

export default StatusButton;
