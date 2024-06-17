import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import KitchenStaffPage from '../src/Pages/kitchenStaffPage/kitchenStaffPage';
import { getOrderData } from '../src/services/kitchenStaffPageApi';
import '@testing-library/jest-dom';

jest.mock('../src/services/kitchenStaffPageApi');

describe('KitchenStaffPage', () => {
  beforeEach(() => {
    getOrderData.mockImplementation(({ setOrderData }) => {
      setOrderData([
        { OrderID: 1, DateAndTime: '2023-06-16T12:00:00', FoodStatus: 'Pending' },
        { OrderID: 2, DateAndTime: '2023-06-16T13:00:00', FoodStatus: 'Completed' },
      ]);
    });
  });

  test('renders KitchenStaffPage and displays orders', async () => {
    render(
      <BrowserRouter>
        <KitchenStaffPage />
      </BrowserRouter>
    );

    // Check if header is rendered
    expect(screen.getByText(/OrderID/i)).toBeInTheDocument();

    // Check if orders are rendered
    const order1 = await screen.findByText(/1/i);
    const order2 = await screen.findByText(/2/i);
    expect(order1).toBeInTheDocument();
    expect(order2).toBeInTheDocument();
  });

  test('search functionality works', async () => {
    render(
      <BrowserRouter>
        <KitchenStaffPage />
      </BrowserRouter>
    );

    // Enter search text
    const searchInput = screen.getByRole('textbox');
    fireEvent.change(searchInput, { target: { value: '1' } });

    // Check if only the matching order is displayed
    const order1 = await screen.findByText(/1/i);
    expect(order1).toBeInTheDocument();
    expect(screen.queryByText(/2/i)).not.toBeInTheDocument();
  });

  test('order selection works', async () => {
    render(
      <BrowserRouter>
        <KitchenStaffPage />
      </BrowserRouter>
    );

    // Click on an order to select it
    const order1 = await screen.findByText(/1/i);
    fireEvent.click(order1);

    // Check if OrderDetailsKitchen is displayed
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });
});
