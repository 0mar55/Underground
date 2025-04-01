import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Import auth service
const useAuth = () => {
  const router = useRouter();
  
  // In a real app, this would be imported from the auth service
  const checkAuth = () => {
    const user = localStorage.getItem('underground_user');
    return user ? JSON.parse(user) : null;
  };

  const logout = () => {
    localStorage.removeItem('underground_user');
    router.push('/auth');
  };

  return { checkAuth, logout };
};

export default function StaffInventory() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { checkAuth, logout } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    const user = checkAuth();
    if (user && user.role === 'staff') {
      setUserData(user);
      setLoading(false);
    } else {
      // Redirect to auth page if not authenticated or not staff
      router.push('/auth');
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[rgba(5,0,30,1)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--neon-pink))]"></div>
          <p className="mt-4 text-white neon-text">Loading inventory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Staff Inventory | Underground Chilling Room</title>
          <meta name="description" content="Staff inventory management for Underground Chilling Room" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/staff/rooms">
              <Image 
                src="/images/logo-simple.webp" 
                alt="Underground Logo" 
                width={200} 
                height={50} 
                className="h-10 w-auto"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-white neon-text">{userData?.name} <span className="text-[rgb(var(--neon-green))]">(Staff)</span></span>
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
            <h2 className="text-2xl font-bold neon-text">Staff Inventory</h2>
            <div className="text-sm text-white">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card mb-6 neon-border-blue">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">Inventory Status</h3>
                <p>Current inventory levels and stock status will be displayed here.</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="card neon-border-green">
                <h3 className="text-xl font-bold mb-4 neon-text-green">Quick Actions</h3>
                <div className="space-y-3">
                  <Link href="/staff/rooms" className="btn-primary w-full block text-center">
                    Manage Rooms
                  </Link>
                  <Link href="/staff/orders" className="btn-secondary w-full block text-center">
                    View Orders
                  </Link>
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
