import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

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

export default function ManagerDashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { checkAuth, logout } = useAuth();

  // Stats for dashboard
  const stats = {
    totalBookings: 47,
    activeRooms: 3,
    pendingOrders: 5,
    staffOnDuty: 4
  };

  useEffect(() => {
    // Check if user is authenticated
    const user = checkAuth();
    if (user && user.role === 'manager') {
      setUserData(user);
      setLoading(false);
    } else {
      // Redirect to auth page if not authenticated or not manager
      window.location.href = '/auth';
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-uv-dark">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-uv-purple"></div>
          <p className="mt-4 text-white">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Manager Dashboard | Underground Chilling Room</title>
        <meta name="description" content="Manager dashboard for Underground Chilling Room" />
      </Head>

      <header className="bg-uv-dark bg-opacity-90 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard/manager">
            <a className="text-2xl font-bold text-white">Underground</a>
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-white">{userData?.name} (Manager)</span>
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
          <h2 className="text-2xl font-bold text-uv-purple">Manager Dashboard</h2>
          <div className="text-sm text-white">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-uv-purple/20 to-uv-blue/20">
            <h3 className="text-lg font-bold mb-2">Active Rooms</h3>
            <p className="text-3xl font-bold text-uv-purple">{stats.activeRooms}/4</p>
            <p className="text-sm mt-2">75% occupancy rate</p>
          </div>
          
          <div className="card bg-gradient-to-br from-uv-purple/20 to-uv-blue/20">
            <h3 className="text-lg font-bold mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold text-uv-purple">{stats.pendingOrders}</p>
            <p className="text-sm mt-2">Average wait time: 8 min</p>
          </div>
          
          <div className="card bg-gradient-to-br from-uv-purple/20 to-uv-blue/20">
            <h3 className="text-lg font-bold mb-2">Staff On Duty</h3>
            <p className="text-3xl font-bold text-uv-purple">{stats.staffOnDuty}</p>
            <p className="text-sm mt-2">Full staff coverage</p>
          </div>
          
          <div className="card bg-gradient-to-br from-uv-purple/20 to-uv-blue/20">
            <h3 className="text-lg font-bold mb-2">Booking Requests</h3>
            <p className="text-3xl font-bold text-uv-purple">2</p>
            <p className="text-sm mt-2">Awaiting confirmation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h3 className="text-xl font-bold mb-4 text-uv-purple">Today's Schedule</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-uv-purple/30">
                      <th className="text-left py-2 px-3">Room</th>
                      <th className="text-left py-2 px-3">Client</th>
                      <th className="text-left py-2 px-3">Time</th>
                      <th className="text-left py-2 px-3">Duration</th>
                      <th className="text-left py-2 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-uv-purple/10">
                      <td className="py-2 px-3">Neon Lounge</td>
                      <td className="py-2 px-3">Ahmad Khalil</td>
                      <td className="py-2 px-3">19:00 - 22:00</td>
                      <td className="py-2 px-3">3 hours</td>
                      <td className="py-2 px-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-uv-purple/10">
                      <td className="py-2 px-3">Purple Haze</td>
                      <td className="py-2 px-3">Sara Haddad</td>
                      <td className="py-2 px-3">20:00 - 22:00</td>
                      <td className="py-2 px-3">2 hours</td>
                      <td className="py-2 px-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-uv-purple/10">
                      <td className="py-2 px-3">Blue Velvet</td>
                      <td className="py-2 px-3">Layla Khoury</td>
                      <td className="py-2 px-3">18:00 - 21:00</td>
                      <td className="py-2 px-3">3 hours</td>
                      <td className="py-2 px-3">
                        <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">Active</span>
                      </td>
                    </tr>
                    <tr className="border-b border-uv-purple/10">
                      <td className="py-2 px-3">Midnight Oasis</td>
                      <td className="py-2 px-3">Rami Nassar</td>
                      <td className="py-2 px-3">22:00 - 01:00</td>
                      <td className="py-2 px-3">3 hours</td>
                      <td className="py-2 px-3">
                        <span className="bg-yellow-600 text-white px-2 py-1 rounded text-xs">Upcoming</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-uv-purple">Pending Booking Requests</h3>
              <div className="space-y-4">
                <div className="bg-uv-dark bg-opacity-50 p-4 rounded-lg border border-uv-purple/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">Nadia Mansour</h4>
                      <p className="text-sm">Neon Lounge • Tomorrow, 19:00 - 22:00</p>
                      <p className="text-sm">Persons: 8 • Duration: 3 hours</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                        Confirm
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-uv-dark bg-opacity-50 p-4 rounded-lg border border-uv-purple/30">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold">Fadi Abboud</h4>
                      <p className="text-sm">Purple Haze • Tomorrow, 20:00 - 23:00</p>
                      <p className="text-sm">Persons: 6 • Duration: 3 hours</p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm">
                        Confirm
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="card mb-6">
              <h3 className="text-xl font-bold mb-4 text-uv-purple">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <Link href="/staff/rooms">
                  <a className="btn-primary">Manage Rooms</a>
                </Link>
                <Link href="/staff/orders">
                  <a className="btn-primary">View Orders</a>
                </Link>
                <Link href="/dashboard/staff">
                  <a className="btn-primary">Staff Management</a>
                </Link>
                <Link href="/dashboard/inventory">
                  <a className="btn-primary">Check Inventory</a>
                </Link>
              </div>
            </div>
            
            <div className="card mb-6">
              <h3 className="text-xl font-bold mb-4 text-uv-purple">Staff On Duty</h3>
              <div className="space-y-3">
                <div className="bg-uv-dark bg-opacity-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold">Samir Nassar</p>
                    <p className="text-xs">Since 16:00</p>
                  </div>
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                <div className="bg-uv-dark bg-opacity-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold">Zeinab Aoun</p>
                    <p className="text-xs">Since 17:00</p>
                  </div>
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                <div className="bg-uv-dark bg-opacity-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold">Karim Farah</p>
                    <p className="text-xs">Since 18:00</p>
                  </div>
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">Active</span>
                </div>
                <div className="bg-uv-dark bg-opacity-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <p className="font-bold">Nour Saleh</p>
                    <p className="text-xs">Since 19:00</p>
                  </div>
                  <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs">Active</span>
                </div>
              </div>
              <button className="btn-secondary w-full mt-4 text-sm">Manage Staff Schedule</button>
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-uv-purple">Inventory Alerts</h3>
              <div className="space-y-3">
                <div className="bg-red-500 bg-opacity-20 border border-red-500 p-3 rounded-lg">
                  <p className="font-bold text-red-500">Low Stock Alert</p>
                  <p className="text-sm">Premium Flavor Arguile: 2 left</p>
                </div>
                <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 p-3 rounded-lg">
                  <p className="font-bold text-yellow-500">Running Low</p>
                  <p className="text-sm">Chicken Wings: 5 portions left</p>
                </div>
                <div className="bg-yellow-500 bg-opacity-20 border border-yellow-500 p-3 rounded-lg">
                  <p className="font-bold text-yellow-500">Running Low</p>
                  <p className="text-sm">Mocktails Ingredients: 30% left</p>
                </div>
              </div>
              <button className="btn-secondary w-full mt-4 text-sm">Order Supplies</button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-uv-dark bg-opacity-90 p-4">
        <div className="container mx-auto text-center text-white text-sm">
          <p>© 2025 Underground Chilling Room. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
