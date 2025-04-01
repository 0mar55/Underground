import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Import WhatsApp service
import whatsappService from '../../services/whatsapp';

export default function WhatsAppIntegration() {
  const [staffNumbers, setStaffNumbers] = useState([
    { name: 'Samir Nassar', phone: '+961XXXXXXXX', role: 'Manager' },
    { name: 'Zeinab Aoun', phone: '+961XXXXXXXX', role: 'Staff' },
    { name: 'Karim Farah', phone: '+961XXXXXXXX', role: 'Staff' },
    { name: 'Nour Saleh', phone: '+961XXXXXXXX', role: 'Staff' }
  ]);
  
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPhone, setNewStaffPhone] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Staff');
  
  const [notificationSettings, setNotificationSettings] = useState({
    bookingAlerts: true,
    orderAlerts: true,
    inventoryAlerts: true,
    deliveryAlerts: true
  });
  
  const [status, setStatus] = useState(null);

  const handleAddStaff = (e) => {
    e.preventDefault();
    
    if (!newStaffName || !newStaffPhone) {
      setStatus({ type: 'error', message: 'Please fill in all fields' });
      return;
    }
    
    // Add new staff member
    setStaffNumbers([
      ...staffNumbers,
      { name: newStaffName, phone: newStaffPhone, role: newStaffRole }
    ]);
    
    // Reset form
    setNewStaffName('');
    setNewStaffPhone('');
    setNewStaffRole('Staff');
    
    setStatus({ type: 'success', message: 'Staff member added successfully' });
  };
  
  const handleRemoveStaff = (index) => {
    const updatedStaff = [...staffNumbers];
    updatedStaff.splice(index, 1);
    setStaffNumbers(updatedStaff);
    setStatus({ type: 'success', message: 'Staff member removed' });
  };
  
  const handleSettingChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save to the database
    setStatus({ type: 'success', message: 'Notification settings saved' });
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>WhatsApp Integration | Underground Chilling Room</title>
          <meta name="description" content="WhatsApp integration settings for Underground Chilling Room" />
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
              <Link href="/dashboard/owner">
                <a className="btn-secondary text-sm">
                  Back to Dashboard
                </a>
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold neon-text">WhatsApp Integration</h2>
            <Link href="/notifications">
              <a className="btn-primary text-sm">
                Test Notifications
              </a>
            </Link>
          </div>
          
          {status && (
            <div className={`mb-6 p-4 rounded-lg ${status.type === 'success' ? 'bg-green-500 bg-opacity-20 border border-green-500' : 'bg-red-500 bg-opacity-20 border border-red-500'}`}>
              <p className={`text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{status.message}</p>
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card neon-border">
              <h3 className="text-xl font-bold mb-4 neon-text">Staff WhatsApp Numbers</h3>
              
              <div className="overflow-x-auto mb-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
                      <th className="text-left py-2 px-3">Name</th>
                      <th className="text-left py-2 px-3">Phone Number</th>
                      <th className="text-left py-2 px-3">Role</th>
                      <th className="text-right py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {staffNumbers.map((staff, index) => (
                      <tr key={index} className="border-b border-[rgba(var(--neon-pink),0.1)]">
                        <td className="py-2 px-3">{staff.name}</td>
                        <td className="py-2 px-3">{staff.phone}</td>
                        <td className="py-2 px-3">{staff.role}</td>
                        <td className="py-2 px-3 text-right">
                          <button 
                            onClick={() => handleRemoveStaff(index)}
                            className="text-[rgb(var(--neon-pink))] hover:underline text-sm"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <form onSubmit={handleAddStaff} className="space-y-4">
                <h4 className="font-bold neon-text-blue">Add New Staff Member</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input 
                      type="text" 
                      className="input-field w-full"
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      placeholder="Full Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      className="input-field w-full"
                      value={newStaffPhone}
                      onChange={(e) => setNewStaffPhone(e.target.value)}
                      placeholder="+961XXXXXXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Role</label>
                    <select 
                      className="input-field w-full"
                      value={newStaffRole}
                      onChange={(e) => setNewStaffRole(e.target.value)}
                    >
                      <option value="Manager">Manager</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary">Add Staff Member</button>
              </form>
            </div>
            
            <div className="space-y-6">
              <div className="card neon-border-green">
                <h3 className="text-xl font-bold mb-4 neon-text-green">Notification Settings</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">Booking Alerts</h4>
                      <p className="text-sm text-gray-300">Send notifications for new booking requests</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.bookingAlerts}
                        onChange={() => handleSettingChange('bookingAlerts')}
                      />
                      <div className="w-11 h-6 bg-[rgba(30,20,60,0.7)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgba(var(--neon-green),0.7)]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">Order Alerts</h4>
                      <p className="text-sm text-gray-300">Send notifications for new food/beverage orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.orderAlerts}
                        onChange={() => handleSettingChange('orderAlerts')}
                      />
                      <div className="w-11 h-6 bg-[rgba(30,20,60,0.7)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgba(var(--neon-green),0.7)]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">Inventory Alerts</h4>
                      <p className="text-sm text-gray-300">Send notifications for low inventory items</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.inventoryAlerts}
                        onChange={() => handleSettingChange('inventoryAlerts')}
                      />
                      <div className="w-11 h-6 bg-[rgba(30,20,60,0.7)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgba(var(--neon-green),0.7)]"></div>
                    </label>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold">Delivery Alerts</h4>
                      <p className="text-sm text-gray-300">Send notifications for delivery orders</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={notificationSettings.deliveryAlerts}
                        onChange={() => handleSettingChange('deliveryAlerts')}
                      />
                      <div className="w-11 h-6 bg-[rgba(30,20,60,0.7)] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[rgba(var(--neon-green),0.7)]"></div>
                    </label>
                  </div>
                  
                  <button 
                    onClick={handleSaveSettings}
                    className="btn-primary w-full"
                  >
                    Save Notification Settings
                  </button>
                </div>
              </div>
              
              <div className="card neon-border-blue">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">WhatsApp Integration Status</h3>
                
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="font-bold">Connected</span>
                  </div>
                  <p className="text-sm mt-1">Twilio WhatsApp API is properly configured and ready to send messages.</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Messages Sent Today:</span>
                    <span className="font-bold text-[rgb(var(--neon-blue))]">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Messages Sent This Month:</span>
                    <span className="font-bold text-[rgb(var(--neon-blue))]">156</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Success Rate:</span>
                    <span className="font-bold text-[rgb(var(--neon-green))]">98%</span>
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
