

const API_URL ="http://localhost:5136/";
//Get Menu Details
export const getMenuDetails = async ({setSEMenuData, setMCMenuData}) => {
    try {
      const response = await fetch(API_URL + "GetMenuData");
      const data = await response.json();
      
  
      const seMenu = data.filter(item => item.KitchenID === 0);
      const mcMenu = data.filter(item => item.KitchenID === 1);
  
      setSEMenuData(seMenu);
      setMCMenuData(mcMenu);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //Add Order
  export const addOrder = async (orderData) => {
    try {
      const response = await fetch(API_URL + "AddOrder", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData["orderData"])
      });
      if (response.ok) {
        console.log('Order added successfully!');
        // Optionally, you can return the response data
        // const responseData = await response.json();
        // return responseData;
      } else {
        console.log(orderData["orderData"]);
        console.log(
            {
                "dateAndTime": "2024-05-12T12:20:21.127Z",
                "tableCode": "string",
                "cashPaid": 0,
                "balance": 0,
                "totalPrice": 0,
                "foodStatus": "string",
                "orderDetails": [
                  {
                    "menuItemID": 1,
                    "quantity": 0,
                    "price": 0,
                    "singlePrice": 0,
                    "name": "string",
                    "custermizeText": "string"
                  },
                  {
                    "menuItemID": 1,
                    "quantity": 0,
                    "price": 0,
                    "singlePrice": 0,
                    "name": "string",
                    "custermizeText": "string"
                  }
                ]
              }
        )
        console.error('Failed to add order:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };
  