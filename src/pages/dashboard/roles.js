import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { withRoleProtection } from '../../utils/rbac';
import usePermissions from '../../hooks/usePermissions';

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

function RoleManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newRole, setNewRole] = useState('');
  const [status, setStatus] = useState(null);
  const { hasPermission } = usePermissions();
  const { logout } = useAuth();

  // Mock users data
  useEffect(() => {
    // In a real app, this would fetch from the database
    setUsers([
      { id: 1, name: 'Ahmad Khalil', email: 'owner@underground.com', role: 'owner', isActive: true },
      { id: 2, name: 'Sara Haddad', email: 'manager@underground.com', role: 'manager', isActive: true },
      { id: 3, name: 'Rami Nassar', email: 'accountant@underground.com', role: 'accountant', isActive: true },
      { id: 4, name: 'Layla Khoury', email: 'staff@underground.com', role: 'staff', isActive: true },
      { id: 5, name: 'Nadia Mansour', email: 'client@underground.com', role: 'client', isActive: true },
      { id: 6, name: 'Fadi Abboud', email: 'fadi@example.com', role: 'client', isActive: false }
    ]);
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setNewRole(user.role);
  };

  const handleUpdateRole = () => {
    if (!selectedUser || !newRole) return;

    // Update user role
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return { ...user, role: newRole };
      }
      return user;
    });

    setUsers(updatedUsers);
    setSelectedUser(null);
    setStatus({ type: 'success', message: `${selectedUser.name}'s role updated to ${newRole}` });

    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  const handleToggleStatus = (userId) => {
    // Toggle user active status
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        return { ...user, isActive: !user.isActive };
      }
      return user;
    });

    setUsers(updatedUsers);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Role Management | Underground Chilling Room</title>
          <meta name="description" content="Role management for Underground Chilling Room" />
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
            <h2 className="text-2xl font-bold neon-text">Role Management</h2>
            <Link href="/dashboard/owner">
              <a className="btn-secondary text-sm">
                Back to Dashboard
              </a>
            </Link>
          </div>
          
          {status && (
            <div className={`mb-6 p-4 rounded-lg ${status.type === 'success' ? 'bg-green-500 bg-opacity-20 border border-green-500' : 'bg-red-500 bg-opacity-20 border border-red-500'}`}>
              <p className={`text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{status.message}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card neon-border">
                <h3 className="text-xl font-bold mb-4 neon-text">User Accounts</h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                        <th className="text-left py-2 px-3">Name</th>
                        <th className="text-left py-2 px-3">Email</th>
                        <th className="text-left py-2 px-3">Role</th>
                        <th className="text-left py-2 px-3">Status</th>
                        <th className="text-right py-2 px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user => (
                        <tr key={user.id} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                          <td className="py-2 px-3">{user.name}</td>
                          <td className="py-2 px-3">{user.email}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded text-xs ${
                              user.role === 'owner' ? 'bg-[rgba(var(--neon-purple),0.8)]' :
                              user.role === 'manager' ? 'bg-[rgba(var(--neon-blue),0.8)]' :
                              user.role === 'accountant' ? 'bg-[rgba(var(--neon-green),0.8)]' :
                              user.role === 'staff' ? 'bg-[rgba(var(--neon-orange),0.8)]' :
                              'bg-[rgba(var(--neon-pink),0.8)]'
                            }`}>
                              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded text-xs ${user.isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right">
                            <button 
                              onClick={() => handleSelectUser(user)}
                              className="text-[rgb(var(--neon-blue))] hover:underline text-sm mr-2"
                              disabled={!hasPermission('manage_roles')}
                            >
                              Edit Role
                            </button>
                            <button 
                              onClick={() => handleToggleStatus(user.id)}
                              className="text-[rgb(var(--neon-pink))] hover:underline text-sm"
                              disabled={!hasPermission('manage_roles')}
                            >
                              {user.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="card neon-border-blue mb-6">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">Edit User Role</h3>
                
                {selectedUser ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">User</label>
                      <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                        <p className="font-bold">{selectedUser.name}</p>
                        <p className="text-sm">{selectedUser.email}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Role</label>
                      <select 
                        className="input-field w-full"
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                      >
                        <option value="owner">Owner</option>
                        <option value="manager">Manager</option>
                        <option value="accountant">Accountant</option>
                        <option value="staff">Staff</option>
                        <option value="client">Client</option>
                      </select>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button 
                        onClick={handleUpdateRole}
                        className="btn-primary flex-1"
                      >
                        Update Role
                      </button>
                      <button 
                        onClick={() => setSelectedUser(null)}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg text-center">
                    <p>Select a user to edit their role</p>
                  </div>
                )}
              </div>
              
              <div className="card neon-border-green">
                <h3 className="text-xl font-bold mb-4 neon-text-green">Role Permissions</h3>
                
                <div className="space-y-4">
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                    <h4 className="font-bold text-[rgb(var(--neon-purple))]">Owner</h4>
                    <ul className="text-sm mt-1 space-y-1">
                      <li>• Full access to all features</li>
                      <li>• Manage user roles and permissions</li>
                      <li>• View all financial reports</li>
                      <li>• Configure system settings</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                    <h4 className="font-bold text-[rgb(var(--neon-blue))]">Manager</h4>
                    <ul className="text-sm mt-1 space-y-1">
                      <li>• Manage staff and schedules</li>
                      <li>• View daily reports</li>
                      <li>• Manage rooms and bookings</li>
                      <li>• Manage inventory and menu</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                    <h4 className="font-bold text-[rgb(var(--neon-green))]">Accountant</h4>
                    <ul className="text-sm mt-1 space-y-1">
                      <li>• View financial reports</li>
                      <li>• Manage inventory</li>
                      <li>• Export reports to Excel</li>
                    </ul>
                  </div>
                  
                  <div className="bg-[rgba(15,10,40,0.7)] p-3 rounded-lg">
                    <h4 className="font-bold text-[rgb(var(--neon-orange))]">Staff</h4>
                    <ul className="text-sm mt-1 space-y-1">
                      <li>• Manage bookings</li>
                      <li>• Process orders</li>
                      <li>• View inventory levels</li>
                    </ul>
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

// Wrap component with role protection
export default withRoleProtection(RoleManagement, ['owner']);
