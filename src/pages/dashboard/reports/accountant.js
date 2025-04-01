import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { withRoleProtection } from '../../../utils/rbac';

// Import auth service
const useAuth = () => {
  // In a real app, this would be imported from the auth service
  const checkAuth = () => {
    const user = localStorage.getItem('underground_user');
    return user ? JSON.parse(user) : null;
  };

  const logout = () => {
    localStorage.removeItem('underground_user');
    window.location.href = '/auth';
  };

  return { checkAuth, logout };
};

function AccountantReports() {
  const [activeTab, setActiveTab] = useState('inventory');
  const [dateRange, setDateRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  // Mock data for reports
  const inventoryData = {
    day: [
      { item: 'Premium Tobacco', startingStock: 10, consumed: 1.5, remaining: 8.5, unit: 'kg', cost: 500000, value: 4250000 },
      { item: 'Chicken Wings', startingStock: 20, consumed: 4, remaining: 16, unit: 'kg', cost: 300000, value: 4800000 },
      { item: 'Hummus', startingStock: 5, consumed: 1.2, remaining: 3.8, unit: 'kg', cost: 100000, value: 380000 },
      { item: 'Fresh Fruits', startingStock: 15, consumed: 3, remaining: 12, unit: 'kg', cost: 200000, value: 2400000 }
    ],
    week: [
      { item: 'Premium Tobacco', startingStock: 15, consumed: 8.5, remaining: 6.5, unit: 'kg', cost: 500000, value: 3250000 },
      { item: 'Chicken Wings', startingStock: 30, consumed: 22, remaining: 8, unit: 'kg', cost: 300000, value: 2400000 },
      { item: 'Hummus', startingStock: 10, consumed: 7.5, remaining: 2.5, unit: 'kg', cost: 100000, value: 250000 },
      { item: 'Fresh Fruits', startingStock: 25, consumed: 18, remaining: 7, unit: 'kg', cost: 200000, value: 1400000 }
    ],
    month: [
      { item: 'Premium Tobacco', startingStock: 40, consumed: 35, remaining: 5, unit: 'kg', cost: 500000, value: 2500000 },
      { item: 'Chicken Wings', startingStock: 100, consumed: 92, remaining: 8, unit: 'kg', cost: 300000, value: 2400000 },
      { item: 'Hummus', startingStock: 30, consumed: 28, remaining: 2, unit: 'kg', cost: 100000, value: 200000 },
      { item: 'Fresh Fruits', startingStock: 80, consumed: 75, remaining: 5, unit: 'kg', cost: 200000, value: 1000000 }
    ]
  };

  const financialData = {
    day: [
      { category: 'Room Revenue', amount: 2250000 },
      { category: 'Food Revenue', amount: 850000 },
      { category: 'Beverage Revenue', amount: 450000 },
      { category: 'Arguile Revenue', amount: 600000 },
      { category: 'Inventory Costs', amount: -350000 },
      { category: 'Staff Wages', amount: -400000 },
      { category: 'Utilities', amount: -100000 },
      { category: 'Other Expenses', amount: -150000 },
      { category: 'Net Profit', amount: 3150000 }
    ],
    week: [
      { category: 'Room Revenue', amount: 16325000 },
      { category: 'Food Revenue', amount: 5600000 },
      { category: 'Beverage Revenue', amount: 3350000 },
      { category: 'Arguile Revenue', amount: 4550000 },
      { category: 'Inventory Costs', amount: -2450000 },
      { category: 'Staff Wages', amount: -2800000 },
      { category: 'Utilities', amount: -700000 },
      { category: 'Other Expenses', amount: -1050000 },
      { category: 'Net Profit', amount: 22825000 }
    ],
    month: [
      { category: 'Room Revenue', amount: 63500000 },
      { category: 'Food Revenue', amount: 25400000 },
      { category: 'Beverage Revenue', amount: 12700000 },
      { category: 'Arguile Revenue', amount: 19050000 },
      { category: 'Inventory Costs', amount: -9800000 },
      { category: 'Staff Wages', amount: -11200000 },
      { category: 'Utilities', amount: -2800000 },
      { category: 'Other Expenses', amount: -4200000 },
      { category: 'Net Profit', amount: 92650000 }
    ]
  };

  const purchaseOrdersData = {
    day: [
      { id: 'PO-2025-0401-1', supplier: 'Lebanese Tobacco Co.', items: 'Premium Tobacco', amount: 1000000, status: 'Pending' },
      { id: 'PO-2025-0401-2', supplier: 'Local Butcher', items: 'Chicken Wings', amount: 600000, status: 'Approved' }
    ],
    week: [
      { id: 'PO-2025-0326-1', supplier: 'Lebanese Delights', items: 'Hummus, Tabbouleh', amount: 500000, status: 'Delivered' },
      { id: 'PO-2025-0327-1', supplier: 'Local Market', items: 'Fresh Fruits', amount: 400000, status: 'Delivered' },
      { id: 'PO-2025-0329-1', supplier: 'Lebanese Tobacco Co.', items: 'Premium Tobacco', amount: 1500000, status: 'Delivered' },
      { id: 'PO-2025-0330-1', supplier: 'Beverage Supplier', items: 'Soft Drinks, Juices', amount: 800000, status: 'Delivered' },
      { id: 'PO-2025-0401-1', supplier: 'Lebanese Tobacco Co.', items: 'Premium Tobacco', amount: 1000000, status: 'Pending' },
      { id: 'PO-2025-0401-2', supplier: 'Local Butcher', items: 'Chicken Wings', amount: 600000, status: 'Approved' }
    ],
    month: [
      { id: 'PO-2025-0305-1', supplier: 'Lebanese Tobacco Co.', items: 'Premium Tobacco', amount: 2000000, status: 'Delivered' },
      { id: 'PO-2025-0310-1', supplier: 'Local Butcher', items: 'Chicken Wings', amount: 1500000, status: 'Delivered' },
      { id: 'PO-2025-0315-1', supplier: 'Lebanese Delights', items: 'Hummus, Tabbouleh', amount: 800000, status: 'Delivered' },
      { id: 'PO-2025-0320-1', supplier: 'Local Market', items: 'Fresh Fruits', amount: 1000000, status: 'Delivered' },
      { id: 'PO-2025-0326-1', supplier: 'Lebanese Delights', items: 'Hummus, Tabbouleh', amount: 500000, status: 'Delivered' },
      { id: 'PO-2025-0327-1', supplier: 'Local Market', items: 'Fresh Fruits', amount: 400000, status: 'Delivered' },
      { id: 'PO-2025-0329-1', supplier: 'Lebanese Tobacco Co.', items: 'Premium Tobacco', amount: 1500000, status: 'Delivered' },
      { id: 'PO-2025-0330-1', supplier: 'Beverage Supplier', items: 'Soft Drinks, Juices', amount: 800000, status: 'Delivered' },
      { id: 'PO-2025-0401-1', supplier: 'Lebanese Tobacco Co.', items: 'Premium Tobacco', amount: 1000000, status: 'Pending' },
      { id: 'PO-2025-0401-2', supplier: 'Local Butcher', items: 'Chicken Wings', amount: 600000, status: 'Approved' }
    ]
  };

  const handleDateRangeChange = (range) => {
    setIsLoading(true);
    setDateRange(range);
    
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const calculateTotalInventoryValue = (data) => {
    return data.reduce((acc, item) => acc + item.value, 0);
  };

  const calculateTotalInventoryCost = (data) => {
    return data.reduce((acc, item) => acc + (item.cost * item.remaining), 0);
  };

  const renderInventoryReport = () => {
    const data = inventoryData[dateRange];
    const totalValue = calculateTotalInventoryValue(data);
    const totalCost = calculateTotalInventoryCost(data);
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Inventory Status</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Inventory Value</p>
              <p className="text-2xl font-bold neon-text">{totalValue.toLocaleString()} LBP</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Low Stock Items</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{data.filter(item => item.remaining <= 5).length}</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Items Consumed</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{data.reduce((acc, item) => acc + item.consumed, 0).toFixed(1)} units</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Restock Value Needed</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">
                {data.filter(item => item.remaining <= 5)
                  .reduce((acc, item) => acc + ((item.startingStock - item.remaining) * item.cost), 0)
                  .toLocaleString()} LBP
              </p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                  <th className="text-left py-2 px-3">Item</th>
                  <th className="text-right py-2 px-3">Starting Stock</th>
                  <th className="text-right py-2 px-3">Consumed</th>
                  <th className="text-right py-2 px-3">Remaining</th>
                  <th className="text-right py-2 px-3">Unit Cost</th>
                  <th className="text-right py-2 px-3">Current Value</th>
                  <th className="text-right py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                    <td className="py-2 px-3">{item.item}</td>
                    <td className="py-2 px-3 text-right">{item.startingStock} {item.unit}</td>
                    <td className="py-2 px-3 text-right">{item.consumed} {item.unit}</td>
                    <td className="py-2 px-3 text-right">{item.remaining} {item.unit}</td>
                    <td className="py-2 px-3 text-right">{item.cost.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right">{item.value.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.remaining <= 5 ? 'bg-red-600' : 
                        item.remaining <= 10 ? 'bg-[rgba(var(--neon-orange),0.8)]' : 
                        'bg-green-600'
                      }`}>
                        {item.remaining <= 5 ? 'Low Stock' : 
                         item.remaining <= 10 ? 'Medium Stock' : 
                         'Good Stock'}
                      </span>
                    </td>
                  </tr>
                ))}
                <tr className="bg-[rgba(15,10,40,0.7)]">
                  <td className="py-2 px-3 font-bold">Total</td>
                  <td className="py-2 px-3 text-right font-bold">{data.reduce((acc, item) => acc + item.startingStock, 0)} units</td>
                  <td className="py-2 px-3 text-right font-bold">{data.reduce((acc, item) => acc + item.consumed, 0).toFixed(1)} units</td>
                  <td className="py-2 px-3 text-right font-bold">{data.reduce((acc, item) => acc + item.remaining, 0).toFixed(1)} units</td>
                  <td className="py-2 px-3 text-right font-bold">-</td>
                  <td className="py-2 px-3 text-right font-bold">{totalValue.toLocaleString()} LBP</td>
                  <td className="py-2 px-3 text-right font-bold">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Consumption Rate</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {data.map((item, index) => (
                  <div key={index} className="relative pt-1 mb-4">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                          {item.item}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                          {Math.round(item.consumed / item.startingStock * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                      <div style={{ width: `${Math.round(item.consumed / item.startingStock * 100)}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card neon-border-green">
            <h3 className="text-xl font-bold mb-4 neon-text-green">Actions</h3>
            <div className="space-y-4">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Low Stock Items</h4>
                <ul className="space-y-2">
                  {data.filter(item => item.remaining <= 5).map((item, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{item.item}</span>
                      <span className="text-red-500">{item.remaining} {item.unit}</span>
                    </li>
                  ))}
                  {data.filter(item => item.remaining <= 5).length === 0 && (
                    <li className="text-green-500">No low stock items</li>
                  )}
                </ul>
              </div>
              
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="btn-secondary text-sm w-full">
                    <span>Generate Purchase Order</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Export to Excel</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Schedule Inventory Count</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderFinancialReport = () => {
    const data = financialData[dateRange];
    const revenue = data.filter(item => item.amount > 0).reduce((acc, item) => acc + item.amount, 0);
    const expenses = Math.abs(data.filter(item => item.amount < 0).reduce((acc, item) => acc + item.amount, 0));
    const profit = data.find(item => item.category === 'Net Profit').amount;
    const profitMargin = Math.round((profit / revenue) * 100);
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Financial Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Revenue</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{revenue.toLocaleString()} LBP</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Expenses</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{expenses.toLocaleString()} LBP</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Net Profit</p>
              <p className="text-2xl font-bold neon-text">{profit.toLocaleString()} LBP</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Profit Margin</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{profitMargin}%</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                  <th className="text-left py-2 px-3">Category</th>
                  <th className="text-right py-2 px-3">Amount</th>
                  <th className="text-right py-2 px-3">% of Revenue</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className={`border-b border-[rgba(var(--neon-pink),0.1)] ${item.category === 'Net Profit' ? 'bg-[rgba(15,10,40,0.7)]' : ''}`}>
                    <td className={`py-2 px-3 ${item.category === 'Net Profit' ? 'font-bold' : ''}`}>{item.category}</td>
                    <td className={`py-2 px-3 text-right ${
                      item.amount > 0 ? 'text-[rgb(var(--neon-green))]' : 
                      item.amount < 0 ? 'text-[rgb(var(--neon-orange))]' : 
                      'neon-text'
                    } ${item.category === 'Net Profit' ? 'font-bold' : ''}`}>
                      {item.amount.toLocaleString()} LBP
                    </td>
                    <td className={`py-2 px-3 text-right ${item.category === 'Net Profit' ? 'font-bold' : ''}`}>
                      {item.amount > 0 ? 
                        Math.round((item.amount / revenue) * 100) : 
                        item.amount < 0 ? 
                          Math.round((Math.abs(item.amount) / revenue) * 100) * -1 : 
                          Math.round((item.amount / revenue) * 100)
                      }%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Revenue vs Expenses</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                <div className="relative pt-1 mb-4">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-green))] bg-[rgba(var(--neon-green),0.2)]">
                        Revenue
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-green))]">
                        {revenue.toLocaleString()} LBP
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: '100%' }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-green))]">
                    </div>
                  </div>
                </div>
                
                <div className="relative pt-1 mb-4">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-orange))] bg-[rgba(var(--neon-orange),0.2)]">
                        Expenses
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-orange))]">
                        {expenses.toLocaleString()} LBP
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round((expenses / revenue) * 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-orange))]">
                    </div>
                  </div>
                </div>
                
                <div className="relative pt-1 mb-4">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                        Net Profit
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                        {profit.toLocaleString()} LBP
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round((profit / revenue) * 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card neon-border-green">
            <h3 className="text-xl font-bold mb-4 neon-text-green">Actions</h3>
            <div className="space-y-4">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Export Options</h4>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm flex-1">
                    <span>Excel</span>
                  </button>
                  <button className="btn-secondary text-sm flex-1">
                    <span>PDF</span>
                  </button>
                  <button className="btn-secondary text-sm flex-1">
                    <span>CSV</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Financial Tools</h4>
                <div className="space-y-2">
                  <button className="btn-secondary text-sm w-full">
                    <span>Generate Financial Statement</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Expense Analysis</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Revenue Forecast</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPurchaseOrdersReport = () => {
    const data = purchaseOrdersData[dateRange];
    const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
    const pendingAmount = data.filter(item => item.status === 'Pending').reduce((acc, item) => acc + item.amount, 0);
    const approvedAmount = data.filter(item => item.status === 'Approved').reduce((acc, item) => acc + item.amount, 0);
    const deliveredAmount = data.filter(item => item.status === 'Delivered').reduce((acc, item) => acc + item.amount, 0);
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Purchase Orders</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Orders</p>
              <p className="text-2xl font-bold neon-text">{data.length}</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Amount</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{totalAmount.toLocaleString()} LBP</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Pending Amount</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{pendingAmount.toLocaleString()} LBP</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Delivered Amount</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{deliveredAmount.toLocaleString()} LBP</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                  <th className="text-left py-2 px-3">PO ID</th>
                  <th className="text-left py-2 px-3">Supplier</th>
                  <th className="text-left py-2 px-3">Items</th>
                  <th className="text-right py-2 px-3">Amount</th>
                  <th className="text-right py-2 px-3">Status</th>
                  <th className="text-right py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                    <td className="py-2 px-3">{item.id}</td>
                    <td className="py-2 px-3">{item.supplier}</td>
                    <td className="py-2 px-3">{item.items}</td>
                    <td className="py-2 px-3 text-right">{item.amount.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        item.status === 'Pending' ? 'bg-[rgba(var(--neon-orange),0.8)]' : 
                        item.status === 'Approved' ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                        'bg-green-600'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-2 px-3 text-right">
                      <button className="text-[rgb(var(--neon-blue))] hover:underline text-sm">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="bg-[rgba(15,10,40,0.7)]">
                  <td className="py-2 px-3 font-bold">Total</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3 text-right font-bold">{totalAmount.toLocaleString()} LBP</td>
                  <td className="py-2 px-3">-</td>
                  <td className="py-2 px-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Purchase Order Status</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                <div className="relative pt-1 mb-4">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-orange))] bg-[rgba(var(--neon-orange),0.2)]">
                        Pending
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-orange))]">
                        {data.filter(item => item.status === 'Pending').length} orders
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round((data.filter(item => item.status === 'Pending').length / data.length) * 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-orange))]">
                    </div>
                  </div>
                </div>
                
                <div className="relative pt-1 mb-4">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                        Approved
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                        {data.filter(item => item.status === 'Approved').length} orders
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round((data.filter(item => item.status === 'Approved').length / data.length) * 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                    </div>
                  </div>
                </div>
                
                <div className="relative pt-1 mb-4">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-green))] bg-[rgba(var(--neon-green),0.2)]">
                        Delivered
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-green))]">
                        {data.filter(item => item.status === 'Delivered').length} orders
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round((data.filter(item => item.status === 'Delivered').length / data.length) * 100)}%` }} 
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-green))]">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card neon-border-green">
            <h3 className="text-xl font-bold mb-4 neon-text-green">Actions</h3>
            <div className="space-y-4">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Create New Purchase Order</h4>
                <div className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Supplier</label>
                    <select className="input-field w-full">
                      <option>Lebanese Tobacco Co.</option>
                      <option>Local Butcher</option>
                      <option>Lebanese Delights</option>
                      <option>Local Market</option>
                      <option>Beverage Supplier</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Items</label>
                    <input type="text" className="input-field w-full" placeholder="Comma-separated items" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Amount (LBP)</label>
                    <input type="number" className="input-field w-full" placeholder="0" />
                  </div>
                  <button className="btn-primary text-sm w-full">
                    <span>Create Purchase Order</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Export Options</h4>
                <div className="flex space-x-2">
                  <button className="btn-secondary text-sm flex-1">
                    <span>Excel</span>
                  </button>
                  <button className="btn-secondary text-sm flex-1">
                    <span>PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Accountant Reports | Underground Chilling Room</title>
          <meta name="description" content="Accountant reports for Underground Chilling Room" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/dashboard/accountant">
              <a className="logo-container">
                <Image 
                  src="/images/logo-simple.webp" 
                  alt="Underground Logo" 
                  width={200} 
                  height={50} 
                  className="h-10 w-auto"
                />
              </a>
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={logout}
                className="btn-secondary text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold neon-text">Accountant Reports</h2>
            <Link href="/dashboard/accountant">
              <a className="btn-secondary text-sm">
                Back to Dashboard
              </a>
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="flex border-b border-[rgba(var(--neon-blue),0.3)]">
              <button
                className={`neon-tab ${activeTab === 'inventory' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('inventory')}
              >
                Inventory Reports
              </button>
              <button
                className={`neon-tab ${activeTab === 'financial' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('financial')}
              >
                Financial Reports
              </button>
              <button
                className={`neon-tab ${activeTab === 'purchase' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('purchase')}
              >
                Purchase Orders
              </button>
            </div>
          </div>
          
          <div className="mb-6 flex justify-end space-x-2">
            <button
              className={`btn-sm ${dateRange === 'day' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleDateRangeChange('day')}
            >
              Day
            </button>
            <button
              className={`btn-sm ${dateRange === 'week' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleDateRangeChange('week')}
            >
              Week
            </button>
            <button
              className={`btn-sm ${dateRange === 'month' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleDateRangeChange('month')}
            >
              Month
            </button>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-uv-purple"></div>
                <p className="mt-4 text-white">Loading report data...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === 'inventory' && renderInventoryReport()}
              {activeTab === 'financial' && renderFinancialReport()}
              {activeTab === 'purchase' && renderPurchaseOrdersReport()}
            </>
          )}
        </main>

        <footer className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto text-center text-sm">
            <p className="neon-text">© 2025 Underground Chilling Room. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

// Wrap component with role protection
export default withRoleProtection(AccountantReports, ['owner', 'accountant']);
