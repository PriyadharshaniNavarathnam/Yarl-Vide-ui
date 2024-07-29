import React, { useState } from 'react';
import './tableComponent.css'; 
import { updateDatabaseTableStatus } from '../../../services/tablePageApi.js';
import ConfirmationDialog from '../../DialogBox';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TableTwoChair = ({ number }) => {
  return (
    <div>
      <div className='table-twoChairs'>
        <div className='chair-right dark:bg-gray-400'></div>
        <div className='table dark:bg-gray-600'>{number}</div>
        <div className='chair-right dark:bg-gray-400'></div>
      </div>
    </div>
  );
};

const ThreeChair = () => {
  return (
    <div className='threeChairs'>
      <div className='chair-top dark:bg-gray-400'></div>
      <div className='chair-top dark:bg-gray-400'></div>
      <div className='chair-top dark:bg-gray-400'></div>
    </div>
  );
};

const TableComponent = ({ tableNumber, tableStatus, updateTableStatus }) => {
  const [localStatus, setLocalStatus] = useState(tableStatus);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [dialogAction, setDialogAction] = useState(() => () => {});

  const handleClick = () => {
    const newStatus = localStatus === "Available" ? "Busy" : "Available";
    const message = localStatus === "Available"
      ? 'Are you sure you want to change the status to Occupied?'
      : 'Are you sure you want to change the status to Available?';

    setDialogMessage(message);

    setDialogAction(() => async () => {
      try {
        // Optimistically update the local state
        setLocalStatus(newStatus);

        // Update the table status in the backend
        await updateTableStatus(tableNumber, newStatus);
        await updateDatabaseTableStatus({ tableCode: tableNumber, newStatus: newStatus });

        toast.success(`Table status changed to ${newStatus}`);
      } catch (error) {
        // Revert local state and show error message if API call fails
        setLocalStatus(tableStatus);
        console.error("Error updating table status:", error);
        toast.error("Failed to update table status.");
      }
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

  return (
    <div>
        <div className="table-container dark:bg-gray-700 dark:text-white font-semibold" onClick={handleClick}>
        <div></div>
        <div className='table-setup' style={{scale:"1.3"}}>
           <ThreeChair/>
           <TableTwoChair number={tableNumber}/>
            <ThreeChair/>
        </div>
        <div className={tableStatus=="Available"?"active-line-green":"active-line-red"} ></div>
      </div>
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

export default TableComponent;
