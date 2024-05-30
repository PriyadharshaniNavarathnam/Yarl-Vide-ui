const API_URL ="http://localhost:5136/";
export const getNotificationData = async ({setNotificationData}) => {
    try {
      const response = await fetch(API_URL + "GetNotificationData");
      const data = await response.json();
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.DateAndTime);
        const dateB = new Date(b.DateAndTime);
        return dateB - dateA;
      });
      setNotificationData(sortedData);
      console.log("succesfully done!")
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  //Update NotificationFoodStatus
  export const updateNotificationFoodStatus = async ({orderID, foodStatus}) => {
    try {

      const response = await fetch(API_URL + "UpdateNotificationFoodStatus", {
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