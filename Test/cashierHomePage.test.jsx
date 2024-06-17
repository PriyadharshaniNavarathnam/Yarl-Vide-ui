import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CashierHomePage from '../src/Pages/cashierPage/cashierHomePage';
import { getMenuDetails } from '../src/services/cashierPageApi';
import '@testing-library/jest-dom';

jest.mock('../src/services/cashierPageApi');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('renders CashierHomePage and interacts with elements', async () => {
    // Mock getMenuDetails
    getMenuDetails.mockImplementation(({ setSEMenuData, setMCMenuData }) => {
      setSEMenuData([{ id: 1, name: 'Special Item' }]);
      setMCMenuData([{ id: 2, name: 'Main Course Item' }]);
    });
  
    render(
      <BrowserRouter>
        <CashierHomePage />
      </BrowserRouter>
    );
  
    // Check if header is rendered
    expect(screen.getByText(/Yarl Vibe/i)).toBeInTheDocument();
  
    // Check if cart icon is rendered and clickable
    const cartIcon = screen.getByRole('button', { name: /cart/i });
    expect(cartIcon).toBeInTheDocument();
    fireEvent.click(cartIcon);
  
    // After clicking the cart icon, check if MobileFoodOrderPage is shown
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  
    // Check if FoodMenu and FoodOrder components are rendered
    const specialItem = await screen.findByText(/Special Item/i);
    const mainCourseItem = await screen.findByText(/Main Course Item/i);
    expect(specialItem).toBeInTheDocument();
    expect(mainCourseItem).toBeInTheDocument();
  });
  