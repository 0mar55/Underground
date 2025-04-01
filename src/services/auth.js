// Simplified auth.js - removed authentication system
// This file now provides static content instead of authentication

// Static data for the application
export const staticUserData = {
  // Default user for display purposes only
  defaultUser: {
    name: 'Guest User',
    role: 'guest'
  },
  
  // Sample content for different roles
  roleContent: {
    owner: {
      title: 'Owner Dashboard',
      description: 'View business statistics and management options'
    },
    manager: {
      title: 'Manager Dashboard',
      description: 'Manage staff and daily operations'
    },
    staff: {
      title: 'Staff Portal',
      description: 'View rooms and orders'
    },
    client: {
      title: 'Client Portal',
      description: 'Book rooms and place orders'
    }
  }
};

// Simplified function that always returns a guest user
// Replaces the original checkAuthStatus function
export const checkAuthStatus = () => {
  return { 
    isAuthenticated: true, 
    user: staticUserData.defaultUser 
  };
};

// Simplified function that does nothing
// Replaces the original login function
export const login = async (email, password) => {
  return { 
    success: true, 
    user: staticUserData.defaultUser 
  };
};

// Simplified function that does nothing
// Replaces the original register function
export const register = async (name, email, password, role = 'client') => {
  return { 
    success: true, 
    user: staticUserData.defaultUser 
  };
};

// Simplified function that does nothing
// Replaces the original logout function
export const logout = () => {
  console.log('No authentication system to log out from');
  return true;
};

// Simplified function that returns the default user
// Replaces the original getUserProfile function
export const getUserProfile = () => {
  return staticUserData.defaultUser;
};

// Simplified function that does nothing
// Replaces the original updateUserProfile function
export const updateUserProfile = async (userData) => {
  return { 
    success: true, 
    user: staticUserData.defaultUser 
  };
};
