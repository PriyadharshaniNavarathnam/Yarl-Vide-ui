import React, { useState } from 'react';

const PageWithSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          flexGrow: 1,
          transition: 'margin-right 0.3s ease',
          marginRight: isSidebarOpen ? '20%' : '0', // Adjust width of sidebar
        }}
      >
        <h1>Main Page Content</h1>
        <button onClick={toggleSidebar}>Open Sidebar</button>
      </div>
      <div
        style={{
          width: '20%', // Width of the sidebar
          backgroundColor: 'lightgray',
          transition: 'transform 0.3s ease',
          transform: isSidebarOpen ? 'translateX(0)' : 'translateX(100%)', // Slide in from the right
        }}
      >
        <h2>Side Detail Page</h2>
      </div>
    </div>
  );
};

export default PageWithSidebar;
