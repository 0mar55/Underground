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

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'client',
    phoneNumber: '',
    isActive: true
  });
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null);
  const { hasPermission } = usePermissions();
  const { logout } = useAuth();

  // Mock users data
  useEffect(() => {
    // In a real app, this would fetch from the database
    setUsers([
      { id: 1, name: 'Ahmad Khalil', email: 'owner@underground.com', role: 'owner', phoneNumber: '+961 81 000 001', isActive: true },
      { id: 2, name: 'Sara Haddad', email: 'manager@underground.com', role: 'manager', phoneNumber: '+961 81 000 002', isActive: true },
      { id: 3, name: 'Rami Nassar', email: 'accountant@underground.com', role: 'accountant', phoneNumber: '+961 81 000 003', isActive: true },
      { id: 4, name: 'Layla Khoury', email: 'staff@underground.com', role: 'staff', phoneNumber: '+961 81 000 004', isActive: true },
      { id: 5, name: 'Nadia Mansour', email: 'client@underground.com', role: 'client', phoneNumber: '+961 81 000 005', isActive: true },
      { id: 6, name: 'Fadi Abboud', email: 'fadi@example.com', role: 'client', phoneNumber: '+961 81 000 006', isActive: false }
    ]);
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      password: '********', // Placeholder for password
      role: user.role,
      phoneNumber: user.phoneNumber,
      isActive: user.isActive
    });
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewUser({
      ...newUser,
      [name]: checked
    });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.password || !newUser.phoneNumber) {
      setStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }
    
    // Create new user
    const newId = Math.max(...users.map(user => user.id)) + 1;
    const createdUser = {
      id: newId,
      ...newUser
    };
    
    setUsers([...users, createdUser]);
    
    // Reset form
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'client',
      phoneNumber: '',
      isActive: true
    });
    
    setStatus({ type: 'success', message: 'User created successfully' });
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    
    if (!selectedUser) return;
    
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.phoneNumber) {
      setStatus({ type: 'error', message: 'Please fill in all required fields' });
      return;
    }
    
    // Update user
    const updatedUsers = users.map(user => {
      if (user.id === selectedUser.id) {
        return { 
          ...user, 
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          phoneNumber: newUser.phoneNumber,
          isActive: newUser.isActive
        };
      }
      return user;
    });
    
    setUsers(updatedUsers);
    setSelectedUser(null);
    setIsEditing(false);
    
    // Reset form
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'client',
      phoneNumber: '',
      isActive: true
    });
    
    setStatus({ type: 'success', message: 'User updated successfully' });
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  const handleDeleteUser = (userId) => {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }
    
    // Delete user
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    if (selectedUser && selectedUser.id === userId) {
      setSelectedUser(null);
      setIsEditing(false);
      
      // Reset form
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'client',
        phoneNumber: '',
        isActive: true
      });
    }
    
    setStatus({ type: 'success', message: 'User deleted successfully' });
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
    setIsEditing(false);
    
    // Reset form
    setNewUser({
      name: '',
      email: '',
      password: '',
      role: 'client',
      phoneNumber: '',
      isActive: true
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>User Management | Underground Chilling Room</title>
          <meta name="description" content="User management for Underground Chilling Room" />
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
            <h2 className="text-2xl font-bold neon-text">User Management</h2>
            <div className="flex space-x-2">
              <Link href="/dashboard/roles">
                <a className="btn-secondary text-sm">
                  Manage Roles
                </a>
              </Link>
              <Link href="/dashboard/owner">
                <a className="btn-secondary text-sm">
                  Back to Dashboard
                </a>
              </Link>
            </div>
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
                        <th className="text-left py-2 px-3">Phone</th>
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
                          <td className="py-2 px-3">{user.phoneNumber}</td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-1 rounded text-xs ${user.isActive ? 'bg-green-600' : 'bg-red-600'}`}>
                              {user.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right">
                            <button 
                              onClick={() => handleSelectUser(user)}
                              className="text-[rgb(var(--neon-blue))] hover:underline text-sm mr-2"
                            >
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteUser(user.id)}
                              className="text-[rgb(var(--neon-pink))] hover:underline text-sm"
                              disabled={user.role === 'owner' && user.id === 1} // Prevent deleting main owner
                            >
                              Delete
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
              <div className="card neon-border-blue">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">
                  {isEditing ? 'Edit User' : 'Create New User'}
                </h3>
                
                <form onSubmit={isEditing ? handleUpdateUser : handleCreateUser} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name *</label>
                    <input 
                      type="text" 
                      name="name"
                      className="input-field w-full"
                      value={newUser.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Email *</label>
                    <input 
                      type="email" 
                      name="email"
                      className="input-field w-full"
                      value={newUser.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  {!isEditing && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Password *</label>
                      <input 
                        type="password" 
                        name="password"
                        className="input-field w-full"
                        value={newUser.password}
                        onChange={handleInputChange}
                        required={!isEditing}
                        disabled={isEditing}
                      />
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <input 
                      type="text" 
                      name="phoneNumber"
                      className="input-field w-full"
                      value={newUser.phoneNumber}
                      onChange={handleInputChange}
                      placeholder="+961 XX XXX XXX"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Role *</label>
                    <select 
                      name="role"
                      className="input-field w-full"
                      value={newUser.role}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="owner">Owner</option>
                      <option value="manager">Manager</option>
                      <option value="accountant">Accountant</option>
                      <option value="staff">Staff</option>
                      <option value="client">Client</option>
                    </select>
                  </div>
                  
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      name="isActive"
                      id="isActive"
                      className="w-4 h-4 text-[rgb(var(--neon-blue))] bg-[rgba(15,10,40,0.7)] border-[rgba(var(--neon-blue),0.3)] rounded focus:ring-[rgb(var(--neon-blue))] focus:ring-opacity-25"
                      checked={newUser.isActive}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="isActive" className="ml-2 text-sm font-medium">Active Account</label>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button 
                      type="submit"
                      className="btn-primary flex-1"
                    >
                      {isEditing ? 'Update User' : 'Create User'}
                    </button>
                    {isEditing && (
                      <button 
                        type="button"
                        onClick={handleCancelEdit}
                        className="btn-secondary flex-1"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
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
export default withRoleProtection(UserManagement, ['owner']);
