import { useState, useEffect } from 'react';
import { checkPermission } from '../utils/rbac';

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
