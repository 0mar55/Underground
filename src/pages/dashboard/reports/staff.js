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

function StaffReports() {
  const [activeTab, setActiveTab] = useState('orders');
  const [dateRange, setDateRange] = useState('day');
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  // Mock data for reports
  const ordersData = {
    day: [
      { id: 'ORD-2025-0401-1', room: 'Neon Lounge', client: 'Nadia Mansour', items: 'Arguile (Apple), Hummus, Soft Drinks x2', total: 200000, status: 'Delivered', time: '15:30' },
      { id: 'ORD-2025-0401-2', room: 'Purple Haze', client: 'Fadi Abboud', items: 'Arguile (Mint), Chicken Wings, Soft Drinks x2', total: 250000, status: 'Preparing', time: '18:45' },
      { id: 'ORD-2025-0401-3', room: 'Blue Velvet', client: 'Rima Khoury', items: 'Arguile (Mixed Berries), Tabbouleh, Soft Drinks x3', total: 300000, status: 'Pending', time: '19:15' },
      { id: 'ORD-2025-0401-4', room: 'Midnight Oasis', client: 'Hassan Nassar', items: 'Arguile (Grape), Fries, Soft Drinks x1', total: 150000, status: 'Delivered', time: '20:30' },
      { id: 'ORD-2025-0401-5', room: null, client: 'Maya Saleh', items: 'Arguile (Mint), Hummus, Soft Drinks x2', total: 150000, status: 'Out for Delivery', time: '21:00', address: 'Ain el Remaneh, Street 7, Building 12' }
    ],
    week: [
      { id: 'ORD-2025-0326-1', room: 'Neon Lounge', client: 'Nadia Mansour', items: 'Arguile (Apple), Hummus, Soft Drinks x2', total: 200000, status: 'Delivered', time: '15:30' },
      { id: 'ORD-2025-0326-2', room: 'Purple Haze', client: 'Fadi Abboud', items: 'Arguile (Mint), Chicken Wings, Soft Drinks x2', total: 250000, status: 'Delivered', time: '18:45' },
      { id: 'ORD-2025-0327-1', room: 'Blue Velvet', client: 'Rima Khoury', items: 'Arguile (Mixed Berries), Tabbouleh, Soft Drinks x3', total: 300000, status: 'Delivered', time: '19:15' },
      { id: 'ORD-2025-0327-2', room: 'Midnight Oasis', client: 'Hassan Nassar', items: 'Arguile (Grape), Fries, Soft Drinks x1', total: 150000, status: 'Delivered', time: '20:30' },
      { id: 'ORD-2025-0328-1', room: null, client: 'Maya Saleh', items: 'Arguile (Mint), Hummus, Soft Drinks x2', total: 150000, status: 'Delivered', time: '21:00', address: 'Ain el Remaneh, Street 7, Building 12' },
      { id: 'ORD-2025-0329-1', room: 'Purple Haze', client: 'Omar Haddad', items: 'Arguile (Double Apple), Chicken Wings, Soft Drinks x3', total: 300000, status: 'Delivered', time: '16:15' },
      { id: 'ORD-2025-0329-2', room: 'Blue Velvet', client: 'Layla Karam', items: 'Arguile (Mint), Tabbouleh, Hummus, Soft Drinks x4', total: 350000, status: 'Delivered', time: '20:45' },
      { id: 'ORD-2025-0330-1', room: 'Neon Lounge', client: 'Ziad Aoun', items: 'Arguile (Grape), Fries, Soft Drinks x3', total: 225000, status: 'Delivered', time: '17:30' },
      { id: 'ORD-2025-0330-2', room: 'Midnight Oasis', client: 'Tala Farah', items: 'Arguile (Mixed Berries), Hummus, Soft Drinks x2', total: 175000, status: 'Delivered', time: '19:45' },
      { id: 'ORD-2025-0331-1', room: null, client: 'Karim Nassar', items: 'Arguile (Apple), Chicken Wings, Soft Drinks x2', total: 200000, status: 'Delivered', time: '18:30', address: 'Ain el Remaneh, Street 12, Building 5' },
      { id: 'ORD-2025-0401-1', room: 'Neon Lounge', client: 'Nadia Mansour', items: 'Arguile (Apple), Hummus, Soft Drinks x2', total: 200000, status: 'Delivered', time: '15:30' },
      { id: 'ORD-2025-0401-2', room: 'Purple Haze', client: 'Fadi Abboud', items: 'Arguile (Mint), Chicken Wings, Soft Drinks x2', total: 250000, status: 'Preparing', time: '18:45' },
      { id: 'ORD-2025-0401-3', room: 'Blue Velvet', client: 'Rima Khoury', items: 'Arguile (Mixed Berries), Tabbouleh, Soft Drinks x3', total: 300000, status: 'Pending', time: '19:15' },
      { id: 'ORD-2025-0401-4', room: 'Midnight Oasis', client: 'Hassan Nassar', items: 'Arguile (Grape), Fries, Soft Drinks x1', total: 150000, status: 'Delivered', time: '20:30' },
      { id: 'ORD-2025-0401-5', room: null, client: 'Maya Saleh', items: 'Arguile (Mint), Hummus, Soft Drinks x2', total: 150000, status: 'Out for Delivery', time: '21:00', address: 'Ain el Remaneh, Street 7, Building 12' }
    ],
    month: [
      { category: 'Arguile', count: 85, revenue: 8500000, avgOrderValue: 100000 },
      { category: 'Food', count: 65, revenue: 6500000, avgOrderValue: 100000 },
      { category: 'Beverages', count: 120, revenue: 3600000, avgOrderValue: 30000 },
      { category: 'Room Service', count: 75, revenue: 18750000, avgOrderValue: 250000 },
      { category: 'Delivery', count: 25, revenue: 3750000, avgOrderValue: 150000 }
    ]
  };

  const roomsData = {
    day: [
      { room: 'Neon Lounge', status: 'Occupied', client: 'Nadia Mansour', timeRemaining: '1h 30m', orders: 1 },
      { room: 'Purple Haze', status: 'Occupied', client: 'Fadi Abboud', timeRemaining: '3h 15m', orders: 1 },
      { room: 'Blue Velvet', status: 'Reserved', client: 'Rima Khoury', timeUntil: '0h 45m', orders: 0 },
      { room: 'Midnight Oasis', status: 'Occupied', client: 'Hassan Nassar', timeRemaining: '2h 30m', orders: 1 }
    ],
    week: [
      { room: 'Neon Lounge', occupancyRate: 85, totalHours: 42, totalRevenue: 3150000, avgPersons: 5.2 },
      { room: 'Purple Haze', occupancyRate: 75, totalHours: 38, totalRevenue: 2850000, avgPersons: 4.8 },
      { room: 'Blue Velvet', occupancyRate: 90, totalHours: 45, totalRevenue: 3600000, avgPersons: 7.5 },
      { room: 'Midnight Oasis', occupancyRate: 65, totalHours: 32, totalRevenue: 2400000, avgPersons: 3.5 }
    ],
    month: [
      { room: 'Neon Lounge', occupancyRate: 80, totalHours: 160, totalRevenue: 12000000, avgPersons: 5.5 },
      { room: 'Purple Haze', occupancyRate: 75, totalHours: 150, totalRevenue: 11250000, avgPersons: 4.8 },
      { room: 'Blue Velvet', occupancyRate: 85, totalHours: 170, totalRevenue: 13600000, avgPersons: 7.2 },
      { room: 'Midnight Oasis', occupancyRate: 70, totalHours: 140, totalRevenue: 10500000, avgPersons: 3.8 }
    ]
  };

  const deliveryData = {
    day: [
      { id: 'DEL-2025-0401-1', client: 'Maya Saleh', items: 'Arguile (Mint), Hummus, Soft Drinks x2', total: 150000, status: 'Out for Delivery', time: '21:00', address: 'Ain el Remaneh, Street 7, Building 12', distance: 1.5 },
      { id: 'DEL-2025-0401-2', client: 'Ali Hassan', items: 'Arguile (Apple), Fries, Soft Drinks x1', total: 125000, status: 'Delivered', time: '19:30', address: 'Ain el Remaneh, Street 15, Building 3', distance: 0.8 },
      { id: 'DEL-2025-0401-3', client: 'Sara Khoury', items: 'Arguile (Mixed Berries), Tabbouleh, Soft Drinks x2', total: 175000, status: 'Pending', time: '21:30', address: 'Furn el Chebbak, Main Street, Building 22', distance: 2.5 }
    ],
    week: [
      { day: 'Wednesday', count: 5, revenue: 750000, avgDistance: 1.8, deliveryFees: 50000 },
      { day: 'Thursday', count: 6, revenue: 900000, avgDistance: 1.5, deliveryFees: 50000 },
      { day: 'Friday', count: 8, revenue: 1200000, avgDistance: 2.1, deliveryFees: 100000 },
      { day: 'Saturday', count: 10, revenue: 1500000, avgDistance: 1.9, deliveryFees: 100000 },
      { day: 'Sunday', count: 7, revenue: 1050000, avgDistance: 1.7, deliveryFees: 50000 },
      { day: 'Monday', count: 4, revenue: 600000, avgDistance: 1.6, deliveryFees: 50000 },
      { day: 'Tuesday', count: 3, revenue: 450000, avgDistance: 2.0, deliveryFees: 50000 }
    ],
    month: [
      { week: 'Week 1', count: 22, revenue: 3300000, avgDistance: 1.7, deliveryFees: 200000 },
      { week: 'Week 2', count: 28, revenue: 4200000, avgDistance: 1.8, deliveryFees: 250000 },
      { week: 'Week 3', count: 35, revenue: 5250000, avgDistance: 1.9, deliveryFees: 300000 },
      { week: 'Week 4', count: 30, revenue: 4500000, avgDistance: 1.8, deliveryFees: 250000 }
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

  const calculateOrderStats = (data) => {
    if (dateRange === 'month') {
      return {
        totalOrders: data.reduce((acc, item) => acc + item.count, 0),
        totalRevenue: data.reduce((acc, item) => acc + item.revenue, 0),
        avgOrderValue: data.reduce((acc, item) => acc + item.revenue, 0) / data.reduce((acc, item) => acc + item.count, 0)
      };
    } else {
      return {
        totalOrders: data.length,
        pendingOrders: data.filter(item => item.status === 'Pending').length,
        preparingOrders: data.filter(item => item.status === 'Preparing').length,
        deliveredOrders: data.filter(item => item.status === 'Delivered').length,
        outForDeliveryOrders: data.filter(item => item.status === 'Out for Delivery').length,
        totalRevenue: data.reduce((acc, item) => acc + item.total, 0),
        roomOrders: data.filter(item => item.room !== null).length,
        deliveryOrders: data.filter(item => item.room === null).length
      };
    }
  };

  const renderOrdersReport = () => {
    const data = ordersData[dateRange];
    const stats = calculateOrderStats(data);
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Orders Summary</h3>
          
          {dateRange !== 'month' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                <p className="text-sm text-gray-300">Total Orders</p>
                <p className="text-2xl font-bold neon-text">{stats.totalOrders}</p>
                <div className="flex justify-center mt-1 text-xs">
                  <span className="text-[rgb(var(--neon-blue))] mr-2">Room: {stats.roomOrders}</span>
                  <span className="text-[rgb(var(--neon-green))]">Delivery: {stats.deliveryOrders}</span>
                </div>
              </div>
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                <p className="text-sm text-gray-300">Pending/Preparing</p>
                <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{stats.pendingOrders + stats.preparingOrders}</p>
                <div className="flex justify-center mt-1 text-xs">
                  <span className="text-[rgb(var(--neon-orange))] mr-2">Pending: {stats.pendingOrders}</span>
                  <span className="text-[rgb(var(--neon-blue))]">Preparing: {stats.preparingOrders}</span>
                </div>
              </div>
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                <p className="text-sm text-gray-300">Delivered/Out for Delivery</p>
                <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{stats.deliveredOrders + stats.outForDeliveryOrders}</p>
                <div className="flex justify-center mt-1 text-xs">
                  <span className="text-[rgb(var(--neon-green))] mr-2">Delivered: {stats.deliveredOrders}</span>
                  <span className="text-[rgb(var(--neon-blue))]">Out: {stats.outForDeliveryOrders}</span>
                </div>
              </div>
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                <p className="text-sm text-gray-300">Total Revenue</p>
                <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{stats.totalRevenue.toLocaleString()} LBP</p>
                <p className="text-xs text-gray-400">Avg: {Math.round(stats.totalRevenue / stats.totalOrders).toLocaleString()} LBP</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                <p className="text-sm text-gray-300">Total Orders</p>
                <p className="text-2xl font-bold neon-text">{stats.totalOrders}</p>
              </div>
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                <p className="text-sm text-gray-300">Total Revenue</p>
                <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{stats.totalRevenue.toLocaleString()} LBP</p>
              </div>
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                <p className="text-sm text-gray-300">Avg. Order Value</p>
                <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{Math.round(stats.avgOrderValue).toLocaleString()} LBP</p>
              </div>
            </div>
          )}
          
          {dateRange !== 'month' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                    <th className="text-left py-2 px-3">Order ID</th>
                    <th className="text-left py-2 px-3">Location</th>
                    <th className="text-left py-2 px-3">Client</th>
                    <th className="text-left py-2 px-3">Items</th>
                    <th className="text-right py-2 px-3">Total</th>
                    <th className="text-right py-2 px-3">Time</th>
                    <th className="text-right py-2 px-3">Status</th>
                    <th className="text-right py-2 px-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order, index) => (
                    <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                      <td className="py-2 px-3">{order.id}</td>
                      <td className="py-2 px-3">{order.room ? order.room : `Delivery: ${order.address}`}</td>
                      <td className="py-2 px-3">{order.client}</td>
                      <td className="py-2 px-3">{order.items}</td>
                      <td className="py-2 px-3 text-right">{order.total.toLocaleString()} LBP</td>
                      <td className="py-2 px-3 text-right">{order.time}</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          order.status === 'Delivered' ? 'bg-green-600' : 
                          order.status === 'Preparing' ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                          order.status === 'Out for Delivery' ? 'bg-[rgba(var(--neon-purple),0.8)]' : 
                          order.status === 'Pending' ? 'bg-[rgba(var(--neon-orange),0.8)]' : 
                          'bg-red-600'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right">
                        {order.status !== 'Delivered' && (
                          <button className="text-[rgb(var(--neon-blue))] hover:underline text-sm">
                            Update
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                    <th className="text-left py-2 px-3">Category</th>
                    <th className="text-right py-2 px-3">Orders</th>
                    <th className="text-right py-2 px-3">Revenue</th>
                    <th className="text-right py-2 px-3">Avg. Order Value</th>
                    <th className="text-right py-2 px-3">% of Total</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((category, index) => (
                    <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                      <td className="py-2 px-3">{category.category}</td>
                      <td className="py-2 px-3 text-right">{category.count}</td>
                      <td className="py-2 px-3 text-right">{category.revenue.toLocaleString()} LBP</td>
                      <td className="py-2 px-3 text-right">{category.avgOrderValue.toLocaleString()} LBP</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          (category.revenue / stats.totalRevenue) > 0.3 ? 'bg-green-600' : 
                          (category.revenue / stats.totalRevenue) > 0.2 ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                          'bg-[rgba(var(--neon-orange),0.8)]'
                        }`}>
                          {Math.round((category.revenue / stats.totalRevenue) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[rgba(15,10,40,0.7)]">
                    <td className="py-2 px-3 font-bold">Total</td>
                    <td className="py-2 px-3 text-right font-bold">{stats.totalOrders}</td>
                    <td className="py-2 px-3 text-right font-bold">{stats.totalRevenue.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right font-bold">{Math.round(stats.avgOrderValue).toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right font-bold">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Pending Orders</h3>
            <div className="space-y-4">
              {dateRange !== 'month' ? (
                data.filter(order => order.status === 'Pending').map((order, index) => (
                  <div key={index} className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{order.client}</h4>
                        <p className="text-sm text-gray-300">{order.room ? `Room: ${order.room}` : `Delivery: ${order.address}`}</p>
                        <p className="text-sm text-gray-300">{order.items}</p>
                        <p className="text-sm text-gray-300">Time: {order.time}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{order.total.toLocaleString()} LBP</p>
                        <div className="mt-2 space-x-2">
                          <button className="btn-sm bg-[rgba(var(--neon-blue),0.8)] hover:bg-[rgb(var(--neon-blue))] text-white">
                            Accept
                          </button>
                          <button className="btn-sm bg-red-600 hover:bg-red-700 text-white">
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-400">Switch to day or week view to see pending orders</p>
                </div>
              )}
              {dateRange !== 'month' && data.filter(order => order.status === 'Pending').length === 0 && (
                <div className="flex items-center justify-center h-32">
                  <p className="text-gray-400">No pending orders</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="card neon-border-green">
            <h3 className="text-xl font-bold mb-4 neon-text-green">Actions</h3>
            <div className="space-y-4">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="btn-secondary text-sm w-full">
                    <span>Create New Order</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>View Kitchen Queue</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Manage Delivery Routes</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Order Notifications</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">New orders</span>
                    <span className="px-2 py-1 rounded text-xs bg-[rgba(var(--neon-orange),0.8)]">
                      {dateRange !== 'month' ? data.filter(order => order.status === 'Pending').length : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Preparing</span>
                    <span className="px-2 py-1 rounded text-xs bg-[rgba(var(--neon-blue),0.8)]">
                      {dateRange !== 'month' ? data.filter(order => order.status === 'Preparing').length : 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Out for delivery</span>
                    <span className="px-2 py-1 rounded text-xs bg-[rgba(var(--neon-purple),0.8)]">
                      {dateRange !== 'month' ? data.filter(order => order.status === 'Out for Delivery').length : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderRoomsReport = () => {
    const data = roomsData[dateRange];
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Room Status</h3>
          
          {dateRange === 'day' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.map((room, index) => (
                <div key={index} className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold">{room.room}</h4>
                    <span className={`px-2 py-1 rounded text-xs ${
                      room.status === 'Occupied' ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                      room.status === 'Reserved' ? 'bg-[rgba(var(--neon-orange),0.8)]' : 
                      'bg-green-600'
                    }`}>
                      {room.status}
                    </span>
                  </div>
                  <div className="mt-2">
                    {room.status === 'Occupied' ? (
                      <>
                        <p className="text-sm text-gray-300">Client: {room.client}</p>
                        <p className="text-sm text-gray-300">Time Remaining: {room.timeRemaining}</p>
                        <p className="text-sm text-gray-300">Orders: {room.orders}</p>
                      </>
                    ) : room.status === 'Reserved' ? (
                      <>
                        <p className="text-sm text-gray-300">Client: {room.client}</p>
                        <p className="text-sm text-gray-300">Time Until Arrival: {room.timeUntil}</p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-300">Available for booking</p>
                    )}
                  </div>
                  <div className="mt-3">
                    <button className="btn-sm bg-[rgba(var(--neon-blue),0.8)] hover:bg-[rgb(var(--neon-blue))] text-white w-full">
                      {room.status === 'Occupied' ? 'View Details' : 
                       room.status === 'Reserved' ? 'Check In' : 
                       'Book Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                    <th className="text-left py-2 px-3">Room</th>
                    <th className="text-right py-2 px-3">Occupancy Rate</th>
                    <th className="text-right py-2 px-3">Total Hours</th>
                    <th className="text-right py-2 px-3">Avg. Persons</th>
                    <th className="text-right py-2 px-3">Total Revenue</th>
                    <th className="text-right py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((room, index) => (
                    <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                      <td className="py-2 px-3">{room.room}</td>
                      <td className="py-2 px-3 text-right">{room.occupancyRate}%</td>
                      <td className="py-2 px-3 text-right">{room.totalHours}</td>
                      <td className="py-2 px-3 text-right">{room.avgPersons.toFixed(1)}</td>
                      <td className="py-2 px-3 text-right">{room.totalRevenue.toLocaleString()} LBP</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          room.occupancyRate >= 80 ? 'bg-green-600' : 
                          room.occupancyRate >= 70 ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                          'bg-[rgba(var(--neon-orange),0.8)]'
                        }`}>
                          {room.occupancyRate >= 80 ? 'High' : 
                           room.occupancyRate >= 70 ? 'Medium' : 
                           'Low'}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[rgba(15,10,40,0.7)]">
                    <td className="py-2 px-3 font-bold">Average</td>
                    <td className="py-2 px-3 text-right font-bold">
                      {Math.round(data.reduce((acc, room) => acc + room.occupancyRate, 0) / data.length)}%
                    </td>
                    <td className="py-2 px-3 text-right font-bold">
                      {data.reduce((acc, room) => acc + room.totalHours, 0)}
                    </td>
                    <td className="py-2 px-3 text-right font-bold">
                      {(data.reduce((acc, room) => acc + room.avgPersons, 0) / data.length).toFixed(1)}
                    </td>
                    <td className="py-2 px-3 text-right font-bold">
                      {data.reduce((acc, room) => acc + room.totalRevenue, 0).toLocaleString()} LBP
                    </td>
                    <td className="py-2 px-3 text-right font-bold">-</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        {dateRange !== 'day' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card neon-border-blue">
              <h3 className="text-xl font-bold mb-4 neon-text-blue">Room Occupancy</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  {data.map((room, index) => (
                    <div key={index} className="relative pt-1 mb-4">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                            {room.room}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                            {room.occupancyRate}%
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                        <div style={{ width: `${room.occupancyRate}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="card neon-border-green">
              <h3 className="text-xl font-bold mb-4 neon-text-green">Room Revenue</h3>
              <div className="h-64 flex items-center justify-center">
                <div className="w-full max-w-xs">
                  {data.map((room, index) => (
                    <div key={index} className="relative pt-1 mb-4">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-green))] bg-[rgba(var(--neon-green),0.2)]">
                            {room.room}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-green))]">
                            {room.totalRevenue.toLocaleString()} LBP
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                        <div style={{ width: `${Math.round((room.totalRevenue / Math.max(...data.map(r => r.totalRevenue))) * 100)}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-green))]">
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        
        {dateRange === 'day' && (
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Room Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Upcoming Reservations</h4>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span>Blue Velvet - Rima Khoury</span>
                    <span className="text-[rgb(var(--neon-orange))]">In 45m</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Neon Lounge - Ahmad Khalil</span>
                    <span className="text-[rgb(var(--neon-blue))]">In 3h 15m</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Purple Haze - Layla Karam</span>
                    <span className="text-[rgb(var(--neon-blue))]">In 4h 30m</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="btn-secondary text-sm w-full">
                    <span>Create New Booking</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Room Maintenance</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>View Full Schedule</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderDeliveryReport = () => {
    const data = deliveryData[dateRange];
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Delivery Summary</h3>
          
          {dateRange === 'day' ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Total Deliveries</p>
                  <p className="text-2xl font-bold neon-text">{data.length}</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Pending</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{data.filter(item => item.status === 'Pending').length}</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Out for Delivery</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{data.filter(item => item.status === 'Out for Delivery').length}</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Delivered</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{data.filter(item => item.status === 'Delivered').length}</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                      <th className="text-left py-2 px-3">Delivery ID</th>
                      <th className="text-left py-2 px-3">Client</th>
                      <th className="text-left py-2 px-3">Items</th>
                      <th className="text-left py-2 px-3">Address</th>
                      <th className="text-right py-2 px-3">Distance</th>
                      <th className="text-right py-2 px-3">Total</th>
                      <th className="text-right py-2 px-3">Time</th>
                      <th className="text-right py-2 px-3">Status</th>
                      <th className="text-right py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((delivery, index) => (
                      <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                        <td className="py-2 px-3">{delivery.id}</td>
                        <td className="py-2 px-3">{delivery.client}</td>
                        <td className="py-2 px-3">{delivery.items}</td>
                        <td className="py-2 px-3">{delivery.address}</td>
                        <td className="py-2 px-3 text-right">{delivery.distance} km</td>
                        <td className="py-2 px-3 text-right">{delivery.total.toLocaleString()} LBP</td>
                        <td className="py-2 px-3 text-right">{delivery.time}</td>
                        <td className="py-2 px-3 text-right">
                          <span className={`px-2 py-1 rounded text-xs ${
                            delivery.status === 'Delivered' ? 'bg-green-600' : 
                            delivery.status === 'Out for Delivery' ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                            'bg-[rgba(var(--neon-orange),0.8)]'
                          }`}>
                            {delivery.status}
                          </span>
                        </td>
                        <td className="py-2 px-3 text-right">
                          {delivery.status !== 'Delivered' && (
                            <button className="text-[rgb(var(--neon-blue))] hover:underline text-sm">
                              Update
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Total Deliveries</p>
                  <p className="text-2xl font-bold neon-text">{data.reduce((acc, item) => acc + item.count, 0)}</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Total Revenue</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{data.reduce((acc, item) => acc + item.revenue, 0).toLocaleString()} LBP</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Avg. Distance</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">
                    {(data.reduce((acc, item) => acc + (item.avgDistance * item.count), 0) / data.reduce((acc, item) => acc + item.count, 0)).toFixed(1)} km
                  </p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Delivery Fees</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{data.reduce((acc, item) => acc + item.deliveryFees, 0).toLocaleString()} LBP</p>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                      <th className="text-left py-2 px-3">{dateRange === 'week' ? 'Day' : 'Week'}</th>
                      <th className="text-right py-2 px-3">Deliveries</th>
                      <th className="text-right py-2 px-3">Revenue</th>
                      <th className="text-right py-2 px-3">Avg. Distance</th>
                      <th className="text-right py-2 px-3">Delivery Fees</th>
                      <th className="text-right py-2 px-3">Avg. Per Delivery</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                        <td className="py-2 px-3">{dateRange === 'week' ? item.day : item.week}</td>
                        <td className="py-2 px-3 text-right">{item.count}</td>
                        <td className="py-2 px-3 text-right">{item.revenue.toLocaleString()} LBP</td>
                        <td className="py-2 px-3 text-right">{item.avgDistance.toFixed(1)} km</td>
                        <td className="py-2 px-3 text-right">{item.deliveryFees.toLocaleString()} LBP</td>
                        <td className="py-2 px-3 text-right">{Math.round(item.revenue / item.count).toLocaleString()} LBP</td>
                      </tr>
                    ))}
                    <tr className="bg-[rgba(15,10,40,0.7)]">
                      <td className="py-2 px-3 font-bold">Total</td>
                      <td className="py-2 px-3 text-right font-bold">{data.reduce((acc, item) => acc + item.count, 0)}</td>
                      <td className="py-2 px-3 text-right font-bold">{data.reduce((acc, item) => acc + item.revenue, 0).toLocaleString()} LBP</td>
                      <td className="py-2 px-3 text-right font-bold">
                        {(data.reduce((acc, item) => acc + (item.avgDistance * item.count), 0) / data.reduce((acc, item) => acc + item.count, 0)).toFixed(1)} km
                      </td>
                      <td className="py-2 px-3 text-right font-bold">{data.reduce((acc, item) => acc + item.deliveryFees, 0).toLocaleString()} LBP</td>
                      <td className="py-2 px-3 text-right font-bold">
                        {Math.round(data.reduce((acc, item) => acc + item.revenue, 0) / data.reduce((acc, item) => acc + item.count, 0)).toLocaleString()} LBP
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {dateRange === 'day' ? (
            <>
              <div className="card neon-border-blue">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">Delivery Map</h3>
                <div className="h-64 flex items-center justify-center bg-[rgba(15,10,40,0.7)] rounded-lg">
                  <div className="text-center">
                    <p className="text-gray-400">Interactive map would be displayed here</p>
                    <p className="text-gray-400 text-sm mt-2">Showing {data.length} delivery locations</p>
                  </div>
                </div>
              </div>
              
              <div className="card neon-border-green">
                <h3 className="text-xl font-bold mb-4 neon-text-green">Actions</h3>
                <div className="space-y-4">
                  <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Pending Deliveries</h4>
                    <ul className="space-y-2">
                      {data.filter(delivery => delivery.status === 'Pending').map((delivery, index) => (
                        <li key={index} className="flex justify-between items-center">
                          <span>{delivery.client} - {delivery.distance} km</span>
                          <div>
                            <button className="text-[rgb(var(--neon-green))] hover:underline text-sm mr-2">
                              Dispatch
                            </button>
                            <button className="text-red-500 hover:underline text-sm">
                              Cancel
                            </button>
                          </div>
                        </li>
                      ))}
                      {data.filter(delivery => delivery.status === 'Pending').length === 0 && (
                        <li className="text-gray-400">No pending deliveries</li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                    <h4 className="font-bold mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="btn-secondary text-sm w-full">
                        <span>Create New Delivery</span>
                      </button>
                      <button className="btn-secondary text-sm w-full">
                        <span>Optimize Routes</span>
                      </button>
                      <button className="btn-secondary text-sm w-full">
                        <span>Contact Delivery Staff</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="card neon-border-blue">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">Delivery Trends</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full max-w-xs">
                    {data.map((item, index) => (
                      <div key={index} className="relative pt-1 mb-4">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                              {dateRange === 'week' ? item.day : item.week}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                              {item.count} deliveries
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                          <div style={{ width: `${Math.round((item.count / Math.max(...data.map(d => d.count))) * 100)}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="card neon-border-green">
                <h3 className="text-xl font-bold mb-4 neon-text-green">Revenue Breakdown</h3>
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full max-w-xs">
                    {data.map((item, index) => (
                      <div key={index} className="relative pt-1 mb-4">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-green))] bg-[rgba(var(--neon-green),0.2)]">
                              {dateRange === 'week' ? item.day : item.week}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-green))]">
                              {item.revenue.toLocaleString()} LBP
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                          <div style={{ width: `${Math.round((item.revenue / Math.max(...data.map(d => d.revenue))) * 100)}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-green))]">
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Staff Reports | Underground Chilling Room</title>
          <meta name="description" content="Staff reports for Underground Chilling Room" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/dashboard/staff">
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
            <h2 className="text-2xl font-bold neon-text">Staff Reports</h2>
            <Link href="/dashboard/staff">
              <a className="btn-secondary text-sm">
                Back to Dashboard
              </a>
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="flex border-b border-[rgba(var(--neon-blue),0.3)]">
              <button
                className={`neon-tab ${activeTab === 'orders' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('orders')}
              >
                Orders
              </button>
              <button
                className={`neon-tab ${activeTab === 'rooms' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('rooms')}
              >
                Rooms
              </button>
              <button
                className={`neon-tab ${activeTab === 'delivery' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('delivery')}
              >
                Delivery
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
              {activeTab === 'orders' && renderOrdersReport()}
              {activeTab === 'rooms' && renderRoomsReport()}
              {activeTab === 'delivery' && renderDeliveryReport()}
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
export default withRoleProtection(StaffReports, ['owner', 'manager', 'staff']);
