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

function OwnerReports() {
  const [activeTab, setActiveTab] = useState('sales');
  const [dateRange, setDateRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  // Mock data for reports
  const salesData = {
    day: [
      { date: '2025-04-01', roomSales: 2250000, foodSales: 850000, beverageSales: 450000, arguileSales: 600000, total: 4150000 }
    ],
    week: [
      { date: '2025-03-26', roomSales: 1875000, foodSales: 750000, beverageSales: 350000, arguileSales: 450000, total: 3425000 },
      { date: '2025-03-27', roomSales: 1950000, foodSales: 800000, beverageSales: 400000, arguileSales: 500000, total: 3650000 },
      { date: '2025-03-28', roomSales: 2500000, foodSales: 950000, beverageSales: 550000, arguileSales: 700000, total: 4700000 },
      { date: '2025-03-29', roomSales: 3000000, foodSales: 1200000, beverageSales: 650000, arguileSales: 900000, total: 5750000 },
      { date: '2025-03-30', roomSales: 2750000, foodSales: 1100000, beverageSales: 600000, arguileSales: 850000, total: 5300000 },
      { date: '2025-03-31', roomSales: 2000000, foodSales: 800000, beverageSales: 400000, arguileSales: 550000, total: 3750000 },
      { date: '2025-04-01', roomSales: 2250000, foodSales: 850000, beverageSales: 450000, arguileSales: 600000, total: 4150000 }
    ],
    month: [
      { date: 'Week 1', roomSales: 14500000, foodSales: 5800000, beverageSales: 2900000, arguileSales: 4350000, total: 27550000 },
      { date: 'Week 2', roomSales: 15750000, foodSales: 6300000, beverageSales: 3150000, arguileSales: 4725000, total: 29925000 },
      { date: 'Week 3', roomSales: 16250000, foodSales: 6500000, beverageSales: 3250000, arguileSales: 4875000, total: 30875000 },
      { date: 'Week 4', roomSales: 17000000, foodSales: 6800000, beverageSales: 3400000, arguileSales: 5100000, total: 32300000 }
    ]
  };

  const roomData = {
    day: [
      { room: 'Neon Lounge', bookings: 5, hours: 12, revenue: 750000 },
      { room: 'Purple Haze', bookings: 3, hours: 8, revenue: 500000 },
      { room: 'Blue Velvet', bookings: 4, hours: 10, revenue: 650000 },
      { room: 'Midnight Oasis', bookings: 2, hours: 5, revenue: 350000 }
    ],
    week: [
      { room: 'Neon Lounge', bookings: 28, hours: 70, revenue: 4375000 },
      { room: 'Purple Haze', bookings: 22, hours: 55, revenue: 3437500 },
      { room: 'Blue Velvet', bookings: 25, hours: 62, revenue: 4650000 },
      { room: 'Midnight Oasis', bookings: 18, hours: 45, revenue: 2812500 }
    ],
    month: [
      { room: 'Neon Lounge', bookings: 112, hours: 280, revenue: 17500000 },
      { room: 'Purple Haze', bookings: 88, hours: 220, revenue: 13750000 },
      { room: 'Blue Velvet', bookings: 100, hours: 250, revenue: 18750000 },
      { room: 'Midnight Oasis', bookings: 72, hours: 180, revenue: 11250000 }
    ]
  };

  const inventoryData = {
    day: [
      { item: 'Premium Tobacco', startingStock: 10, consumed: 1.5, remaining: 8.5, unit: 'kg' },
      { item: 'Chicken Wings', startingStock: 20, consumed: 4, remaining: 16, unit: 'kg' },
      { item: 'Hummus', startingStock: 5, consumed: 1.2, remaining: 3.8, unit: 'kg' },
      { item: 'Fresh Fruits', startingStock: 15, consumed: 3, remaining: 12, unit: 'kg' }
    ],
    week: [
      { item: 'Premium Tobacco', startingStock: 15, consumed: 8.5, remaining: 6.5, unit: 'kg' },
      { item: 'Chicken Wings', startingStock: 30, consumed: 22, remaining: 8, unit: 'kg' },
      { item: 'Hummus', startingStock: 10, consumed: 7.5, remaining: 2.5, unit: 'kg' },
      { item: 'Fresh Fruits', startingStock: 25, consumed: 18, remaining: 7, unit: 'kg' }
    ],
    month: [
      { item: 'Premium Tobacco', startingStock: 40, consumed: 35, remaining: 5, unit: 'kg' },
      { item: 'Chicken Wings', startingStock: 100, consumed: 92, remaining: 8, unit: 'kg' },
      { item: 'Hummus', startingStock: 30, consumed: 28, remaining: 2, unit: 'kg' },
      { item: 'Fresh Fruits', startingStock: 80, consumed: 75, remaining: 5, unit: 'kg' }
    ]
  };

  const staffData = {
    day: [
      { name: 'Zeinab Aoun', role: 'Staff', ordersProcessed: 15, bookingsHandled: 5, hoursWorked: 8 },
      { name: 'Karim Farah', role: 'Staff', ordersProcessed: 12, bookingsHandled: 4, hoursWorked: 8 },
      { name: 'Nour Saleh', role: 'Staff', ordersProcessed: 18, bookingsHandled: 6, hoursWorked: 8 }
    ],
    week: [
      { name: 'Zeinab Aoun', role: 'Staff', ordersProcessed: 95, bookingsHandled: 32, hoursWorked: 40 },
      { name: 'Karim Farah', role: 'Staff', ordersProcessed: 85, bookingsHandled: 28, hoursWorked: 40 },
      { name: 'Nour Saleh', role: 'Staff', ordersProcessed: 105, bookingsHandled: 35, hoursWorked: 40 }
    ],
    month: [
      { name: 'Zeinab Aoun', role: 'Staff', ordersProcessed: 380, bookingsHandled: 128, hoursWorked: 160 },
      { name: 'Karim Farah', role: 'Staff', ordersProcessed: 340, bookingsHandled: 112, hoursWorked: 160 },
      { name: 'Nour Saleh', role: 'Staff', ordersProcessed: 420, bookingsHandled: 140, hoursWorked: 160 }
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

  const calculateTotals = (data) => {
    return data.reduce((acc, item) => {
      return {
        roomSales: acc.roomSales + item.roomSales,
        foodSales: acc.foodSales + item.foodSales,
        beverageSales: acc.beverageSales + item.beverageSales,
        arguileSales: acc.arguileSales + item.arguileSales,
        total: acc.total + item.total
      };
    }, { roomSales: 0, foodSales: 0, beverageSales: 0, arguileSales: 0, total: 0 });
  };

  const calculateRoomTotals = (data) => {
    return data.reduce((acc, item) => {
      return {
        bookings: acc.bookings + item.bookings,
        hours: acc.hours + item.hours,
        revenue: acc.revenue + item.revenue
      };
    }, { bookings: 0, hours: 0, revenue: 0 });
  };

  const renderSalesReport = () => {
    const data = salesData[dateRange];
    const totals = calculateTotals(data);
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Sales Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Revenue</p>
              <p className="text-2xl font-bold neon-text">{totals.total.toLocaleString()} LBP</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Room Revenue</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{totals.roomSales.toLocaleString()} LBP</p>
              <p className="text-xs text-gray-400">{Math.round(totals.roomSales / totals.total * 100)}% of total</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Food Revenue</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{totals.foodSales.toLocaleString()} LBP</p>
              <p className="text-xs text-gray-400">{Math.round(totals.foodSales / totals.total * 100)}% of total</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Beverage Revenue</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{totals.beverageSales.toLocaleString()} LBP</p>
              <p className="text-xs text-gray-400">{Math.round(totals.beverageSales / totals.total * 100)}% of total</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Arguile Revenue</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-purple))]">{totals.arguileSales.toLocaleString()} LBP</p>
              <p className="text-xs text-gray-400">{Math.round(totals.arguileSales / totals.total * 100)}% of total</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                  <th className="text-left py-2 px-3">Date</th>
                  <th className="text-right py-2 px-3">Room Sales</th>
                  <th className="text-right py-2 px-3">Food Sales</th>
                  <th className="text-right py-2 px-3">Beverage Sales</th>
                  <th className="text-right py-2 px-3">Arguile Sales</th>
                  <th className="text-right py-2 px-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                    <td className="py-2 px-3">{item.date}</td>
                    <td className="py-2 px-3 text-right text-[rgb(var(--neon-blue))]">{item.roomSales.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right text-[rgb(var(--neon-green))]">{item.foodSales.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right text-[rgb(var(--neon-orange))]">{item.beverageSales.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right text-[rgb(var(--neon-purple))]">{item.arguileSales.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right font-bold">{item.total.toLocaleString()} LBP</td>
                  </tr>
                ))}
                <tr className="bg-[rgba(15,10,40,0.7)]">
                  <td className="py-2 px-3 font-bold">Total</td>
                  <td className="py-2 px-3 text-right font-bold text-[rgb(var(--neon-blue))]">{totals.roomSales.toLocaleString()} LBP</td>
                  <td className="py-2 px-3 text-right font-bold text-[rgb(var(--neon-green))]">{totals.foodSales.toLocaleString()} LBP</td>
                  <td className="py-2 px-3 text-right font-bold text-[rgb(var(--neon-orange))]">{totals.beverageSales.toLocaleString()} LBP</td>
                  <td className="py-2 px-3 text-right font-bold text-[rgb(var(--neon-purple))]">{totals.arguileSales.toLocaleString()} LBP</td>
                  <td className="py-2 px-3 text-right font-bold">{totals.total.toLocaleString()} LBP</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Sales Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                        Room Sales
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                        {Math.round(totals.roomSales / totals.total * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round(totals.roomSales / totals.total * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]"></div>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-green))] bg-[rgba(var(--neon-green),0.2)]">
                        Food Sales
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-green))]">
                        {Math.round(totals.foodSales / totals.total * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round(totals.foodSales / totals.total * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-green))]"></div>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-orange))] bg-[rgba(var(--neon-orange),0.2)]">
                        Beverage Sales
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-orange))]">
                        {Math.round(totals.beverageSales / totals.total * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round(totals.beverageSales / totals.total * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-orange))]"></div>
                  </div>
                </div>
                
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-purple))] bg-[rgba(var(--neon-purple),0.2)]">
                        Arguile Sales
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-purple))]">
                        {Math.round(totals.arguileSales / totals.total * 100)}%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                    <div style={{ width: `${Math.round(totals.arguileSales / totals.total * 100)}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-purple))]"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card neon-border-green">
            <h3 className="text-xl font-bold mb-4 neon-text-green">Actions</h3>
            <div className="space-y-4">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Export Reports</h4>
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
                <h4 className="font-bold mb-2">Schedule Reports</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="dailyReport"
                      className="w-4 h-4 text-[rgb(var(--neon-blue))] bg-[rgba(15,10,40,0.7)] border-[rgba(var(--neon-blue),0.3)] rounded focus:ring-[rgb(var(--neon-blue))] focus:ring-opacity-25"
                    />
                    <label htmlFor="dailyReport" className="ml-2 text-sm">Daily Report (Email)</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="weeklyReport"
                      className="w-4 h-4 text-[rgb(var(--neon-blue))] bg-[rgba(15,10,40,0.7)] border-[rgba(var(--neon-blue),0.3)] rounded focus:ring-[rgb(var(--neon-blue))] focus:ring-opacity-25"
                      checked
                    />
                    <label htmlFor="weeklyReport" className="ml-2 text-sm">Weekly Report (Email)</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="monthlyReport"
                      className="w-4 h-4 text-[rgb(var(--neon-blue))] bg-[rgba(15,10,40,0.7)] border-[rgba(var(--neon-blue),0.3)] rounded focus:ring-[rgb(var(--neon-blue))] focus:ring-opacity-25"
                      checked
                    />
                    <label htmlFor="monthlyReport" className="ml-2 text-sm">Monthly Report (Email)</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRoomReport = () => {
    const data = roomData[dateRange];
    const totals = calculateRoomTotals(data);
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Room Performance</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Bookings</p>
              <p className="text-2xl font-bold neon-text">{totals.bookings}</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Hours</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{totals.hours}</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Revenue</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{totals.revenue.toLocaleString()} LBP</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                  <th className="text-left py-2 px-3">Room</th>
                  <th className="text-right py-2 px-3">Bookings</th>
                  <th className="text-right py-2 px-3">Hours</th>
                  <th className="text-right py-2 px-3">Revenue</th>
                  <th className="text-right py-2 px-3">Avg. Hours/Booking</th>
                  <th className="text-right py-2 px-3">Occupancy Rate</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                    <td className="py-2 px-3">{item.room}</td>
                    <td className="py-2 px-3 text-right">{item.bookings}</td>
                    <td className="py-2 px-3 text-right">{item.hours}</td>
                    <td className="py-2 px-3 text-right">{item.revenue.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right">{(item.hours / item.bookings).toFixed(1)}</td>
                    <td className="py-2 px-3 text-right">
                      {dateRange === 'day' ? 
                        Math.round(item.hours / 24 * 100) : 
                        dateRange === 'week' ? 
                          Math.round(item.hours / (24 * 7) * 100) : 
                          Math.round(item.hours / (24 * 30) * 100)
                      }%
                    </td>
                  </tr>
                ))}
                <tr className="bg-[rgba(15,10,40,0.7)]">
                  <td className="py-2 px-3 font-bold">Total</td>
                  <td className="py-2 px-3 text-right font-bold">{totals.bookings}</td>
                  <td className="py-2 px-3 text-right font-bold">{totals.hours}</td>
                  <td className="py-2 px-3 text-right font-bold">{totals.revenue.toLocaleString()} LBP</td>
                  <td className="py-2 px-3 text-right font-bold">{(totals.hours / totals.bookings).toFixed(1)}</td>
                  <td className="py-2 px-3 text-right font-bold">
                    {dateRange === 'day' ? 
                      Math.round(totals.hours / (24 * 4) * 100) : 
                      dateRange === 'week' ? 
                        Math.round(totals.hours / (24 * 7 * 4) * 100) : 
                        Math.round(totals.hours / (24 * 30 * 4) * 100)
                    }%
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Room Utilization</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {data.map((item, index) => (
                  <div key={index} className="relative pt-1 mb-4">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                          {item.room}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                          {dateRange === 'day' ? 
                            Math.round(item.hours / 24 * 100) : 
                            dateRange === 'week' ? 
                              Math.round(item.hours / (24 * 7) * 100) : 
                              Math.round(item.hours / (24 * 30) * 100)
                          }%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                      <div style={{ width: `${dateRange === 'day' ? 
                        Math.round(item.hours / 24 * 100) : 
                        dateRange === 'week' ? 
                          Math.round(item.hours / (24 * 7) * 100) : 
                          Math.round(item.hours / (24 * 30) * 100)}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card neon-border-green">
            <h3 className="text-xl font-bold mb-4 neon-text-green">Revenue Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {data.map((item, index) => (
                  <div key={index} className="relative pt-1 mb-4">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-green))] bg-[rgba(var(--neon-green),0.2)]">
                          {item.room}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-green))]">
                          {Math.round(item.revenue / totals.revenue * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                      <div style={{ width: `${Math.round(item.revenue / totals.revenue * 100)}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-green))]">
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderInventoryReport = () => {
    const data = inventoryData[dateRange];
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Inventory Status</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                  <th className="text-left py-2 px-3">Item</th>
                  <th className="text-right py-2 px-3">Starting Stock</th>
                  <th className="text-right py-2 px-3">Consumed</th>
                  <th className="text-right py-2 px-3">Remaining</th>
                  <th className="text-right py-2 px-3">Usage Rate</th>
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
                    <td className="py-2 px-3 text-right">{Math.round(item.consumed / item.startingStock * 100)}%</td>
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
                    <span>Export Inventory Report</span>
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

  const renderStaffReport = () => {
    const data = staffData[dateRange];
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Staff Performance</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                  <th className="text-left py-2 px-3">Staff Member</th>
                  <th className="text-left py-2 px-3">Role</th>
                  <th className="text-right py-2 px-3">Orders Processed</th>
                  <th className="text-right py-2 px-3">Bookings Handled</th>
                  <th className="text-right py-2 px-3">Hours Worked</th>
                  <th className="text-right py-2 px-3">Efficiency</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                    <td className="py-2 px-3">{item.name}</td>
                    <td className="py-2 px-3">{item.role}</td>
                    <td className="py-2 px-3 text-right">{item.ordersProcessed}</td>
                    <td className="py-2 px-3 text-right">{item.bookingsHandled}</td>
                    <td className="py-2 px-3 text-right">{item.hoursWorked}</td>
                    <td className="py-2 px-3 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        (item.ordersProcessed + item.bookingsHandled) / item.hoursWorked > 3.5 ? 'bg-green-600' : 
                        (item.ordersProcessed + item.bookingsHandled) / item.hoursWorked > 2.5 ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                        'bg-[rgba(var(--neon-orange),0.8)]'
                      }`}>
                        {((item.ordersProcessed + item.bookingsHandled) / item.hoursWorked).toFixed(1)} tasks/hour
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Orders Processed</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {data.map((item, index) => (
                  <div key={index} className="relative pt-1 mb-4">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                          {item.ordersProcessed}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                      <div style={{ width: `${Math.round(item.ordersProcessed / Math.max(...data.map(d => d.ordersProcessed)) * 100)}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="card neon-border-green">
            <h3 className="text-xl font-bold mb-4 neon-text-green">Bookings Handled</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {data.map((item, index) => (
                  <div key={index} className="relative pt-1 mb-4">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-green))] bg-[rgba(var(--neon-green),0.2)]">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-green))]">
                          {item.bookingsHandled}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                      <div style={{ width: `${Math.round(item.bookingsHandled / Math.max(...data.map(d => d.bookingsHandled)) * 100)}%` }} 
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-green))]">
                      </div>
                    </div>
                  </div>
                ))}
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
          <title>Owner Reports | Underground Chilling Room</title>
          <meta name="description" content="Owner reports for Underground Chilling Room" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/dashboard/owner">
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
            <h2 className="text-2xl font-bold neon-text">Owner Reports</h2>
            <Link href="/dashboard/owner">
              <a className="btn-secondary text-sm">
                Back to Dashboard
              </a>
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="flex border-b border-[rgba(var(--neon-blue),0.3)]">
              <button
                className={`neon-tab ${activeTab === 'sales' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('sales')}
              >
                Sales Reports
              </button>
              <button
                className={`neon-tab ${activeTab === 'rooms' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('rooms')}
              >
                Room Reports
              </button>
              <button
                className={`neon-tab ${activeTab === 'inventory' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('inventory')}
              >
                Inventory Reports
              </button>
              <button
                className={`neon-tab ${activeTab === 'staff' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('staff')}
              >
                Staff Reports
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
              {activeTab === 'sales' && renderSalesReport()}
              {activeTab === 'rooms' && renderRoomReport()}
              {activeTab === 'inventory' && renderInventoryReport()}
              {activeTab === 'staff' && renderStaffReport()}
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
export default withRoleProtection(OwnerReports, ['owner']);
