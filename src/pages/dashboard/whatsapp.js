import React, { useState } from 'react';
import { sendWhatsAppMessage, notifyStaff } from '../../services/whatsapp';

export default function WhatsAppDashboard() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [staffNumbers, setStaffNumbers] = useState(['']);
  const [notification, setNotification] = useState('');
  const [sendResult, setSendResult] = useState(null);

  // Mock data for demonstration
  const [sentMessages, setSentMessages] = useState([
    { id: 1, to: '+961 70 123 456', message: 'Your booking has been confirmed', timestamp: '2025-04-01 10:30' },
    { id: 2, to: '+961 71 234 567', message: 'Your order is ready for pickup', timestamp: '2025-04-01 11:45' },
  ]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      // Using the mock implementation
      await sendWhatsAppMessage(phoneNumber, message);
      
      // Add to sent messages for UI display
      setSentMessages([
        ...sentMessages,
        { 
          id: sentMessages.length + 1, 
          to: phoneNumber, 
          message: message, 
          timestamp: new Date().toLocaleString() 
        }
      ]);
      
      setSendResult({ success: true, message: 'Message sent successfully (mock)' });
      setPhoneNumber('');
      setMessage('');
    } catch (error) {
      setSendResult({ success: false, message: error.message });
    }
  };

  const handleNotifyStaff = async (e) => {
    e.preventDefault();
    try {
      // Filter out empty numbers
      const validNumbers = staffNumbers.filter(num => num.trim() !== '');
      
      if (validNumbers.length === 0) {
        setSendResult({ success: false, message: 'Please add at least one staff number' });
        return;
      }
      
      // Using the mock implementation
      await notifyStaff(validNumbers, notification);
      
      // Add to sent messages for UI display
      validNumbers.forEach(number => {
        setSentMessages(prev => [
          ...prev,
          { 
            id: prev.length + 1, 
            to: number, 
            message: notification, 
            timestamp: new Date().toLocaleString() 
          }
        ]);
      });
      
      setSendResult({ success: true, message: 'Staff notified successfully (mock)' });
      setStaffNumbers(['']);
      setNotification('');
    } catch (error) {
      setSendResult({ success: false, message: error.message });
    }
  };

  const addStaffNumberField = () => {
    setStaffNumbers([...staffNumbers, '']);
  };

  const updateStaffNumber = (index, value) => {
    const updatedNumbers = [...staffNumbers];
    updatedNumbers[index] = value;
    setStaffNumbers(updatedNumbers);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">WhatsApp Notification Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Send Individual Message */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Send Individual Message</h2>
          <form onSubmit={handleSendMessage}>
            <div className="mb-4">
              <label className="block mb-2">Phone Number</label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+961 XX XXX XXX"
                className="w-full p-2 rounded bg-gray-700 border border-gray-600"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message here..."
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32"
                required
              />
            </div>
            <button 
              type="submit" 
              className="px-4 py-2 rounded bg-purple-600 text-white font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>
        
        {/* Notify Staff */}
        <div className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Notify Staff</h2>
          <form onSubmit={handleNotifyStaff}>
            <div className="mb-4">
              <label className="block mb-2">Staff Phone Numbers</label>
              {staffNumbers.map((number, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={number}
                    onChange={(e) => updateStaffNumber(index, e.target.value)}
                    placeholder="+961 XX XXX XXX"
                    className="flex-1 p-2 rounded bg-gray-700 border border-gray-600 mr-2"
                  />
                  {index === staffNumbers.length - 1 && (
                    <button 
                      type="button" 
                      onClick={addStaffNumberField}
                      className="px-3 py-1 rounded bg-gray-600 text-white"
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label className="block mb-2">Notification</label>
              <textarea
                value={notification}
                onChange={(e) => setNotification(e.target.value)}
                placeholder="Enter notification for staff..."
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 h-32"
                required
              />
            </div>
            <button 
              type="submit" 
              className="px-4 py-2 rounded bg-pink-600 text-white font-semibold"
            >
              Notify Staff
            </button>
          </form>
        </div>
      </div>
      
      {/* Result Message */}
      {sendResult && (
        <div className={`mt-6 p-4 rounded ${sendResult.success ? 'bg-green-800' : 'bg-red-800'}`}>
          {sendResult.message}
        </div>
      )}
      
      {/* Sent Messages History */}
      <div className="mt-12 bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Message History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Recipient</th>
                <th className="py-2 px-4 text-left">Message</th>
                <th className="py-2 px-4 text-left">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {sentMessages.map((msg) => (
                <tr key={msg.id} className="border-b border-gray-700">
                  <td className="py-3 px-4">{msg.id}</td>
                  <td className="py-3 px-4">{msg.to}</td>
                  <td className="py-3 px-4">{msg.message}</td>
                  <td className="py-3 px-4">{msg.timestamp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
