import React, { useState } from 'react';

const OrderRow = ({ order, onClick }) => (
  <tr onClick={() => onClick(order)} style={styles.row}>
    <td style={styles.cell}>{order.orderId}</td>
    <td style={styles.cell}>{order.date}</td>
    <td style={{ ...styles.cell, color: getStatusColor(order.status) }}>{order.status}</td>
  </tr>
);

const getStatusColor = (status) => {
  switch (status) {
    case 'Processing':
      return 'orange';
    case 'Ready':
      return 'blue';
    case 'Complete':
      return 'green';
    default:
      return 'black';
  }
};

const OrderDetails = () => {
  const [orders, setOrders] = useState([
    { orderId: 'O01', date: '2024-05-01', status: 'Processing', details: 'Details for order O01' },
    { orderId: 'O02', date: '2024-05-02', status: 'Ready', details: 'Details for order O02' },
    { orderId: 'O03', date: '2024-05-03', status: 'Complete', details: 'Details for order O03' },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div style={styles.container}>
      <div style={{ ...styles.mainContent, width: selectedOrder ? '70%' : '100%' }}>
        <h2 style={styles.header}>Order Details</h2>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={styles.cell}>Order ID</th>
              <th style={styles.cell}>Date</th>
              <th style={styles.cell}>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <OrderRow key={order.orderId} order={order} onClick={handleRowClick} />
            ))}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <div style={styles.detailView}>
          <h3 style={styles.detailHeader}>Order {selectedOrder.orderId} Details</h3>
          <p>{selectedOrder.details}</p>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
  },
  mainContent: {
    transition: 'width 0.3s',
  },
  header: {
    margin: '20px 0',
    fontSize: '24px',
    color: '#333',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
  },
  thead: {
    backgroundColor: '#f2f2f2',
  },
  cell: {
    border: '1px solid #ccc',
    padding: '8px',
    textAlign: 'left',
  },
  row: {
    cursor: 'pointer',
  },
  detailView: {
    width: '30%',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    boxSizing: 'border-box',
    borderLeft: '1px solid #ccc',
  },
  detailHeader: {
    fontSize: '20px',
    marginBottom: '10px',
  },
};

export default OrderDetails;
