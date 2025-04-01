import { render, screen, fireEvent } from '@testing-library/react';
import Auth from '../src/pages/auth';

// Mock the auth service
jest.mock('../src/services/auth', () => ({
  loginUser: jest.fn(() => Promise.resolve({ success: true, user: { role: 'client' } })),
  registerUser: jest.fn(() => Promise.resolve({ success: true })),
}));

describe('Auth Page', () => {
  it('renders login form by default', () => {
    render(<Auth />);
    
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });

  it('switches to registration form when "Create Account" is clicked', () => {
    render(<Auth />);
    
    fireEvent.click(screen.getByText(/Create Account/i));
    
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Phone/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  it('switches back to login form when "Already have an account" is clicked', () => {
    render(<Auth />);
    
    // First switch to registration
    fireEvent.click(screen.getByText(/Create Account/i));
    
    // Then switch back to login
    fireEvent.click(screen.getByText(/Already have an account/i));
    
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument();
  });
});
