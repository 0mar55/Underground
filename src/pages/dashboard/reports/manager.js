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

function ManagerReports() {
  const [activeTab, setActiveTab] = useState('bookings');
  const [dateRange, setDateRange] = useState('week');
  const [isLoading, setIsLoading] = useState(false);
  const { logout } = useAuth();

  // Mock data for reports
  const bookingsData = {
    day: [
      { id: 'BK-2025-0401-1', room: 'Neon Lounge', client: 'Nadia Mansour', time: '14:00-17:00', persons: 6, status: 'Confirmed', revenue: 450000 },
      { id: 'BK-2025-0401-2', room: 'Purple Haze', client: 'Fadi Abboud', time: '18:00-22:00', persons: 4, status: 'Confirmed', revenue: 500000 },
      { id: 'BK-2025-0401-3', room: 'Blue Velvet', client: 'Rima Khoury', time: '19:00-23:00', persons: 8, status: 'Pending', revenue: 650000 },
      { id: 'BK-2025-0401-4', room: 'Midnight Oasis', client: 'Hassan Nassar', time: '20:00-23:00', persons: 3, status: 'Confirmed', revenue: 350000 },
      { id: 'BK-2025-0401-5', room: 'Neon Lounge', client: 'Maya Saleh', time: '20:30-23:30', persons: 5, status: 'Cancelled', revenue: 0 }
    ],
    week: [
      { id: 'BK-2025-0326-1', room: 'Neon Lounge', client: 'Nadia Mansour', time: '14:00-17:00', persons: 6, status: 'Completed', revenue: 450000 },
      { id: 'BK-2025-0326-2', room: 'Purple Haze', client: 'Fadi Abboud', time: '18:00-22:00', persons: 4, status: 'Completed', revenue: 500000 },
      { id: 'BK-2025-0327-1', room: 'Blue Velvet', client: 'Rima Khoury', time: '19:00-23:00', persons: 8, status: 'Completed', revenue: 650000 },
      { id: 'BK-2025-0327-2', room: 'Midnight Oasis', client: 'Hassan Nassar', time: '20:00-23:00', persons: 3, status: 'Completed', revenue: 350000 },
      { id: 'BK-2025-0328-1', room: 'Neon Lounge', client: 'Maya Saleh', time: '20:30-23:30', persons: 5, status: 'Cancelled', revenue: 0 },
      { id: 'BK-2025-0329-1', room: 'Purple Haze', client: 'Omar Haddad', time: '15:00-19:00', persons: 6, status: 'Completed', revenue: 600000 },
      { id: 'BK-2025-0329-2', room: 'Blue Velvet', client: 'Layla Karam', time: '20:00-00:00', persons: 10, status: 'Completed', revenue: 800000 },
      { id: 'BK-2025-0330-1', room: 'Neon Lounge', client: 'Ziad Aoun', time: '16:00-20:00', persons: 7, status: 'Completed', revenue: 525000 },
      { id: 'BK-2025-0330-2', room: 'Midnight Oasis', client: 'Tala Farah', time: '19:00-22:00', persons: 4, status: 'Completed', revenue: 375000 },
      { id: 'BK-2025-0331-1', room: 'Purple Haze', client: 'Karim Nassar', time: '17:00-21:00', persons: 5, status: 'Completed', revenue: 500000 },
      { id: 'BK-2025-0401-1', room: 'Neon Lounge', client: 'Nadia Mansour', time: '14:00-17:00', persons: 6, status: 'Confirmed', revenue: 450000 },
      { id: 'BK-2025-0401-2', room: 'Purple Haze', client: 'Fadi Abboud', time: '18:00-22:00', persons: 4, status: 'Confirmed', revenue: 500000 },
      { id: 'BK-2025-0401-3', room: 'Blue Velvet', client: 'Rima Khoury', time: '19:00-23:00', persons: 8, status: 'Pending', revenue: 650000 },
      { id: 'BK-2025-0401-4', room: 'Midnight Oasis', client: 'Hassan Nassar', time: '20:00-23:00', persons: 3, status: 'Confirmed', revenue: 350000 },
      { id: 'BK-2025-0401-5', room: 'Neon Lounge', client: 'Maya Saleh', time: '20:30-23:30', persons: 5, status: 'Cancelled', revenue: 0 }
    ],
    month: [
      { room: 'Neon Lounge', totalBookings: 28, completedBookings: 25, cancelledBookings: 3, totalRevenue: 12500000, avgPersons: 6.2 },
      { room: 'Purple Haze', totalBookings: 22, completedBookings: 21, cancelledBookings: 1, totalRevenue: 10500000, avgPersons: 4.8 },
      { room: 'Blue Velvet', totalBookings: 25, completedBookings: 23, cancelledBookings: 2, totalRevenue: 15000000, avgPersons: 8.5 },
      { room: 'Midnight Oasis', totalBookings: 18, completedBookings: 16, cancelledBookings: 2, totalRevenue: 6000000, avgPersons: 3.5 }
    ]
  };

  const staffData = {
    day: [
      { name: 'Zeinab Aoun', role: 'Staff', ordersProcessed: 15, bookingsHandled: 5, hoursWorked: 8, rating: 4.8 },
      { name: 'Karim Farah', role: 'Staff', ordersProcessed: 12, bookingsHandled: 4, hoursWorked: 8, rating: 4.6 },
      { name: 'Nour Saleh', role: 'Staff', ordersProcessed: 18, bookingsHandled: 6, hoursWorked: 8, rating: 4.9 }
    ],
    week: [
      { name: 'Zeinab Aoun', role: 'Staff', ordersProcessed: 95, bookingsHandled: 32, hoursWorked: 40, rating: 4.8 },
      { name: 'Karim Farah', role: 'Staff', ordersProcessed: 85, bookingsHandled: 28, hoursWorked: 40, rating: 4.6 },
      { name: 'Nour Saleh', role: 'Staff', ordersProcessed: 105, bookingsHandled: 35, hoursWorked: 40, rating: 4.9 }
    ],
    month: [
      { name: 'Zeinab Aoun', role: 'Staff', ordersProcessed: 380, bookingsHandled: 128, hoursWorked: 160, rating: 4.8 },
      { name: 'Karim Farah', role: 'Staff', ordersProcessed: 340, bookingsHandled: 112, hoursWorked: 160, rating: 4.6 },
      { name: 'Nour Saleh', role: 'Staff', ordersProcessed: 420, bookingsHandled: 140, hoursWorked: 160, rating: 4.9 }
    ]
  };

  const customerData = {
    day: [
      { name: 'Nadia Mansour', visits: 1, totalSpent: 650000, avgOrderValue: 200000, lastVisit: '2025-04-01' },
      { name: 'Fadi Abboud', visits: 1, totalSpent: 750000, avgOrderValue: 250000, lastVisit: '2025-04-01' },
      { name: 'Rima Khoury', visits: 1, totalSpent: 950000, avgOrderValue: 300000, lastVisit: '2025-04-01' },
      { name: 'Hassan Nassar', visits: 1, totalSpent: 500000, avgOrderValue: 150000, lastVisit: '2025-04-01' },
      { name: 'Maya Saleh', visits: 0, totalSpent: 0, avgOrderValue: 0, lastVisit: '2025-04-01' }
    ],
    week: [
      { name: 'Nadia Mansour', visits: 2, totalSpent: 1200000, avgOrderValue: 200000, lastVisit: '2025-04-01' },
      { name: 'Fadi Abboud', visits: 2, totalSpent: 1500000, avgOrderValue: 250000, lastVisit: '2025-04-01' },
      { name: 'Rima Khoury', visits: 2, totalSpent: 1800000, avgOrderValue: 300000, lastVisit: '2025-04-01' },
      { name: 'Hassan Nassar', visits: 2, totalSpent: 900000, avgOrderValue: 150000, lastVisit: '2025-04-01' },
      { name: 'Maya Saleh', visits: 1, totalSpent: 450000, avgOrderValue: 150000, lastVisit: '2025-03-28' },
      { name: 'Omar Haddad', visits: 1, totalSpent: 850000, avgOrderValue: 250000, lastVisit: '2025-03-29' },
      { name: 'Layla Karam', visits: 1, totalSpent: 1100000, avgOrderValue: 300000, lastVisit: '2025-03-29' },
      { name: 'Ziad Aoun', visits: 1, totalSpent: 750000, avgOrderValue: 225000, lastVisit: '2025-03-30' },
      { name: 'Tala Farah', visits: 1, totalSpent: 550000, avgOrderValue: 175000, lastVisit: '2025-03-30' },
      { name: 'Karim Nassar', visits: 1, totalSpent: 700000, avgOrderValue: 200000, lastVisit: '2025-03-31' }
    ],
    month: [
      { name: 'Nadia Mansour', visits: 5, totalSpent: 3250000, avgOrderValue: 216667, lastVisit: '2025-04-01' },
      { name: 'Fadi Abboud', visits: 4, totalSpent: 3000000, avgOrderValue: 250000, lastVisit: '2025-04-01' },
      { name: 'Rima Khoury', visits: 6, totalSpent: 5400000, avgOrderValue: 300000, lastVisit: '2025-04-01' },
      { name: 'Hassan Nassar', visits: 3, totalSpent: 1350000, avgOrderValue: 150000, lastVisit: '2025-04-01' },
      { name: 'Maya Saleh', visits: 4, totalSpent: 1800000, avgOrderValue: 150000, lastVisit: '2025-04-01' },
      { name: 'Omar Haddad', visits: 3, totalSpent: 2550000, avgOrderValue: 283333, lastVisit: '2025-03-29' },
      { name: 'Layla Karam', visits: 5, totalSpent: 5500000, avgOrderValue: 366667, lastVisit: '2025-03-29' },
      { name: 'Ziad Aoun', visits: 2, totalSpent: 1500000, avgOrderValue: 250000, lastVisit: '2025-03-30' },
      { name: 'Tala Farah', visits: 3, totalSpent: 1650000, avgOrderValue: 183333, lastVisit: '2025-03-30' },
      { name: 'Karim Nassar', visits: 4, totalSpent: 2800000, avgOrderValue: 233333, lastVisit: '2025-03-31' }
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

  const calculateBookingStats = (data) => {
    if (dateRange === 'month') {
      return {
        totalBookings: data.reduce((acc, item) => acc + item.totalBookings, 0),
        completedBookings: data.reduce((acc, item) => acc + item.completedBookings, 0),
        cancelledBookings: data.reduce((acc, item) => acc + item.cancelledBookings, 0),
        totalRevenue: data.reduce((acc, item) => acc + item.totalRevenue, 0)
      };
    } else {
      return {
        totalBookings: data.length,
        completedBookings: data.filter(item => item.status === 'Completed').length,
        confirmedBookings: data.filter(item => item.status === 'Confirmed').length,
        pendingBookings: data.filter(item => item.status === 'Pending').length,
        cancelledBookings: data.filter(item => item.status === 'Cancelled').length,
        totalRevenue: data.reduce((acc, item) => acc + item.revenue, 0)
      };
    }
  };

  const renderBookingsReport = () => {
    const data = bookingsData[dateRange];
    const stats = calculateBookingStats(data);
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Bookings Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Bookings</p>
              <p className="text-2xl font-bold neon-text">{stats.totalBookings}</p>
            </div>
            {dateRange !== 'month' ? (
              <>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Completed</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{stats.completedBookings}</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Confirmed</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{stats.confirmedBookings}</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Pending</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{stats.pendingBookings}</p>
                </div>
              </>
            ) : (
              <>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Completed</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{stats.completedBookings}</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Completion Rate</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{Math.round((stats.completedBookings / stats.totalBookings) * 100)}%</p>
                </div>
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-300">Avg. Revenue/Booking</p>
                  <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{Math.round(stats.totalRevenue / stats.completedBookings).toLocaleString()} LBP</p>
                </div>
              </>
            )}
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Cancelled</p>
              <p className="text-2xl font-bold text-red-500">{stats.cancelledBookings}</p>
            </div>
          </div>
          
          {dateRange !== 'month' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                    <th className="text-left py-2 px-3">Booking ID</th>
                    <th className="text-left py-2 px-3">Room</th>
                    <th className="text-left py-2 px-3">Client</th>
                    <th className="text-left py-2 px-3">Time</th>
                    <th className="text-right py-2 px-3">Persons</th>
                    <th className="text-right py-2 px-3">Revenue</th>
                    <th className="text-right py-2 px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((booking, index) => (
                    <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                      <td className="py-2 px-3">{booking.id}</td>
                      <td className="py-2 px-3">{booking.room}</td>
                      <td className="py-2 px-3">{booking.client}</td>
                      <td className="py-2 px-3">{booking.time}</td>
                      <td className="py-2 px-3 text-right">{booking.persons}</td>
                      <td className="py-2 px-3 text-right">{booking.revenue.toLocaleString()} LBP</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          booking.status === 'Completed' ? 'bg-green-600' : 
                          booking.status === 'Confirmed' ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                          booking.status === 'Pending' ? 'bg-[rgba(var(--neon-orange),0.8)]' : 
                          'bg-red-600'
                        }`}>
                          {booking.status}
                        </span>
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
                    <th className="text-left py-2 px-3">Room</th>
                    <th className="text-right py-2 px-3">Total Bookings</th>
                    <th className="text-right py-2 px-3">Completed</th>
                    <th className="text-right py-2 px-3">Cancelled</th>
                    <th className="text-right py-2 px-3">Avg. Persons</th>
                    <th className="text-right py-2 px-3">Total Revenue</th>
                    <th className="text-right py-2 px-3">Completion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((room, index) => (
                    <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                      <td className="py-2 px-3">{room.room}</td>
                      <td className="py-2 px-3 text-right">{room.totalBookings}</td>
                      <td className="py-2 px-3 text-right">{room.completedBookings}</td>
                      <td className="py-2 px-3 text-right">{room.cancelledBookings}</td>
                      <td className="py-2 px-3 text-right">{room.avgPersons.toFixed(1)}</td>
                      <td className="py-2 px-3 text-right">{room.totalRevenue.toLocaleString()} LBP</td>
                      <td className="py-2 px-3 text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          (room.completedBookings / room.totalBookings) >= 0.9 ? 'bg-green-600' : 
                          (room.completedBookings / room.totalBookings) >= 0.8 ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                          'bg-[rgba(var(--neon-orange),0.8)]'
                        }`}>
                          {Math.round((room.completedBookings / room.totalBookings) * 100)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-[rgba(15,10,40,0.7)]">
                    <td className="py-2 px-3 font-bold">Total</td>
                    <td className="py-2 px-3 text-right font-bold">{stats.totalBookings}</td>
                    <td className="py-2 px-3 text-right font-bold">{stats.completedBookings}</td>
                    <td className="py-2 px-3 text-right font-bold">{stats.cancelledBookings}</td>
                    <td className="py-2 px-3 text-right font-bold">
                      {(data.reduce((acc, item) => acc + (item.avgPersons * item.totalBookings), 0) / stats.totalBookings).toFixed(1)}
                    </td>
                    <td className="py-2 px-3 text-right font-bold">{stats.totalRevenue.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right font-bold">
                      {Math.round((stats.completedBookings / stats.totalBookings) * 100)}%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card neon-border-blue">
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Room Utilization</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {dateRange === 'month' ? (
                  data.map((room, index) => (
                    <div key={index} className="relative pt-1 mb-4">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                            {room.room}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                            {room.totalBookings} bookings
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                        <div style={{ width: `${Math.round((room.totalBookings / stats.totalBookings) * 100)}%` }} 
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  ['Neon Lounge', 'Purple Haze', 'Blue Velvet', 'Midnight Oasis'].map((roomName, index) => {
                    const roomBookings = data.filter(booking => booking.room === roomName);
                    return (
                      <div key={index} className="relative pt-1 mb-4">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                              {roomName}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                              {roomBookings.length} bookings
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                          <div style={{ width: `${Math.round((roomBookings.length / data.length) * 100)}%` }} 
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[rgb(var(--neon-blue))]">
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
          
          <div className="card neon-border-green">
            <h3 className="text-xl font-bold mb-4 neon-text-green">Actions</h3>
            <div className="space-y-4">
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Pending Bookings</h4>
                <ul className="space-y-2">
                  {dateRange !== 'month' ? (
                    data.filter(booking => booking.status === 'Pending').map((booking, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{booking.client} - {booking.room}</span>
                        <div>
                          <button className="text-[rgb(var(--neon-green))] hover:underline text-sm mr-2">
                            Confirm
                          </button>
                          <button className="text-red-500 hover:underline text-sm">
                            Cancel
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-400">Switch to day or week view to see pending bookings</li>
                  )}
                  {dateRange !== 'month' && data.filter(booking => booking.status === 'Pending').length === 0 && (
                    <li className="text-gray-400">No pending bookings</li>
                  )}
                </ul>
              </div>
              
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Quick Actions</h4>
                <div className="space-y-2">
                  <button className="btn-secondary text-sm w-full">
                    <span>Create New Booking</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Export Booking Report</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>View Room Schedule</span>
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
                  <th className="text-right py-2 px-3">Rating</th>
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
                    <td className="py-2 px-3 text-right">
                      <div className="flex items-center justify-end">
                        <span className="mr-1">{item.rating}</span>
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      </div>
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

  const renderCustomerReport = () => {
    const data = customerData[dateRange];
    const totalCustomers = data.length;
    const activeCustomers = data.filter(customer => customer.visits > 0).length;
    const totalRevenue = data.reduce((acc, customer) => acc + customer.totalSpent, 0);
    const avgOrderValue = totalRevenue / data.reduce((acc, customer) => acc + customer.visits, 0);
    
    return (
      <div className="space-y-6">
        <div className="card neon-border">
          <h3 className="text-xl font-bold mb-4 neon-text">Customer Summary</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Customers</p>
              <p className="text-2xl font-bold neon-text">{totalCustomers}</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Active Customers</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-green))]">{activeCustomers}</p>
              <p className="text-xs text-gray-400">{Math.round((activeCustomers / totalCustomers) * 100)}% of total</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Total Revenue</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-blue))]">{totalRevenue.toLocaleString()} LBP</p>
            </div>
            <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
              <p className="text-sm text-gray-300">Avg. Order Value</p>
              <p className="text-2xl font-bold text-[rgb(var(--neon-orange))]">{Math.round(avgOrderValue).toLocaleString()} LBP</p>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                  <th className="text-left py-2 px-3">Customer</th>
                  <th className="text-right py-2 px-3">Visits</th>
                  <th className="text-right py-2 px-3">Total Spent</th>
                  <th className="text-right py-2 px-3">Avg. Order Value</th>
                  <th className="text-left py-2 px-3">Last Visit</th>
                  <th className="text-right py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((customer, index) => (
                  <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                    <td className="py-2 px-3">{customer.name}</td>
                    <td className="py-2 px-3 text-right">{customer.visits}</td>
                    <td className="py-2 px-3 text-right">{customer.totalSpent.toLocaleString()} LBP</td>
                    <td className="py-2 px-3 text-right">{customer.avgOrderValue.toLocaleString()} LBP</td>
                    <td className="py-2 px-3">{customer.lastVisit}</td>
                    <td className="py-2 px-3 text-right">
                      <span className={`px-2 py-1 rounded text-xs ${
                        customer.visits >= 3 ? 'bg-green-600' : 
                        customer.visits > 0 ? 'bg-[rgba(var(--neon-blue),0.8)]' : 
                        'bg-[rgba(var(--neon-orange),0.8)]'
                      }`}>
                        {customer.visits >= 3 ? 'Regular' : 
                         customer.visits > 0 ? 'Active' : 
                         'Inactive'}
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
            <h3 className="text-xl font-bold mb-4 neon-text-blue">Top Customers by Spending</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="w-full max-w-xs">
                {[...data]
                  .sort((a, b) => b.totalSpent - a.totalSpent)
                  .slice(0, 5)
                  .map((customer, index) => (
                    <div key={index} className="relative pt-1 mb-4">
                      <div className="flex mb-2 items-center justify-between">
                        <div>
                          <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-[rgb(var(--neon-blue))] bg-[rgba(var(--neon-blue),0.2)]">
                            {customer.name}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-semibold inline-block text-[rgb(var(--neon-blue))]">
                            {customer.totalSpent.toLocaleString()} LBP
                          </span>
                        </div>
                      </div>
                      <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-[rgba(15,10,40,0.7)]">
                        <div style={{ width: `${Math.round(customer.totalSpent / Math.max(...data.map(c => c.totalSpent)) * 100)}%` }} 
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
                <h4 className="font-bold mb-2">Customer Engagement</h4>
                <div className="space-y-2">
                  <button className="btn-secondary text-sm w-full">
                    <span>Send Promotional Message</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Create Loyalty Offer</span>
                  </button>
                  <button className="btn-secondary text-sm w-full">
                    <span>Export Customer Data</span>
                  </button>
                </div>
              </div>
              
              <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                <h4 className="font-bold mb-2">Inactive Customers</h4>
                <ul className="space-y-2">
                  {data.filter(customer => customer.visits === 0).map((customer, index) => (
                    <li key={index} className="flex justify-between items-center">
                      <span>{customer.name}</span>
                      <button className="text-[rgb(var(--neon-blue))] hover:underline text-sm">
                        Contact
                      </button>
                    </li>
                  ))}
                  {data.filter(customer => customer.visits === 0).length === 0 && (
                    <li className="text-gray-400">No inactive customers</li>
                  )}
                </ul>
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
          <title>Manager Reports | Underground Chilling Room</title>
          <meta name="description" content="Manager reports for Underground Chilling Room" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/dashboard/manager">
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
            <h2 className="text-2xl font-bold neon-text">Manager Reports</h2>
            <Link href="/dashboard/manager">
              <a className="btn-secondary text-sm">
                Back to Dashboard
              </a>
            </Link>
          </div>
          
          <div className="mb-6">
            <div className="flex border-b border-[rgba(var(--neon-blue),0.3)]">
              <button
                className={`neon-tab ${activeTab === 'bookings' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('bookings')}
              >
                Booking Reports
              </button>
              <button
                className={`neon-tab ${activeTab === 'staff' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('staff')}
              >
                Staff Reports
              </button>
              <button
                className={`neon-tab ${activeTab === 'customers' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => setActiveTab('customers')}
              >
                Customer Reports
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
              {activeTab === 'bookings' && renderBookingsReport()}
              {activeTab === 'staff' && renderStaffReport()}
              {activeTab === 'customers' && renderCustomerReport()}
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
export default withRoleProtection(ManagerReports, ['owner', 'manager']);
