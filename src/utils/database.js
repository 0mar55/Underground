// Simplified database.js - removed MongoDB connections
// This file now provides mock data instead of database connections

// Mock data for the application
export const mockData = {
  rooms: [
    { id: 'room1', name: 'Neon Lounge', capacity: 6, pricePerHour: 250000, isAvailable: true },
    { id: 'room2', name: 'Purple Haze', capacity: 4, pricePerHour: 200000, isAvailable: true },
    { id: 'room3', name: 'Midnight Oasis', capacity: 8, pricePerHour: 300000, isAvailable: false },
    { id: 'room4', name: 'Electric Dreams', capacity: 10, pricePerHour: 350000, isAvailable: true }
  ],
  menu: {
    food: [
      { id: 'f1', name: 'Mezze Platter', price: 150000, category: 'Appetizers' },
      { id: 'f2', name: 'Chicken Wings', price: 120000, category: 'Appetizers' },
      { id: 'f3', name: 'Burger & Fries', price: 180000, category: 'Main Course' },
      { id: 'f4', name: 'Pizza', price: 200000, category: 'Main Course' }
    ],
    beverages: [
      { id: 'b1', name: 'Soft Drinks', price: 30000, category: 'Non-Alcoholic' },
      { id: 'b2', name: 'Fresh Juice', price: 50000, category: 'Non-Alcoholic' },
      { id: 'b3', name: 'Coffee', price: 40000, category: 'Hot Drinks' },
      { id: 'b4', name: 'Tea', price: 35000, category: 'Hot Drinks' }
    ],
    arguile: [
      { id: 'a1', name: 'Mint', price: 100000, category: 'Classic' },
      { id: 'a2', name: 'Double Apple', price: 100000, category: 'Classic' },
      { id: 'a3', name: 'Grape', price: 100000, category: 'Classic' },
      { id: 'a4', name: 'Special Mix', price: 120000, category: 'Premium' }
    ]
  }
};

// Helper function to get data
export function getData(collection) {
  return mockData[collection] || [];
}

// No actual database connection needed
export async function connectToDatabase() {
  console.log('Using mock data instead of database connection');
  return true;
}

// No actual database disconnection needed
export async function disconnectFromDatabase() {
  console.log('No database to disconnect from');
  return true;
}
