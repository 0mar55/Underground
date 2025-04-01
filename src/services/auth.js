import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

// Mock database for user authentication
const mockUsers = [
  { email: 'owner@underground.com', password: 'password', role: 'owner', name: 'Omar Khoury' },
  { email: 'manager@underground.com', password: 'password', role: 'manager', name: 'Maya Saleh' },
  { email: 'accountant@underground.com', password: 'password', role: 'accountant', name: 'Ali Hassan' },
  { email: 'staff@underground.com', password: 'password', role: 'staff', name: 'Samir Nassar' },
  { email: 'client@underground.com', password: 'password', role: 'client', name: 'Layla Abboud' }
];

export default function AuthService() {
  // This file would contain authentication logic in a real app
  // For now, we'll just export some mock functions

  // Check if user is authenticated
  const checkAuth = () => {
    const user = localStorage.getItem('underground_user');
    return user ? JSON.parse(user) : null;
  };

  // Login function
  const login = (email, password) => {
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      // In a real app, this would set a JWT token or similar
      const userData = {
        email: user.email,
        role: user.role,
        name: user.name
      };
      
      localStorage.setItem('underground_user', JSON.stringify(userData));
      return { success: true, user: userData };
    }
    
    return { success: false, error: 'Invalid email or password' };
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('underground_user');
    return { success: true };
  };

  // Register function
  const register = (name, email, password, role) => {
    // In a real app, this would create a new user in the database
    const userData = {
      email,
      role,
      name
    };
    
    localStorage.setItem('underground_user', JSON.stringify(userData));
    return { success: true, user: userData };
  };

  return {
    checkAuth,
    login,
    logout,
    register
  };
}
