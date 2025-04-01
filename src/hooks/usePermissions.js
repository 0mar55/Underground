import { useState, useEffect } from 'react';

// Simple permission check function
const checkPermission = (role, resource, action) => {
  // Owner has all permissions
  if (role === 'owner') return true;
  
  // Manager permissions
  if (role === 'manager') {
    if (resource === 'owner_dashboard') return false;
    if (resource === 'users' && action === 'manage') return false;
    return true;
  }
  
  // Accountant permissions
  if (role === 'accountant') {
    if (resource === 'inventory' && (action === 'view' || action === 'manage')) return true;
    if (resource === 'reports' && action === 'view') return true;
    return false;
  }
  
  // Staff permissions
  if (role === 'staff') {
    if (resource === 'orders' && action === 'process') return true;
    if (resource === 'bookings' && action === 'view') return true;
    return false;
  }
  
  // Default deny
  return false;
};

export function usePermissions(userRole) {
  const [permissions, setPermissions] = useState({});

  useEffect(() => {
    // Set up permissions based on role
    const perms = {
      canViewOwnerDashboard: checkPermission(userRole, 'owner_dashboard', 'view'),
      canViewManagerDashboard: checkPermission(userRole, 'manager_dashboard', 'view'),
      canViewAccountantDashboard: checkPermission(userRole, 'accountant_dashboard', 'view'),
      canViewStaffDashboard: checkPermission(userRole, 'staff_dashboard', 'view'),
      canManageUsers: checkPermission(userRole, 'users', 'manage'),
      canManageRoles: checkPermission(userRole, 'roles', 'manage'),
      canManageRooms: checkPermission(userRole, 'rooms', 'manage'),
      canManageInventory: checkPermission(userRole, 'inventory', 'manage'),
      canViewReports: checkPermission(userRole, 'reports', 'view'),
      canProcessOrders: checkPermission(userRole, 'orders', 'process'),
      canManageBookings: checkPermission(userRole, 'bookings', 'manage'),
    };
    
    setPermissions(perms);
  }, [userRole]);

  return permissions;
}
