const API_URL ="http://localhost:5136/";
//Get table details
export const getTableDetails = async ({setDataFloor0, setDataFloor1}) => {
    try {
      const response = await fetch(API_URL + "GetTableData");
      const data = await response.json();
      
  
      const floor0 = data.filter(item => item.FloorID === 0);
      const floor1 = data.filter(item => item.FloorID === 1);
  
      setDataFloor0(floor0);
      setDataFloor1(floor1);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  //Update database status

  export const updateDatabaseTableStatus = async ({tableCode, newStatus}) => {
    try {
      const response = await fetch(API_URL + "UpdateDatabaseTableStatus", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tableCode: tableCode,
          newStatus: newStatus
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
  //get notification details
  

  