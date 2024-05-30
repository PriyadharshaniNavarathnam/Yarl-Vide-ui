// App.js
import React, { useEffect, useState } from 'react';
import TopTabNavigation from '../../../components/waiterPageComponents/tablePageComponent/topTabNavigation';
import "./tablePage.css"
import MainFloor from '../../../components/waiterPageComponents/tablePageComponent/mainFloor';
import UpperFloor from '../../../components/waiterPageComponents/tablePageComponent/upperFloor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {getTableDetails} from '../../../services/tablePageApi.js'
const WaiterTablePage = () => {
  //Calling Api
  const [dataFloor0, setDataFloor0] = useState([]);
  const [dataFloor1, setDataFloor1] = useState([]);
  

useEffect(() => {
  getTableDetails({setDataFloor0,setDataFloor1});
}, []);

const updateTableStatusFloor0 = ( TableCode, newStatus) => {
  const updatedDataFloor0 = dataFloor0.map(table => {
    if (table.TableCode === TableCode) {
      return { ...table, TableStatus: newStatus };
    }
    return table;
  });
  setDataFloor0(updatedDataFloor0);
};
const updateTableStatusFloor1 = ( TableCode, newStatus) => {
  const updatedDataFloor1 = dataFloor1.map(table => {
    if (table.TableCode === TableCode) {
      return { ...table, TableStatus: newStatus };
    }
    return table;
  });
  setDataFloor1(updatedDataFloor1);
};
  //////////////////
  const [selectedTab, setSelectedTab] = useState('Main Floor');
  const navigate = useNavigate();
  const handleBellIconClick = () => {
    navigate('/waiter-page/notification-page');
  };
  

  return (
    
      <div>
         <div  className="tableHeader" >
            <h1  className='title'>Tables</h1>
            {/* Pass a function to onClick */}
            <FontAwesomeIcon icon={faBell} className="notification-icon" onClick={handleBellIconClick} />
          </div>
          <div>
            <TopTabNavigation onSelectTab={setSelectedTab} />
            {selectedTab === 'Main Floor' && <MainFloor data={dataFloor0} updateTableStatus={updateTableStatusFloor0}/>}
            {selectedTab === 'Upper Floor' && <UpperFloor data={dataFloor1} updateTableStatus={updateTableStatusFloor1}/>}
          </div>
      </div>
    
  );
};

export default WaiterTablePage;
