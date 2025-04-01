import { render, screen, fireEvent } from '@testing-library/react';
import Booking from '../src/pages/booking';

// Mock the booking service
jest.mock('../src/services/auth', () => ({
  checkAuth: jest.fn(() => ({ id: '123', name: 'Test User', role: 'client' })),
}));

// Mock the room service
jest.mock('../src/services/booking', () => ({
  getRoomAvailability: jest.fn(() => Promise.resolve([
    { id: '1', name: 'Neon Lounge', capacity: 8, available: true },
    { id: '2', name: 'Purple Haze', capacity: 6, available: true },
    { id: '3', name: 'Blue Velvet', capacity: 10, available: false },
    { id: '4', name: 'Midnight Oasis', capacity: 4, available: true },
  ])),
  calculatePrice: jest.fn((date, duration, persons, roomId) => {
    // Mock price calculation
    const isWeekend = [0, 6].includes(new Date(date).getDay());
    const basePrice = isWeekend ? 500000 : 375000;
    const extraPersons = Math.max(0, persons - 5);
    const extraPersonPrice = isWeekend ? 100000 : 75000;
    return (basePrice + (extraPersons * extraPersonPrice)) * duration;
  }),
  createBooking: jest.fn(() => Promise.resolve({ success: true, bookingId: 'BK-2025-0401-1' })),
}));

describe('Booking Page', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('renders the booking form', () => {
    render(<Booking />);
    
    expect(screen.getByText(/Book a Room/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Duration/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of Persons/i)).toBeInTheDocument();
  });

  it('calculates price based on inputs', async () => {
    render(<Booking />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-04-05' } }); // Saturday
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Duration/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/Number of Persons/i), { target: { value: '7' } });
    
    // Select a room
    const roomSelect = await screen.findByLabelText(/Select Room/i);
    fireEvent.change(roomSelect, { target: { value: '1' } });
    
    // Check if price is calculated correctly (weekend rate)
    // Base: 500,000 LBP, Extra persons: 2 * 100,000 LBP, Duration: 3 hours
    // Total: (500,000 + 200,000) * 3 = 2,100,000 LBP
    expect(await screen.findByText(/2,100,000 LBP/i)).toBeInTheDocument();
  });

  it('shows unavailable rooms as disabled', async () => {
    render(<Booking />);
    
    // Wait for room options to load
    const roomSelect = await screen.findByLabelText(/Select Room/i);
    
    // Get all options
    const options = Array.from(roomSelect.querySelectorAll('option'));
    
    // Find Blue Velvet option (should be disabled)
    const blueVelvetOption = options.find(option => option.textContent.includes('Blue Velvet'));
    expect(blueVelvetOption).toBeDisabled();
  });

  it('submits booking when form is valid', async () => {
    render(<Booking />);
    
    // Fill the form
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-04-05' } });
    fireEvent.change(screen.getByLabelText(/Time/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Duration/i), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText(/Number of Persons/i), { target: { value: '7' } });
    
    // Select a room
    const roomSelect = await screen.findByLabelText(/Select Room/i);
    fireEvent.change(roomSelect, { target: { value: '1' } });
    
    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Book Now/i }));
    
    // Check if booking service was called
    const bookingService = require('../src/services/booking');
    expect(bookingService.createBooking).toHaveBeenCalled();
  });
});
