import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { usePermissions } from '../../hooks/usePermissions';
import { 
  jsonToExcel, 
  excelToJson, 
  generateSampleData, 
  saveDataToStorage, 
  loadDataFromStorage 
} from '../../services/excel';

export default function ExcelManagement() {
  const router = useRouter();
  const { canManageInventory } = usePermissions('accountant');
  
  const [data, setData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [activeTab, setActiveTab] = useState('inventory');
  
  useEffect(() => {
    // Check permissions
    if (!canManageInventory) {
      router.push('/dashboard/reports/accountant');
      return;
    }
    
    // Load data from storage or generate sample data
    const storedData = loadDataFromStorage();
    if (storedData) {
      setData(storedData);
    } else {
      const sampleData = generateSampleData();
      setData(sampleData);
      saveDataToStorage(sampleData);
    }
  }, [canManageInventory, router]);
  
  const handleExportExcel = () => {
    if (!data) return;
    
    try {
      jsonToExcel(data, 'underground_data.xlsx');
      setMessage({ type: 'success', text: 'Excel file exported successfully' });
    } catch (error) {
      console.error('Export error:', error);
      setMessage({ type: 'error', text: 'Failed to export Excel file' });
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  
  const handleImportExcel = async () => {
    if (!selectedFile) {
      setMessage({ type: 'error', text: 'Please select a file first' });
      return;
    }
    
    try {
      const result = await excelToJson(selectedFile);
      
      if (result.success) {
        // Merge with existing data
        const newData = { ...data };
        
        // Update each category if present in the imported file
        Object.keys(result.data).forEach(category => {
          if (result.data[category] && result.data[category].length > 0) {
            newData[category] = result.data[category];
          }
        });
        
        setData(newData);
        saveDataToStorage(newData);
        setMessage({ type: 'success', text: 'Data imported successfully' });
        setSelectedFile(null);
        
        // Reset file input
        const fileInput = document.getElementById('excel-file');
        if (fileInput) fileInput.value = '';
      } else {
        setMessage({ type: 'error', text: result.message || 'Import failed' });
      }
    } catch (error) {
      console.error('Import error:', error);
      setMessage({ type: 'error', text: 'Failed to import Excel file' });
    }
  };
  
  if (!data) {
    return <div className="p-8 text-center">Loading data...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 neon-text-purple">Excel Data Management</h1>
      
      <div className="neon-card mb-8">
        <h2 className="text-xl font-semibold mb-4">Import/Export Excel</h2>
        
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0 mb-6">
          <button 
            onClick={handleExportExcel}
            className="px-4 py-2 rounded bg-purple-600 text-white font-semibold"
          >
            Export to Excel
          </button>
          
          <div className="flex-1">
            <input
              id="excel-file"
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileChange}
              className="hidden"
            />
            <label 
              htmlFor="excel-file"
              className="px-4 py-2 rounded bg-blue-600 text-white font-semibold cursor-pointer inline-block"
            >
              Select Excel File
            </label>
            {selectedFile && (
              <span className="ml-2 text-gray-300">
                {selectedFile.name}
              </span>
            )}
          </div>
          
          <button 
            onClick={handleImportExcel}
            disabled={!selectedFile}
            className={`px-4 py-2 rounded font-semibold ${
              selectedFile ? 'bg-green-600 text-white' : 'bg-gray-700 text-gray-400'
            }`}
          >
            Import from Excel
          </button>
        </div>
        
        {message && (
          <div className={`p-4 rounded mb-4 ${
            message.type === 'success' ? 'bg-green-800' : 'bg-red-800'
          }`}>
            {message.text}
          </div>
        )}
        
        <div className="text-sm text-gray-400 mt-2">
          <p>* Export will download an Excel file with all data</p>
          <p>* Import will update data from the selected Excel file</p>
          <p>* Make sure the Excel file has the correct format (Inventory, Sales, Expenses, Bookings sheets)</p>
        </div>
      </div>
      
      <div className="neon-card">
        <div className="flex border-b border-gray-700 mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'inventory' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('inventory')}
          >
            Inventory
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'sales' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('sales')}
          >
            Sales
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'expenses' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('expenses')}
          >
            Expenses
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'bookings' ? 'border-b-2 border-purple-500 text-purple-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
        </div>
        
        <div className="overflow-x-auto">
          {activeTab === 'inventory' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Unit</th>
                  <th className="py-2 px-4 text-left">Cost (LBP)</th>
                  <th className="py-2 px-4 text-left">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {data.inventory.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800">
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">{item.name}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">{item.unit}</td>
                    <td className="py-3 px-4">{item.cost.toLocaleString()}</td>
                    <td className="py-3 px-4">{item.lastUpdated}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {activeTab === 'sales' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Item</th>
                  <th className="py-2 px-4 text-left">Quantity</th>
                  <th className="py-2 px-4 text-left">Amount (LBP)</th>
                  <th className="py-2 px-4 text-left">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {data.sales.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800">
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.item}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">{item.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">{item.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {activeTab === 'expenses' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Category</th>
                  <th className="py-2 px-4 text-left">Description</th>
                  <th className="py-2 px-4 text-left">Amount (LBP)</th>
                  <th className="py-2 px-4 text-left">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {data.expenses.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800">
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.category}</td>
                    <td className="py-3 px-4">{item.description}</td>
                    <td className="py-3 px-4">{item.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">{item.paymentMethod}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          
          {activeTab === 'bookings' && (
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-4 text-left">ID</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Room</th>
                  <th className="py-2 px-4 text-left">Duration (hours)</th>
                  <th className="py-2 px-4 text-left">Persons</th>
                  <th className="py-2 px-4 text-left">Amount (LBP)</th>
                  <th className="py-2 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.bookings.map((item) => (
                  <tr key={item.id} className="border-b border-gray-800">
                    <td className="py-3 px-4">{item.id}</td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.room}</td>
                    <td className="py-3 px-4">{item.duration}</td>
                    <td className="py-3 px-4">{item.persons}</td>
                    <td className="py-3 px-4">{item.amount.toLocaleString()}</td>
                    <td className="py-3 px-4">{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
