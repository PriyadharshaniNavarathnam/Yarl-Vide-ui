const API_URL ="http://localhost:5136/";
//Get Order Data
export const getOrderData = async ({setOrderData}) => {
    try {
      const response = await fetch(API_URL + "GetOrdersData");
      const data = await response.json();
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.DateAndTime);
        const dateB = new Date(b.DateAndTime);
        return dateB - dateA;
      });
      setOrderData(sortedData);
    } catch (error) {
      console.error('Error fetching data:', error);
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
  