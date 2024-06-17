import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import WaiterTablePage from '../src/Pages/waiterPage/tablePage/tablePage';
import { getTableDetails } from '../src/services/tablePageApi';
import '@testing-library/jest-dom';

jest.mock('../src/services/tablePageApi');

describe('WaiterTablePage', () => {
  beforeEach(() => {
    getTableDetails.mockImplementation(({ setDataFloor0, setDataFloor1 }) => {
      setDataFloor0([
        { TableCode: 'T1', TableStatus: 'Free' },
        { TableCode: 'T2', TableStatus: 'Occupied' },
      ]);
      setDataFloor1([
        { TableCode: 'U1', TableStatus: 'Free' },
        { TableCode: 'U2', TableStatus: 'Occupied' },
      ]);
    });
  });

  test('renders WaiterTablePage and displays tables', async () => {
    render(
      <BrowserRouter>
        <WaiterTablePage />
      </BrowserRouter>
    );

    // Check if header is rendered
    expect(screen.getByText(/Tables/i)).toBeInTheDocument();

    // Check if notification icon is rendered
    expect(screen.getByRole('button', { name: /notification-icon/i })).toBeInTheDocument();

    // Check if tables are rendered for Main Floor
    await waitFor(() => {
      expect(screen.getByText(/T1/i)).toBeInTheDocument();
      
    });
  });

  test('tab navigation works', async () => {
    render(
      <BrowserRouter>
        <WaiterTablePage />
      </BrowserRouter>
    );

    // Click on Upper Floor tab
    fireEvent.click(screen.getByText(/Upper Floor/i));

    // Check if tables are rendered for Upper Floor
    await waitFor(() => {
      expect(screen.getByText(/U1/i)).toBeInTheDocument();
      
    });
  });

  test('notification icon click navigates to notification page', () => {
    const navigate = jest.fn();
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => navigate,
    }));

    render(
      <BrowserRouter>
        <WaiterTablePage />
      </BrowserRouter>
    );

    // Click on notification icon
    fireEvent.click(screen.getByRole('button', { name: /notification-icon/i }));

    // Check if navigate function is called with correct path
    expect(navigate).toHaveBeenCalledWith('/waiter-page/notification-page');
  });

  test('updates table status', async () => {
    render(
      <BrowserRouter>
        <WaiterTablePage />
      </BrowserRouter>
    );

    // Update table status for Main Floor
    fireEvent.click(screen.getByText(/T1/i));
    await waitFor(() => {
      expect(screen.getByText(/Free/i)).toBeInTheDocument();  // Assuming Free status is displayed
    });
  });
});
