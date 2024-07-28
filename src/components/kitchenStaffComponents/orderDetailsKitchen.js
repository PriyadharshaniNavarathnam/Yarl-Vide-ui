import { useState, useEffect } from 'react';
import './orderDetailsKitchen.css';
import { toast, ToastContainer } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/images/IMG-20240427-WA0001_prev_ui.png';
import ConfirmationDialog from '../DialogBox';
import { UpdateOrderStatus } from '../../services/kitchenStaffPageApi';
import { getOrderStatus } from '../../services/kitchenStaffPageApi';

const OrderDetailsKitchen = ({
  orderId,
  dateAndTime,
  setIsOrderSelected,
  ordersDetails
}) => {
  const [status, setStatus] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(() => {});

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const data = await getOrderStatus(orderId);
        if (data && data.length > 0) {
          setStatus(data[0].FoodStatus);
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, [orderId]);

  const handleButtonClick = () => {
    setDialogMessage('Are you sure you want to send Notification to waiter?');
    setDialogAction(() => () => {
      toast.success('Notification sent to waiter.');
      UpdateOrderStatus({ orderID: orderId, foodStatus: 'completed' });
    });
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    dialogAction();
    setDialogOpen(false);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const OrderDetails = ({ foodName, quantity, custermixeText }) => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleCollapse = () => {
      setCollapsed(!collapsed);
    };

    return (
      <div className="kitchen-order-food-details dark:bg-gray-700 dark:text-white">
        <div className="kitchen-sub-order-food-details dark:bg-gray-700 dark:text-white">
          <div className="kitchen-order-food-name">{foodName}</div>
          <div style={{ display: 'flex' }}>
            <div style={{ paddingRight: '30%', fontWeight: 'bold' }}>
              {quantity}
            </div>
            <span
              className={`kitchen-arrow ${collapsed ? 'kitchen-collapsed' : ''}`}
              onClick={toggleCollapse}
            >
              &#x25BC;
            </span>
          </div>
        </div>
        {!collapsed && (
          <div className="kitchen-collapsible-content">
            <p>{custermixeText === '' ? 'No Customization' : custermixeText}</p>
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

 
    <FontAwesomeIcon
      icon={faCircleXmark}
      className="kitchen-order-close-icon"
      onClick={handleCloseIconClick}
      style={{ marginRight: '10px' }} // Adjust the value as needed
    />
    <div className="kitchen-page-header dark:bg-secondary">

        <img src={logo} alt="Yarl VBB Logo" className="kitchen-page-logo" />
        <div className="kitchen-page-heading">
          <h1 className="kitchen-page-title">Order Details</h1>
        </div>
      </div>

      <div className="orderId">Order Id: {orderId}</div>
      <div className="container_date_label dark:text-white">
        <div className="name dark:text-white">Yarl Vibe</div>
        <div className="date dark:text-white">{dateAndTime}</div>
      </div>
      <div style={{ width: '100%', justifyContent: 'center', overflowY: 'auto', height: '80%' }}>
        {Object.keys(ordersDetails).map((foodKey) => (
          <div key={foodKey} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <OrderDetails
              foodName={ordersDetails[foodKey].FoodName}
              quantity={ordersDetails[foodKey].Quantity}
              custermixeText={ordersDetails[foodKey].FoodCustomizingText}
            />
          </div>
        ))}
      </div>

      {status === 'processing' && (
        <div className="notification">
          <label className="label">Send Notification To Waiter</label>
          <button className="ready-button" onClick={handleButtonClick}>
            Ready{' '}
            <FontAwesomeIcon
              icon={faArrowRight}
              className="kitchen-order-close-icon"
            />
          </button>
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

export default OrderDetailsKitchen;
