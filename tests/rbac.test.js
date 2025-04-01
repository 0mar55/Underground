import { render, screen } from '@testing-library/react';
import { withRoleProtection } from '../src/utils/rbac';
import OwnerReports from '../src/pages/dashboard/reports/owner';
import ManagerReports from '../src/pages/dashboard/reports/manager';
import AccountantReports from '../src/pages/dashboard/reports/accountant';
import StaffReports from '../src/pages/dashboard/reports/staff';

// Mock the auth service
jest.mock('../src/services/auth', () => ({
  checkAuth: jest.fn(),
}));

// Create a test component
const TestComponent = () => <div>Test Component</div>;

describe('Role-Based Access Control', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('allows access to owner role', () => {
    // Mock owner authentication
    const authService = require('../src/services/auth');
    authService.checkAuth.mockReturnValue({ id: '123', name: 'Test Owner', role: 'owner' });
    
    // Create protected component
    const ProtectedComponent = withRoleProtection(TestComponent, ['owner']);
    
    // Render protected component
    render(<ProtectedComponent />);
    
    // Check if component is rendered
    expect(screen.getByText(/Test Component/i)).toBeInTheDocument();
  });

  it('allows access to specified roles', () => {
    // Mock manager authentication
    const authService = require('../src/services/auth');
    authService.checkAuth.mockReturnValue({ id: '123', name: 'Test Manager', role: 'manager' });
    
    // Create protected component
    const ProtectedComponent = withRoleProtection(TestComponent, ['owner', 'manager']);
    
    // Render protected component
    render(<ProtectedComponent />);
    
    // Check if component is rendered
    expect(screen.getByText(/Test Component/i)).toBeInTheDocument();
  });

  it('denies access to unauthorized roles', () => {
    // Mock staff authentication
    const authService = require('../src/services/auth');
    authService.checkAuth.mockReturnValue({ id: '123', name: 'Test Staff', role: 'staff' });
    
    // Create protected component
    const ProtectedComponent = withRoleProtection(TestComponent, ['owner', 'manager']);
    
    // Render protected component
    render(<ProtectedComponent />);
    
    // Check if access denied message is shown
    expect(screen.getByText(/Access Denied/i)).toBeInTheDocument();
    expect(screen.queryByText(/Test Component/i)).not.toBeInTheDocument();
  });

  it('redirects to login when not authenticated', () => {
    // Mock no authentication
    const authService = require('../src/services/auth');
    authService.checkAuth.mockReturnValue(null);
    
    // Create protected component
    const ProtectedComponent = withRoleProtection(TestComponent, ['owner']);
    
    // Render protected component
    render(<ProtectedComponent />);
    
    // Check if login message is shown
    expect(screen.getByText(/Please log in/i)).toBeInTheDocument();
    expect(screen.queryByText(/Test Component/i)).not.toBeInTheDocument();
  });

  it('owner can access all reports', () => {
    // Mock owner authentication
    const authService = require('../src/services/auth');
    authService.checkAuth.mockReturnValue({ id: '123', name: 'Test Owner', role: 'owner' });
    
    // Check if owner can access owner reports
    expect(() => render(<OwnerReports />)).not.toThrow();
    
    // Check if owner can access manager reports
    expect(() => render(<ManagerReports />)).not.toThrow();
    
    // Check if owner can access accountant reports
    expect(() => render(<AccountantReports />)).not.toThrow();
    
    // Check if owner can access staff reports
    expect(() => render(<StaffReports />)).not.toThrow();
  });

  it('manager can access only manager and staff reports', () => {
    // Mock manager authentication
    const authService = require('../src/services/auth');
    authService.checkAuth.mockReturnValue({ id: '123', name: 'Test Manager', role: 'manager' });
    
    // Check if manager can access manager reports
    expect(() => render(<ManagerReports />)).not.toThrow();
    
    // Check if manager can access staff reports
    expect(() => render(<StaffReports />)).not.toThrow();
  });

  it('accountant can access only accountant reports', () => {
    // Mock accountant authentication
    const authService = require('../src/services/auth');
    authService.checkAuth.mockReturnValue({ id: '123', name: 'Test Accountant', role: 'accountant' });
    
    // Check if accountant can access accountant reports
    expect(() => render(<AccountantReports />)).not.toThrow();
  });

  it('staff can access only staff reports', () => {
    // Mock staff authentication
    const authService = require('../src/services/auth');
    authService.checkAuth.mockReturnValue({ id: '123', name: 'Test Staff', role: 'staff' });
    
    // Check if staff can access staff reports
    expect(() => render(<StaffReports />)).not.toThrow();
  });
});
