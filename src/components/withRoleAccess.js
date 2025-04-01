import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { withRoleProtection } from '../utils/rbac';

// Higher-order component to apply role-based access control to pages
const withRoleAccess = (WrappedComponent, allowedRoles) => {
  const ProtectedComponent = (props) => {
    const router = useRouter();
    
    useEffect(() => {
      // Check if user is authenticated and has required role
      const checkAuth = () => {
        // In a real app, this would check for a valid session/token
        const user = localStorage.getItem('underground_user');
        
        if (!user) {
          // Redirect to auth page if not authenticated
          router.push('/auth');
          return;
        }
        
        const userData = JSON.parse(user);
        
        // Check if user has required role
        if (!allowedRoles.includes(userData.role)) {
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
    }, [router]);
    
    return <WrappedComponent {...props} />;
  };
  
  return ProtectedComponent;
};

export default withRoleAccess;
