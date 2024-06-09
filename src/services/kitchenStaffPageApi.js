









const API_URL = "http://localhost:5136/api/";

// Get Order Data
export const getOrderData = async ({ setOrderData }) => {
  try {
    const response = await fetch(`${API_URL}KitchenStaff/GetOrdersData`);
    if (response.ok) {
      const data = await response.json();
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.DateAndTime);
        const dateB = new Date(b.DateAndTime);
        return dateB - dateA;
      });
      setOrderData(sortedData);
    } else {
      console.error('Failed to fetch orders data:', response.statusText);
    }
  } catch (error) {
    console.error('Error fetching orders data:', error);
  }
};

// Update Order Status
export const updateOrderStatus = async ({ orderID, foodStatus }) => {
  try {
    const response = await fetch(`${API_URL}UpdateOrderStatus/UpdateOrderStatus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        orderID: orderID,
        foodStatus: foodStatus
      })
    });

    if (response.ok) {
      console.log('Order status updated successfully!');
      // Optionally, refresh data after update
    } else {
      console.error('Failed to update order status:', response.statusText);
    }
  } catch (error) {
    console.error('Error updating order status:', error);
  }
};

// Get Order Details
export const getOrderDetails = async (orderID) => {
  try {
    const response = await fetch(`${API_URL}OrderDetails/GetOrderDetails/${orderID}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch order details:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching order details:", error);
    return null;
  }
};
