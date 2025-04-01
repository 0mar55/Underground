import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

// Import WhatsApp service (would be connected to backend in production)
const useWhatsApp = () => {
  const sendNotification = async (type, data, phoneNumber) => {
    // In a real app, this would call the backend API
    console.log(`Sending ${type} notification to ${phoneNumber}`, data);
    return { success: true, message: 'Notification sent' };
  };

  return { sendNotification };
};

export default function NotificationCenter() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState('booking');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { sendNotification } = useWhatsApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      // Sample data based on notification type
      let data = {};
      
      switch(notificationType) {
        case 'booking':
          data = {
            roomName: 'Neon Lounge',
            clientName: 'Ahmad Khalil',
            date: new Date(),
            startTime: '19:00',
            duration: 3,
            persons: 6,
            totalPrice: 1500000
          };
          break;
        case 'order':
          data = {
            roomName: 'Purple Haze',
            clientName: 'Sara Haddad',
            items: [
              { quantity: 2, name: 'Premium Flavor Arguile', price: 150000 },
              { quantity: 1, name: 'Mezze Platter', price: 200000 }
            ],
            subtotal: 500000,
            serviceCharge: 50000,
            total: 550000
          };
          break;
        case 'inventory':
          data = {
            name: 'Premium Flavor Arguile',
            quantity: 2,
            unit: 'pcs',
            lowStockThreshold: 5
          };
          break;
        default:
          data = { message };
      }

      const result = await sendNotification(notificationType, data, phoneNumber);
      
      if (result.success) {
        setStatus({ type: 'success', message: 'Notification sent successfully!' });
      } else {
        setStatus({ type: 'error', message: `Failed to send notification: ${result.error}` });
      }
    } catch (error) {
      setStatus({ type: 'error', message: `Error: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>WhatsApp Notifications | Underground Chilling Room</title>
          <meta name="description" content="WhatsApp notification center for Underground Chilling Room" />
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
            <Link href="/dashboard/owner">
              <a className="btn-secondary text-sm">
                Back to Dashboard
              </a>
            </Link>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 neon-text">WhatsApp Notification Center</h2>
            
            <div className="card neon-border mb-8">
              <h3 className="text-xl font-bold mb-4 neon-text-blue">Send Test Notification</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input 
                    type="text" 
                    className="input-field w-full"
                    placeholder="+961XXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                  <p className="text-xs mt-1 text-[rgba(var(--neon-blue),0.7)]">Include country code (e.g., +961 for Lebanon)</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Notification Type</label>
                  <select 
                    className="input-field w-full"
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                  >
                    <option value="booking">Booking Alert (Staff)</option>
                    <option value="bookingConfirmation">Booking Confirmation (Customer)</option>
                    <option value="order">Order Alert (Staff)</option>
                    <option value="orderStatus">Order Status Update (Customer)</option>
                    <option value="inventory">Inventory Alert (Staff)</option>
                    <option value="custom">Custom Message</option>
                  </select>
                </div>
                
                {notificationType === 'custom' && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Custom Message</label>
                    <textarea 
                      className="input-field w-full h-32"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required={notificationType === 'custom'}
                    />
                  </div>
                )}
                
                {status && (
                  <div className={`p-3 rounded-lg ${status.type === 'success' ? 'bg-green-500 bg-opacity-20 border border-green-500' : 'bg-red-500 bg-opacity-20 border border-red-500'}`}>
                    <p className={`text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{status.message}</p>
                  </div>
                )}
                
                <button 
                  type="submit"
                  className="btn-primary w-full flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="mr-2 inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Sending...
                    </>
                  ) : (
                    'Send WhatsApp Notification'
                  )}
                </button>
              </form>
            </div>
            
            <div className="card neon-border-green">
              <h3 className="text-xl font-bold mb-4 neon-text-green">Notification Templates</h3>
              
              <div className="space-y-4">
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Booking Alert (Staff)</h4>
                  <div className="bg-[rgba(30,20,60,0.7)] p-3 rounded text-sm font-mono whitespace-pre-wrap">
{`🔔 NEW BOOKING ALERT 🔔
Room: Neon Lounge
Client: Ahmad Khalil
Date: 4/1/2025
Time: 19:00 (3 hours)
Persons: 6
Total: 1,500,000 LBP

Please confirm or reject this booking in the staff portal.`}
                  </div>
                </div>
                
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Order Alert (Staff)</h4>
                  <div className="bg-[rgba(30,20,60,0.7)] p-3 rounded text-sm font-mono whitespace-pre-wrap">
{`🔔 NEW ORDER ALERT 🔔
Room: Purple Haze
Client: Sara Haddad
Items:
- 2x Premium Flavor Arguile (150,000 LBP)
- 1x Mezze Platter (200,000 LBP)

Subtotal: 500,000 LBP
Service: 50,000 LBP
Total: 550,000 LBP

Please prepare this order as soon as possible.`}
                  </div>
                </div>
                
                <div className="bg-[rgba(15,10,40,0.7)] p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Inventory Alert (Staff)</h4>
                  <div className="bg-[rgba(30,20,60,0.7)] p-3 rounded text-sm font-mono whitespace-pre-wrap">
{`⚠️ LOW INVENTORY ALERT ⚠️
Item: Premium Flavor Arguile
Current Quantity: 2 pcs
Threshold: 5 pcs

Please restock this item soon.`}
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
