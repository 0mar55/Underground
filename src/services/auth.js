// Complete auth.js file
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://undergr0und.space';

// Check if user is authenticated
export const checkAuthStatus = ()  => {
  if (typeof window === 'undefined') {
    return { isAuthenticated: false, user: null };
  }
  
  const token = localStorage.getItem('underground_token');
  const user = JSON.parse(localStorage.getItem('underground_user') || '{}');
  
  if (token && user.role) {
    return { isAuthenticated: true, user };
  }
  
  return { isAuthenticated: false, user: null };
};

// Login function
export const login = async (email, password) => {
  try {
    // In production, this would be an API call
    // For now, we'll use mock authentication
    
    // Validate input
    if (!email || !password) {
      return { success: false, message: 'Email and password are required' };
    }
    
    // Mock successful login
    const user = {
      id: 'user_' + Date.now(),
      name: email.split('@')[0],
      email,
      role: email.includes('owner') ? 'owner' : 
            email.includes('manager') ? 'manager' : 
            email.includes('accountant') ? 'accountant' : 
            email.includes('staff') ? 'staff' : 'client'
    };
    
    // Store in localStorage for session persistence
    localStorage.setItem('underground_token', 'mock_token_' + Date.now());
    localStorage.setItem('underground_user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, message: 'An error occurred during login' };
  }
};

// Register function
export const register = async (name, email, password, role = 'client') => {
  try {
    // In production, this would be an API call
    // For now, we'll use mock registration
    
    // Validate input
    if (!name || !email || !password) {
      return { success: false, message: 'All fields are required' };
    }
    
    // Mock successful registration
    const user = {
      id: 'user_' + Date.now(),
      name,
      email,
      role
    };
    
    // Store in localStorage for session persistence
    localStorage.setItem('underground_token', 'mock_token_' + Date.now());
    localStorage.setItem('underground_user', JSON.stringify(user));
    
    return { success: true, user };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, message: 'An error occurred during registration' };
  }
};

// Logout function
export const logout = () => {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.removeItem('underground_token');
  localStorage.removeItem('underground_user');
  
  // Redirect to home page
  window.location.href = BASE_URL;
};

// Create new user (admin function)
export const createUser = async (userData) => {
  try {
    // In production, this would be an API call
    // For now, we'll use mock user creation
    
    // Validate input
    if (!userData.name || !userData.email || !userData.password || !userData.role) {
      return { success: false, message: 'All fields are required' };
    }
    
    // Mock successful user creation
    const user = {
      id: 'user_' + Date.now(),
      name: userData.name,
      email: userData.email,
      role: userData.role
    };
    
    return { success: true, user };
  } catch (error) {
    console.error('User creation error:', error);
    return { success: false, message: 'An error occurred during user creation' };
  }
};

// Get user profile
export const getUserProfile = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const user = JSON.parse(localStorage.getItem('underground_user') || '{}');
  return user.id ? user : null;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    // In production, this would be an API call
    // For now, we'll use mock profile update
    
    if (typeof window === 'undefined') {
      return { success: false, message: 'Cannot update profile on server' };
    }
    
    const currentUser = JSON.parse(localStorage.getItem('underground_user') || '{}');
    
    if (!currentUser.id) {
      return { success: false, message: 'User not found' };
    }
    
    // Update user data
    const updatedUser = {
      ...currentUser,
      ...userData,
      // Don't allow role change through profile update
      role: currentUser.role
    };
    
    // Save updated user
    localStorage.setItem('underground_user', JSON.stringify(updatedUser));
    
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error('Profile update error:', error);
    return { success: false, message: 'An error occurred during profile update' };
  }
};
