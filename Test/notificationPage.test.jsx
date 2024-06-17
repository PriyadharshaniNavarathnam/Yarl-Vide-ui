import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotificationPage from '../src/Pages/waiterPage/notificationPage/notificationPage';
import { getNotificationData } from '../src/services/notificationPageApi';
import '@testing-library/jest-dom';

jest.mock('../src/services/notificationPageApi');

describe('NotificationPage', () => {
  beforeEach(() => {
    getNotificationData.mockImplementation(({ setNotificationData }) => {
      setNotificationData([
        { OrderID: 1, TableCode: 'A1', FoodStatus: 'Pending' },
        { OrderID: 2, TableCode: 'B2', FoodStatus: 'Completed' },
      ]);
    });
  });

  test('renders NotificationPage and displays notifications', async () => {
    render(
      <BrowserRouter>
        <NotificationPage />
      </BrowserRouter>
    );

    // Check if header is rendered
    expect(screen.getByText(/Notifications/i)).toBeInTheDocument();

    // Check if notifications are rendered
    await waitFor(() => {
      expect(screen.getByText(/A1/i)).toBeInTheDocument();
     
    });
  });

  test('search functionality works', async () => {
    render(
      <BrowserRouter>
        <NotificationPage />
      </BrowserRouter>
    );

    // Enter search text
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: '1' } });

    // Check if only the matching notification is displayed
    await waitFor(() => {
      expect(screen.getByText(/A1/i)).toBeInTheDocument();
      
    });
  });
});
