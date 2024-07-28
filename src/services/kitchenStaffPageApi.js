
const API_URL ="http://localhost:5136/";
//Get Order Data
export const getOrderData = async ({ setOrderData, setFoodStatus }) => {
  try {
    const response = await fetch(API_URL + "GetOrdersData");
    const data = await response.json();
    
    // Extract the FoodStatus from the first order; adjust if needed
    const status = data.length > 0 ? data[0].FoodStatus : '';
    setOrderData(data);
    setFoodStatus(status);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

export const getOrderStatus = async (orderId) => {
  try {
    const response = await fetch(`${API_URL}GetOrderStatus/${orderId}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch details:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching details:", error);
    return null;
  }
};
  //Update order status
  export const UpdateOrderStatus = async ({orderID, foodStatus}) => {
    try {

      const response = await fetch(API_URL + "UpdateOrderStatus", {
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

        console.log('TableStatus updated successfully!');
        // Refresh data after update

      } else {
        console.error('Failed to update TableStatus:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating TableStatus:', error);
    }
  };
  // Get orders details
  export const getOrderDetails = async (orderID) => {
    try {
      const response = await fetch(`${API_URL}GetOrderDetails/${orderID}`);
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

 