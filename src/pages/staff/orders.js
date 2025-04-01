import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function StaffOrders() {
  const [activeTab, setActiveTab] = useState('pending');
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(null);

  // Mock data for orders
  useEffect(() => {
    const mockOrders = [
      { 
        id: 1, 
        roomName: 'Neon Lounge', 
        clientName: 'Ahmad Khalil',
        time: '19:45',
        items: [
          { name: 'Mezze Platter', quantity: 1, price: 150000 },
          { name: 'Soft Drinks', quantity: 3, price: 50000 },
          { name: 'Classic Flavor Arguile', quantity: 1, price: 100000 }
        ],
        subtotal: 350000,
        serviceCharge: 35000,
        total: 385000,
        status: 'pending'
      },
      { 
        id: 2, 
        roomName: 'Purple Haze', 
        clientName: 'Sara Haddad',
        time: '20:15',
        items: [
          { name: 'Chicken Wings', quantity: 2, price: 120000 },
          { name: 'French Fries', quantity: 1, price: 80000 },
          { name: 'Fresh Juice', quantity: 2, price: 70000 }
        ],
        subtotal: 390000,
        serviceCharge: 39000,
        total: 429000,
        status: 'preparing'
      },
      { 
        id: 3, 
        roomName: 'Midnight Oasis', 
        clientName: 'Rami Nassar',
        time: '18:30',
        items: [
          { name: 'Cheese Platter', quantity: 1, price: 200000 },
          { name: 'Premium Flavor Arguile', quantity: 1, price: 120000 },
          { name: 'Mocktails', quantity: 4, price: 90000 }
        ],
        subtotal: 680000,
        serviceCharge: 68000,
        total: 748000,
        status: 'delivered'
      }
    ];
    
    setOrders(mockOrders);
    
    // Simulate a new order notification after 10 seconds
    const timer = setTimeout(() => {
      const newOrder = { 
        id: 4, 
        roomName: 'Blue Velvet', 
        clientName: 'Layla Khoury',
        time: '20:45',
        items: [
          { name: 'Beef Sliders', quantity: 1, price: 180000 },
          { name: 'Sparkling Water', quantity: 2, price: 60000 },
          { name: 'Special Mix Arguile', quantity: 1, price: 150000 }
        ],
        subtotal: 450000,
        serviceCharge: 45000,
        total: 495000,
        status: 'pending'
      };
      
      setOrders(prevOrders => [...prevOrders, newOrder]);
      setNotification({
        message: `New order from ${newOrder.clientName} in ${newOrder.roomName}!`,
        orderId: newOrder.id
      });
      
      // Clear notification after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? {...order, status: newStatus} : order
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const getFilteredOrders = () => {
    return orders.filter(order => {
      if (activeTab === 'all') return true;
      return order.status === activeTab;
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Orders | Underground Staff</title>
        <meta name="description" content="Staff order management interface" />
      </Head>

      <header className="bg-uv-dark bg-opacity-90 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-white">Underground</a>
          </Link>
          <h1 className="text-xl font-bold text-white">Staff Dashboard</h1>
        </div>
      </header>

      {notification && (
        <div className="fixed top-20 right-4 bg-uv-purple text-white p-4 rounded-lg shadow-lg z-50 animate-bounce">
          <p>{notification.message}</p>
          <button 
            onClick={() => {
              setActiveTab('pending');
              setNotification(null);
              // Scroll to the new order
              const element = document.getElementById(`order-${notification.orderId}`);
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-sm underline mt-1"
          >
            View Order
          </button>
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-uv-purple">Order Management</h2>
          <div className="flex space-x-2">
            <Link href="/staff/rooms">
              <a className="btn-secondary text-sm">Rooms</a>
            </Link>
            <Link href="/staff/inventory">
              <a className="btn-secondary text-sm">Inventory</a>
            </Link>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <button 
            onClick={() => setActiveTab('pending')}
            className={`px-3 py-1 rounded ${activeTab === 'pending' ? 'bg-uv-purple text-white' : 'bg-uv-dark text-white'}`}
          >
            Pending
            <span className="ml-1 bg-white text-uv-purple text-xs px-1.5 py-0.5 rounded-full">
              {orders.filter(o => o.status === 'pending').length}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('preparing')}
            className={`px-3 py-1 rounded ${activeTab === 'preparing' ? 'bg-uv-purple text-white' : 'bg-uv-dark text-white'}`}
          >
            Preparing
            <span className="ml-1 bg-white text-uv-purple text-xs px-1.5 py-0.5 rounded-full">
              {orders.filter(o => o.status === 'preparing').length}
            </span>
          </button>
          <button 
            onClick={() => setActiveTab('delivered')}
            className={`px-3 py-1 rounded ${activeTab === 'delivered' ? 'bg-uv-purple text-white' : 'bg-uv-dark text-white'}`}
          >
            Delivered
          </button>
          <button 
            onClick={() => setActiveTab('all')}
            className={`px-3 py-1 rounded ${activeTab === 'all' ? 'bg-uv-purple text-white' : 'bg-uv-dark text-white'}`}
          >
            All Orders
          </button>
        </div>

        <div className="space-y-6">
          {getFilteredOrders().length === 0 ? (
            <div className="card text-center py-8">
              <p>No {activeTab !== 'all' ? activeTab : ''} orders found</p>
            </div>
          ) : (
            getFilteredOrders().map(order => {
              let statusColor = '';
              let statusText = '';
              
              switch(order.status) {
                case 'pending':
                  statusColor = 'bg-yellow-600';
                  statusText = 'Pending';
                  break;
                case 'preparing':
                  statusColor = 'bg-blue-600';
                  statusText = 'Preparing';
                  break;
                case 'delivered':
                  statusColor = 'bg-green-600';
                  statusText = 'Delivered';
                  break;
                default:
                  statusColor = 'bg-gray-600';
                  statusText = order.status;
              }
              
              return (
                <div 
                  key={order.id} 
                  id={`order-${order.id}`}
                  className="card"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-uv-purple">Order #{order.id}</h3>
                      <p className="text-sm">{order.roomName} • {order.clientName}</p>
                      <p className="text-sm">Time: {order.time}</p>
                    </div>
                    <div className={`${statusColor} text-white px-2 py-1 rounded text-xs`}>
                      {statusText}
                    </div>
                  </div>
                  
                  <div className="bg-uv-dark bg-opacity-50 p-4 rounded-lg mb-4">
                    <h4 className="font-bold mb-2">Order Items</h4>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}× {item.name}</span>
                          <span>{formatPrice(item.price * item.quantity)} LBP</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-uv-purple/30 mt-3 pt-3">
                      <div className="flex justify-between text-sm">
                        <span>Subtotal</span>
                        <span>{formatPrice(order.subtotal)} LBP</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Service Charge (10%)</span>
                        <span>{formatPrice(order.serviceCharge)} LBP</span>
                      </div>
                      <div className="flex justify-between font-bold mt-1">
                        <span>Total</span>
                        <span>{formatPrice(order.total)} LBP</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    {order.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => handleStatusChange(order.id, 'preparing')}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex-1"
                        >
                          Start Preparing
                        </button>
                        <button 
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    
                    {order.status === 'preparing' && (
                      <button 
                        onClick={() => handleStatusChange(order.id, 'delivered')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex-1"
                      >
                        Mark as Delivered
                      </button>
                    )}
                    
                    {order.status === 'delivered' && (
                      <button 
                        className="bg-gray-600 text-white px-3 py-1 rounded text-sm flex-1 opacity-50 cursor-not-allowed"
                        disabled
                      >
                        Completed
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
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
