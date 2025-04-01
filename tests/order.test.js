import { render, screen, fireEvent } from '@testing-library/react';
import Order from '../src/pages/order';

// Mock the auth service
jest.mock('../src/services/auth', () => ({
  checkAuth: jest.fn(() => ({ id: '123', name: 'Test User', role: 'client' })),
}));

// Mock the order service
jest.mock('../src/services/order', () => ({
  getMenuItems: jest.fn(() => Promise.resolve([
    { id: '1', name: 'Arguile (Apple)', category: 'Arguile', price: 100000, available: true },
    { id: '2', name: 'Arguile (Mint)', category: 'Arguile', price: 100000, available: true },
    { id: '3', name: 'Hummus', category: 'Food', price: 75000, available: true },
    { id: '4', name: 'Chicken Wings', category: 'Food', price: 100000, available: true },
    { id: '5', name: 'Tabbouleh', category: 'Food', price: 75000, available: true },
    { id: '6', name: 'Soft Drink', category: 'Beverage', price: 30000, available: true },
  ])),
  getActiveBookings: jest.fn(() => Promise.resolve([
    { id: 'BK-2025-0401-1', room: 'Neon Lounge', startTime: '14:00', endTime: '17:00' },
  ])),
  placeOrder: jest.fn(() => Promise.resolve({ success: true, orderId: 'ORD-2025-0401-1' })),
}));

describe('Order Page', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('renders the order form', async () => {
    render(<Order />);
    
    expect(screen.getByText(/Place an Order/i)).toBeInTheDocument();
    
    // Wait for menu items to load
    expect(await screen.findByText(/Arguile \(Apple\)/i)).toBeInTheDocument();
    expect(await screen.findByText(/Hummus/i)).toBeInTheDocument();
    expect(await screen.findByText(/Soft Drink/i)).toBeInTheDocument();
  });

  it('allows adding items to cart', async () => {
    render(<Order />);
    
    // Wait for menu items to load
    await screen.findByText(/Arguile \(Apple\)/i);
    
    // Add items to cart
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[0]); // Add Arguile (Apple)
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[2]); // Add Hummus
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[5]); // Add Soft Drink
    
    // Check if items are added to cart
    expect(screen.getByText(/Your Order/i)).toBeInTheDocument();
    expect(screen.getByText(/Arguile \(Apple\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Hummus/i)).toBeInTheDocument();
    expect(screen.getByText(/Soft Drink/i)).toBeInTheDocument();
    
    // Check total price (100,000 + 75,000 + 30,000 = 205,000 LBP)
    expect(screen.getByText(/205,000 LBP/i)).toBeInTheDocument();
  });

  it('allows removing items from cart', async () => {
    render(<Order />);
    
    // Wait for menu items to load
    await screen.findByText(/Arguile \(Apple\)/i);
    
    // Add items to cart
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[0]); // Add Arguile (Apple)
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[2]); // Add Hummus
    
    // Check if items are added to cart
    expect(screen.getByText(/Arguile \(Apple\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Hummus/i)).toBeInTheDocument();
    
    // Remove Hummus from cart
    const removeButtons = screen.getAllByText(/Remove/i);
    fireEvent.click(removeButtons[1]); // Remove Hummus
    
    // Check if Hummus is removed from cart
    expect(screen.queryByText(/Hummus/i)).not.toBeInTheDocument();
    
    // Check total price (should be 100,000 LBP for just Arguile)
    expect(screen.getByText(/100,000 LBP/i)).toBeInTheDocument();
  });

  it('allows selecting a room for delivery', async () => {
    render(<Order />);
    
    // Wait for menu items to load
    await screen.findByText(/Arguile \(Apple\)/i);
    
    // Add an item to cart
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[0]); // Add Arguile (Apple)
    
    // Select room delivery option
    fireEvent.click(screen.getByLabelText(/Deliver to my room/i));
    
    // Select a room
    const roomSelect = screen.getByLabelText(/Select Room/i);
    fireEvent.change(roomSelect, { target: { value: 'BK-2025-0401-1' } });
    
    // Check if room is selected
    expect(roomSelect.value).toBe('BK-2025-0401-1');
  });

  it('allows entering delivery address', async () => {
    render(<Order />);
    
    // Wait for menu items to load
    await screen.findByText(/Arguile \(Apple\)/i);
    
    // Add an item to cart
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[0]); // Add Arguile (Apple)
    
    // Select external delivery option
    fireEvent.click(screen.getByLabelText(/Deliver to my address/i));
    
    // Enter address
    fireEvent.change(screen.getByLabelText(/Address/i), { 
      target: { value: 'Ain el Remaneh, Street 7, Building 12' } 
    });
    
    // Check if address is entered
    expect(screen.getByLabelText(/Address/i).value).toBe('Ain el Remaneh, Street 7, Building 12');
  });

  it('submits order when form is valid', async () => {
    render(<Order />);
    
    // Wait for menu items to load
    await screen.findByText(/Arguile \(Apple\)/i);
    
    // Add items to cart
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[0]); // Add Arguile (Apple)
    fireEvent.click(screen.getAllByText(/Add to Cart/i)[2]); // Add Hummus
    
    // Select room delivery option
    fireEvent.click(screen.getByLabelText(/Deliver to my room/i));
    
    // Select a room
    const roomSelect = screen.getByLabelText(/Select Room/i);
    fireEvent.change(roomSelect, { target: { value: 'BK-2025-0401-1' } });
    
    // Submit the order
    fireEvent.click(screen.getByRole('button', { name: /Place Order/i }));
    
    // Check if order service was called
    const orderService = require('../src/services/order');
    expect(orderService.placeOrder).toHaveBeenCalled();
  });
});
