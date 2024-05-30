import React from 'react';
import './tableComponent.css'; 
import {updateDatabaseTableStatus} from '../../../services/tablePageApi.js'
const TableTwoChair=({number})=>{
    return <div >
         <div className='table-twoChairs'>
        <div className='chair-right'> </div>
        <div className='table'>{number}</div>
        <div className='chair-right'> </div>
        </div>
    </div>
       
    
}
const ThreeChair =()=>{
    return <div className='threeChairs'>
    <div className='chair-top'></div>
    <div className='chair-top'></div>
    <div className='chair-top'></div>
</div>
}
const TableComponent = ({ tableNumber, tableStatus, updateTableStatus }) => {
  
  
  const HandleClick=()=>{
    const confirmToggle = window.confirm(tableStatus=="Available"?'Are you sure you want to change status to Occupied?':'Are you sure you want to change status to Available?');
    if (confirmToggle) {
      const newStatus = tableStatus=="Available"?"Busy":"Available"
      updateTableStatus(tableNumber,newStatus );
      updateDatabaseTableStatus({ tableCode: tableNumber, newStatus: newStatus });
    } else {
      //document.getElementById('checkbox').checked = false;
    }
   
  }
  return (
    <div className="table-container" onClick={HandleClick}>
        <div></div>
        <div className='table-setup' style={{scale:"1.3"}}>
           <ThreeChair/>
           <TableTwoChair number={tableNumber}/>
            <ThreeChair/>
        </div>
        <div className={tableStatus=="Available"?"active-line-green":"active-line-red"} ></div>
      
    </div>
  );
};


export default TableComponent;
