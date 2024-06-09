import React, { useState } from 'react';
import './statusButton.css';
import { getOrderData, getOrderDetails, updateOrderStatus } from '../../services/kitchenStaffPageApi';

const StatusButton = ({ foodStatus, orderID }) => {
  const [status, setStatus] = useState(foodStatus);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (loading) return; // Prevent multiple clicks while loading

    let newStatus = '';
    if (status === 'pending') {
      if (window.confirm('Are you sure you want to accept the order?')) {
        newStatus = 'processing';
      }
    } else if (status === 'processing') {
      if (window.confirm('Are you sure you want to mark the order as completed?')) {
        newStatus = 'completed';
      }
    }

    if (newStatus) {
      setLoading(true);
      try {
        const response = await updateOrderStatus({ orderID, foodStatus: newStatus });
        if (response) {
          setStatus(newStatus);
        }
      } catch (error) {
        console.error('Error updating order status:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <button
      className={`status-button ${status}`}
      onClick={handleClick}
      disabled={loading}
    >
      {status === 'pending' && 'Pending'}
      {status === 'processing' && 'Processing'}
      {status === 'completed' && 'Completed'}
      {status === 'delivered' && 'Delivered'}
      {loading && 'Updating...'}
    </button>
  );
};

export default StatusButton;
