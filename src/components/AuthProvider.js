import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useRBAC } from '../utils/rbac';

// Authentication context provider
const AuthProvider = ({ children }) => {
  const router = useRouter();
  const { getAccessibleRoutes } = useRBAC();
  
  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      // Skip auth check for auth page
      if (router.pathname === '/auth') {
        return;
      }
      
      // In a real app, this would check for a valid session/token
      const user = localStorage.getItem('underground_user');
      
      if (!user) {
        // Redirect to auth page if not authenticated
        router.push('/auth');
        return;
      }
      
      const userData = JSON.parse(user);
      const accessibleRoutes = getAccessibleRoutes(userData);
      
      // Check if current route is accessible
      const isRouteAccessible = accessibleRoutes.some(route => 
        router.pathname === route || 
        router.pathname.startsWith(`${route}/`)
      );
      
      if (!isRouteAccessible) {
        // Redirect to appropriate dashboard based on role
        switch (userData.role) {
          case 'owner':
            router.push('/dashboard/owner');
            break;
          case 'manager':
            router.push('/dashboard/manager');
            break;
          case 'accountant':
            router.push('/dashboard/accountant');
            break;
          case 'staff':
            router.push('/staff/rooms');
            break;
          default:
            router.push('/');
        }
      }
    };
    
    checkAuth();
  }, [router.pathname]);
  
  return children;
};

export default AuthProvider;
