import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

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

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { checkAuth, logout } = useAuth();

  // Stats for dashboard
  const stats = {
    totalBookings: 47,
    activeRooms: 3,
    pendingOrders: 5,
    revenue: {
      today: 3750000,
      week: 24500000,
      month: 98750000
    }
  };

  useEffect(() => {
    // Check if user is authenticated
    const user = checkAuth();
    if (user && user.role === 'owner') {
      setUserData(user);
      setLoading(false);
    } else {
      // Redirect to auth page if not authenticated or not owner
      window.location.href = '/auth';
    }
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgba(5,0,30,1)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--neon-pink))]"></div>
          <p className="mt-4 text-white neon-text">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Owner Dashboard | Underground Chilling Room</title>
          <meta name="description" content="Owner dashboard for Underground Chilling Room" />
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
              <span className="text-white neon-text">{userData?.name} <span className="text-[rgb(var(--neon-green))]">(Owner)</span></span>
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
            <h2 className="text-2xl font-bold neon-text">Owner Dashboard</h2>
            <div className="text-sm text-white">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card bg-gradient-to-br from-[rgba(var(--neon-pink),0.1)] to-[rgba(var(--neon-blue),0.1)] neon-border">
              <h3 className="text-lg font-bold mb-2 neon-text">Total Bookings</h3>
              <p className="text-3xl font-bold text-[rgb(var(--neon-pink))]">{stats.totalBookings}</p>
              <p className="text-sm mt-2">+12% from last week</p>
            </div>
            
            <div className="card bg-gradient-to-br from-[rgba(var(--neon-blue),0.1)] to-[rgba(var(--neon-green),0.1)] neon-border-blue">
              <h3 className="text-lg font-bold mb-2 neon-text-blue">Active Rooms</h3>
              <p className="text-3xl font-bold text-[rgb(var(--neon-blue))]">{stats.activeRooms}/4</p>
              <p className="text-sm mt-2">75% occupancy rate</p>
            </div>
            
            <div className="card bg-gradient-to-br from-[rgba(var(--neon-green),0.1)] to-[rgba(var(--neon-blue),0.1)] neon-border-green">
              <h3 className="text-lg font-bold mb-2 neon-text-green">Pending Orders</h3>
              <p className="text-3xl font-bold text-[rgb(var(--neon-green))]">{stats.pendingOrders}</p>
              <p className="text-sm mt-2">Average wait time: 8 min</p>
            </div>
            
            <div className="card bg-gradient-to-br from-[rgba(var(--neon-purple),0.1)] to-[rgba(var(--neon-pink),0.1)] neon-border">
              <h3 className="text-lg font-bold mb-2 neon-text">Today's Revenue</h3>
              <p className="text-3xl font-bold text-[rgb(var(--neon-purple))]">{formatPrice(stats.revenue.today)} LBP</p>
              <p className="text-sm mt-2">+5% from yesterday</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card mb-6 neon-border-blue">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold neon-text-blue">Revenue Overview</h3>
                  <select className="input-field text-sm">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                    <option>Last 90 Days</option>
                  </select>
                </div>
                
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                  <div className="h-64 flex items-end justify-between">
                    {/* Mock chart bars */}
                    <div className="w-1/7 px-1">
                      <div className="bg-[rgb(var(--neon-pink))] h-20 rounded-t shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]"></div>
                      <p className="text-xs text-center mt-2">Mon</p>
                    </div>
                    <div className="w-1/7 px-1">
                      <div className="bg-[rgb(var(--neon-pink))] h-32 rounded-t shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]"></div>
                      <p className="text-xs text-center mt-2">Tue</p>
                    </div>
                    <div className="w-1/7 px-1">
                      <div className="bg-[rgb(var(--neon-pink))] h-24 rounded-t shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]"></div>
                      <p className="text-xs text-center mt-2">Wed</p>
                    </div>
                    <div className="w-1/7 px-1">
                      <div className="bg-[rgb(var(--neon-pink))] h-40 rounded-t shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]"></div>
                      <p className="text-xs text-center mt-2">Thu</p>
                    </div>
                    <div className="w-1/7 px-1">
                      <div className="bg-[rgb(var(--neon-pink))] h-48 rounded-t shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]"></div>
                      <p className="text-xs text-center mt-2">Fri</p>
                    </div>
                    <div className="w-1/7 px-1">
                      <div className="bg-[rgb(var(--neon-pink))] h-56 rounded-t shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]"></div>
                      <p className="text-xs text-center mt-2">Sat</p>
                    </div>
                    <div className="w-1/7 px-1">
                      <div className="bg-[rgb(var(--neon-pink))] h-36 rounded-t shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]"></div>
                      <p className="text-xs text-center mt-2">Sun</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg neon-border-blue">
                    <h4 className="text-sm font-medium neon-text-blue">Daily Avg</h4>
                    <p className="text-lg font-bold">{formatPrice(stats.revenue.week / 7)} LBP</p>
                  </div>
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg neon-border-blue">
                    <h4 className="text-sm font-medium neon-text-blue">Weekly</h4>
                    <p className="text-lg font-bold">{formatPrice(stats.revenue.week)} LBP</p>
                  </div>
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg neon-border-blue">
                    <h4 className="text-sm font-medium neon-text-blue">Monthly</h4>
                    <p className="text-lg font-bold">{formatPrice(stats.revenue.month)} LBP</p>
                  </div>
                </div>
              </div>
              
              <div className="card neon-border">
                <h3 className="text-xl font-bold mb-4 neon-text">Recent Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                        <th className="text-left py-2 px-3">Room</th>
                        <th className="text-left py-2 px-3">Client</th>
                        <th className="text-left py-2 px-3">Date</th>
                        <th className="text-left py-2 px-3">Duration</th>
                        <th className="text-right py-2 px-3">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-[rgba(var(--neon-pink),0.1)]">
                        <td className="py-2 px-3">Neon Lounge</td>
                        <td className="py-2 px-3">Ahmad Khalil</td>
                        <td className="py-2 px-3">Apr 1, 2025</td>
                        <td className="py-2 px-3">3 hours</td>
                        <td className="py-2 px-3 text-right text-[rgb(var(--neon-pink))]">{formatPrice(1500000)} LBP</td>
                      </tr>
                      <tr className="border-b border-[rgba(var(--neon-pink),0.1)]">
                        <td className="py-2 px-3">Purple Haze</td>
                        <td className="py-2 px-3">Sara Haddad</td>
                        <td className="py-2 px-3">Apr 1, 2025</td>
                        <td className="py-2 px-3">2 hours</td>
                        <td className="py-2 px-3 text-right text-[rgb(var(--neon-pink))]">{formatPrice(750000)} LBP</td>
                      </tr>
                      <tr className="border-b border-[rgba(var(--neon-pink),0.1)]">
                        <td className="py-2 px-3">Midnight Oasis</td>
                        <td className="py-2 px-3">Rami Nassar</td>
                        <td className="py-2 px-3">Mar 31, 2025</td>
                        <td className="py-2 px-3">4 hours</td>
                        <td className="py-2 px-3 text-right text-[rgb(var(--neon-pink))]">{formatPrice(2000000)} LBP</td>
                      </tr>
                      <tr className="border-b border-[rgba(var(--neon-pink),0.1)]">
                        <td className="py-2 px-3">Blue Velvet</td>
                        <td className="py-2 px-3">Layla Khoury</td>
                        <td className="py-2 px-3">Mar 31, 2025</td>
                        <td className="py-2 px-3">3 hours</td>
                        <td className="py-2 px-3 text-right text-[rgb(var(--neon-pink))]">{formatPrice(1125000)} LBP</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-right">
                  <button className="text-[rgb(var(--neon-pink))] hover:underline text-sm neon-text">View All Bookings</button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="card mb-6 neon-border-green">
                <h3 className="text-xl font-bold mb-4 neon-text-green">Quick Actions</h3>
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/staff/rooms">
                    <a className="btn-primary">Manage Rooms</a>
                  </Link>
                  <Link href="/staff/orders">
                    <a className="btn-primary">View Orders</a>
                  </Link>
                  <Link href="/dashboard/reports">
                    <a className="btn-primary">Generate Reports</a>
                  </Link>
                  <Link href="/dashboard/inventory">
                    <a className="btn-primary">Check Inventory</a>
                  </Link>
                </div>
              </div>
              
              <div className="card mb-6 neon-border-blue">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">Staff Performance</h3>
                <div className="space-y-4">
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span>Samir Nassar</span>
                      <span className="text-sm text-[rgb(var(--neon-green))]">92%</span>
                    </div>
                    <div className="w-full bg-[rgba(30,20,60,0.7)] rounded-full h-2">
                      <div className="bg-[rgb(var(--neon-green))] h-2 rounded-full shadow-[0_0_10px_rgba(var(--neon-green),0.7)]" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span>Zeinab Aoun</span>
                      <span className="text-sm text-[rgb(var(--neon-green))]">87%</span>
                    </div>
                    <div className="w-full bg-[rgba(30,20,60,0.7)] rounded-full h-2">
                      <div className="bg-[rgb(var(--neon-green))] h-2 rounded-full shadow-[0_0_10px_rgba(var(--neon-green),0.7)]" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span>Karim Farah</span>
                      <span className="text-sm text-[rgb(var(--neon-orange))]">78%</span>
                    </div>
                    <div className="w-full bg-[rgba(30,20,60,0.7)] rounded-full h-2">
                      <div className="bg-[rgb(var(--neon-orange))] h-2 rounded-full shadow-[0_0_10px_rgba(var(--neon-orange),0.7)]" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-1">
                      <span>Nour Saleh</span>
                      <span className="text-sm text-[rgb(var(--neon-orange))]">65%</span>
                    </div>
                    <div className="w-full bg-[rgba(30,20,60,0.7)] rounded-full h-2">
                      <div className="bg-[rgb(var(--neon-orange))] h-2 rounded-full shadow-[0_0_10px_rgba(var(--neon-orange),0.7)]" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="card neon-border">
                <h3 className="text-xl font-bold mb-4 neon-text">Popular Items</h3>
                <div className="space-y-3">
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg flex justify-between items-center">
                    <span>Premium Flavor Arguile</span>
                    <span className="bg-[rgb(var(--neon-pink))] text-white px-2 py-1 rounded text-xs shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]">42 orders</span>
                  </div>
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg flex justify-between items-center">
                    <span>Mezze Platter</span>
                    <span className="bg-[rgb(var(--neon-pink))] text-white px-2 py-1 rounded text-xs shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]">38 orders</span>
                  </div>
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg flex justify-between items-center">
                    <span>Chicken Wings</span>
                    <span className="bg-[rgb(var(--neon-pink))] text-white px-2 py-1 rounded text-xs shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]">31 orders</span>
                  </div>
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg flex justify-between items-center">
                    <span>Mocktails</span>
                    <span className="bg-[rgb(var(--neon-pink))] text-white px-2 py-1 rounded text-xs shadow-[0_0_10px_rgba(var(--neon-pink),0.7)]">27 orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
