import { useState, useEffect } from 'react';

// Role-based access control utility
export const withRoleProtection = (Component, allowedRoles) => {
  return function ProtectedComponent(props) {
    const [authState, setAuthState] = useState({
      isLoading: true,
      isAuthenticated: false,
      user: null,
      hasAccess: false
    });

    useEffect(() => {
      // Check authentication
      const checkAuthentication = () => {
        try {
          // In a real app, this would be a proper auth check
          const user = localStorage.getItem('underground_user');
          
          if (!user) {
            setAuthState({
              isLoading: false,
              isAuthenticated: false,
              user: null,
              hasAccess: false
            });
            return;
          }
          
          const userData = JSON.parse(user);
          const hasAccess = allowedRoles.includes(userData.role);
          
          setAuthState({
            isLoading: false,
            isAuthenticated: true,
            user: userData,
            hasAccess
          });
        } catch (error) {
          console.error('Authentication check failed:', error);
          setAuthState({
            isLoading: false,
            isAuthenticated: false,
            user: null,
            hasAccess: false
          });
        }
      };
      
      checkAuthentication();
    }, []);

    if (authState.isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[rgba(5,0,30,0.9)]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-uv-purple"></div>
            <p className="mt-4 text-white">Loading...</p>
          </div>
        </div>
      );
    }

    if (!authState.isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[rgba(5,0,30,0.9)]">
          <div className="text-center p-8 bg-[rgba(15,10,40,0.7)] rounded-lg shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
            <h2 className="text-2xl font-bold neon-text mb-4">Authentication Required</h2>
            <p className="text-white mb-6">Please log in to access this page.</p>
            <a 
              href="/auth" 
              className="btn-primary"
            >
              Go to Login
            </a>
          </div>
        </div>
      );
    }

    if (!authState.hasAccess) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[rgba(5,0,30,0.9)]">
          <div className="text-center p-8 bg-[rgba(15,10,40,0.7)] rounded-lg shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
            <h2 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h2>
            <p className="text-white mb-6">You don't have permission to access this page.</p>
            <a 
              href="/" 
              className="btn-primary"
            >
              Go to Home
            </a>
          </div>
        </div>
      );
    }

    return <Component {...props} user={authState.user} />;
  };
};

// Check if user has specific permissions
export const usePermissions = () => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // In a real app, this would be a proper auth check
    const userData = localStorage.getItem('underground_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const hasPermission = (permission) => {
    if (!user) return false;
    
    // Role-based permissions
    const rolePermissions = {
      owner: ['manage_users', 'manage_roles', 'view_all_reports', 'manage_inventory', 'manage_bookings', 'manage_orders', 'manage_staff', 'manage_finances'],
      manager: ['manage_bookings', 'manage_orders', 'manage_staff', 'view_manager_reports'],
      accountant: ['manage_inventory', 'manage_finances', 'view_accountant_reports'],
      staff: ['process_orders', 'handle_bookings', 'view_staff_reports'],
      client: ['make_bookings', 'place_orders', 'view_own_history']
    };
    
    return rolePermissions[user.role]?.includes(permission) || false;
  };
  
  return { user, hasPermission };
};
