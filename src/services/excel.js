// Simplified excel.js without external dependencies
// This uses CSV format which is compatible with Excel

// Convert data to CSV string
const convertToCSV = (data) => {
  if (!data || !data.length) return '';
  
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(item => 
    Object.values(item).map(value => 
      typeof value === 'string' ? `"${value.replace(/"/g, '""')}"` : value
    ).join(',')
  );
  
  return [header, ...rows].join('\n');
};

// Download data as CSV file
export const downloadCSV = (data, filename = 'underground_data.csv') => {
  try {
    if (!data) return { success: false, message: 'No data to export' };
    
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    return { success: true, filename };
  } catch (error) {
    console.error('CSV generation error:', error);
    return { success: false, message: 'Failed to generate CSV file' };
  }
};

// Generate sample data for testing
export const generateSampleData = () => {
  return {
    inventory: [
      { id: 1, name: 'Coffee', category: 'Beverage', quantity: 50, unit: 'kg', cost: 15000, lastUpdated: '2025-04-01' },
      { id: 2, name: 'Tea', category: 'Beverage', quantity: 30, unit: 'kg', cost: 12000, lastUpdated: '2025-04-01' },
      { id: 3, name: 'Milk', category: 'Beverage', quantity: 20, unit: 'liter', cost: 8000, lastUpdated: '2025-04-01' },
      { id: 4, name: 'Sugar', category: 'Ingredient', quantity: 25, unit: 'kg', cost: 5000, lastUpdated: '2025-04-01' },
      { id: 5, name: 'Arguile Tobacco', category: 'Arguile', quantity: 40, unit: 'kg', cost: 50000, lastUpdated: '2025-04-01' }
    ],
    sales: [
      { id: 1, date: '2025-04-01', item: 'Room Booking', quantity: 5, amount: 1875000, paymentMethod: 'Cash' },
      { id: 2, date: '2025-04-01', item: 'Coffee', quantity: 12, amount: 180000, paymentMethod: 'Card' },
      { id: 3, date: '2025-04-01', item: 'Arguile', quantity: 8, amount: 400000, paymentMethod: 'Cash' }
    ],
    expenses: [
      { id: 1, date: '2025-04-01', category: 'Inventory', description: 'Coffee Purchase', amount: 750000, paymentMethod: 'Cash' },
      { id: 2, date: '2025-04-01', category: 'Utilities', description: 'Electricity Bill', amount: 500000, paymentMethod: 'Transfer' },
      { id: 3, date: '2025-04-01', category: 'Salary', description: 'Staff Salary', amount: 2000000, paymentMethod: 'Transfer' }
    ]
  };
};

// Save data to localStorage
export const saveDataToStorage = (data) => {
  if (typeof window === 'undefined') {
    return false;
  }
  
  try {
    localStorage.setItem('underground_data', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Storage error:', error);
    return false;
  }
};

// Load data from localStorage
export const loadDataFromStorage = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const data = localStorage.getItem('underground_data');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Storage error:', error);
    return null;
  }
};
