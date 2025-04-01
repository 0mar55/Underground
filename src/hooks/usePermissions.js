import { useEffect } from 'react';
import { useRBAC } from '../utils/rbac';
import { useState } from 'react';

// Custom hook for permission checking
const usePermissions = () => {
  const { checkPermission } = useRBAC();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('underground_user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  // Check if user has permission
  const hasPermission = (permission) => {
    return checkPermission(user, permission);
  };
  
  // Get user role
  const getUserRole = () => {
    return user?.role || null;
  };
  
  return { hasPermission, getUserRole, user };
};

export default usePermissions;
