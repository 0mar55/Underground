// Complete Excel service for accountant
import * as XLSX from 'xlsx';

// Convert JSON data to Excel file
export const jsonToExcel = (data, filename = 'underground_data.xlsx') => {
  try {
    // Create workbook
    const workbook = XLSX.utils.book_new();
    
    // Process each data category into separate sheets
    if (data.inventory) {
      const inventorySheet = XLSX.utils.json_to_sheet(data.inventory);
      XLSX.utils.book_append_sheet(workbook, inventorySheet, "Inventory");
    }
    
    if (data.sales) {
      const salesSheet = XLSX.utils.json_to_sheet(data.sales);
      XLSX.utils.book_append_sheet(workbook, salesSheet, "Sales");
    }
    
    if (data.expenses) {
      const expensesSheet = XLSX.utils.json_to_sheet(data.expenses);
      XLSX.utils.book_append_sheet(workbook, expensesSheet, "Expenses");
    }
    
    if (data.bookings) {
      const bookingsSheet = XLSX.utils.json_to_sheet(data.bookings);
      XLSX.utils.book_append_sheet(workbook, bookingsSheet, "Bookings");
    }
    
    // Generate Excel file
    XLSX.writeFile(workbook, filename);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Excel generation error:', error);
    return { success: false, message: 'Failed to generate Excel file' };
  }
};

// Convert Excel file to JSON data
export const excelToJson = (file) => {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          
          // Process each sheet into JSON
          const result = {};
          
          workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            result[sheetName.toLowerCase()] = XLSX.utils.sheet_to_json(sheet);
          });
          
          resolve({ success: true, data: result });
        } catch (error) {
          console.error('Excel parsing error:', error);
          reject({ success: false, message: 'Failed to parse Excel file' });
        }
      };
      
      reader.onerror = () => {
        reject({ success: false, message: 'Failed to read Excel file' });
      };
      
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error('Excel processing error:', error);
      reject({ success: false, message: 'Failed to process Excel file' });
    }
  });
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
    ],
    bookings: [
      { id: 1, date: '2025-04-01', room: 'Room 1', duration: 3, persons: 4, amount: 1125000, status: 'Completed' },
      { id: 2, date: '2025-04-01', room: 'Room 2', duration: 2, persons: 6, amount: 900000, status: 'Completed' },
      { id: 3, date: '2025-04-02', room: 'Room 1', duration: 4, persons: 5, amount: 1500000, status: 'Confirmed' }
    ]
  };
};

// Save data to localStorage (for demo purposes)
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

// Load data from localStorage (for demo purposes)
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
