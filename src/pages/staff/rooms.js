import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function StaffRooms() {
  // Mock data for bookings
  const [bookingRequests, setBookingRequests] = useState([
    { 
      id: 1, 
      clientName: 'Ahmad Khalil', 
      roomId: 1,
      roomName: 'Neon Lounge',
      date: '2025-04-02', 
      startTime: '19:00', 
      duration: 3, 
      persons: 7, 
      totalPrice: 1500000, 
      status: 'pending' 
    },
    { 
      id: 2, 
      clientName: 'Sara Haddad', 
      roomId: 4,
      roomName: 'Midnight Oasis',
      date: '2025-04-05', 
      startTime: '20:00', 
      duration: 4, 
      persons: 10, 
      totalPrice: 3000000, 
      status: 'pending' 
    },
    { 
      id: 3, 
      clientName: 'Rami Nassar', 
      roomId: 2,
      roomName: 'Purple Haze',
      date: '2025-04-01', 
      startTime: '18:00', 
      duration: 2, 
      persons: 6, 
      totalPrice: 900000, 
      status: 'confirmed' 
    }
  ]);

  // Mock data for rooms
  const rooms = [
    { id: 1, name: 'Neon Lounge', capacity: 8, status: 'available' },
    { id: 2, name: 'Purple Haze', capacity: 10, status: 'booked' },
    { id: 3, name: 'Blue Velvet', capacity: 6, status: 'maintenance' },
    { id: 4, name: 'Midnight Oasis', capacity: 12, status: 'available' },
  ];

  const handleConfirmBooking = (id) => {
    setBookingRequests(bookingRequests.map(booking => 
      booking.id === id ? {...booking, status: 'confirmed'} : booking
    ));
  };

  const handleRejectBooking = (id) => {
    setBookingRequests(bookingRequests.map(booking => 
      booking.id === id ? {...booking, status: 'rejected'} : booking
    ));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Room Management | Underground Staff</title>
        <meta name="description" content="Staff room management interface" />
      </Head>

      <header className="bg-uv-dark bg-opacity-90 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-white">Underground</a>
          </Link>
          <h1 className="text-xl font-bold text-white">Staff Dashboard</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-uv-purple">Room Management</h2>
          <div className="flex space-x-2">
            <Link href="/staff/orders">
              <a className="btn-secondary text-sm">Orders</a>
            </Link>
            <Link href="/staff/inventory">
              <a className="btn-secondary text-sm">Inventory</a>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <h3 className="text-xl font-bold mb-4 text-uv-purple">Booking Requests</h3>
              
              {bookingRequests.filter(b => b.status === 'pending').length === 0 ? (
                <p className="text-center py-4">No pending booking requests</p>
              ) : (
                <div className="space-y-4">
                  {bookingRequests.filter(b => b.status === 'pending').map(booking => (
                    <div key={booking.id} className="bg-uv-dark bg-opacity-50 p-4 rounded-lg border border-uv-purple/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{booking.clientName}</h4>
                          <p className="text-sm">{booking.roomName} • {formatDate(booking.date)}</p>
                          <p className="text-sm">Time: {booking.startTime} • Duration: {booking.duration} hours</p>
                          <p className="text-sm">Persons: {booking.persons} • Total: {formatPrice(booking.totalPrice)} LBP</p>
                        </div>
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleConfirmBooking(booking.id)}
                            className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Confirm
                          </button>
                          <button 
                            onClick={() => handleRejectBooking(booking.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-uv-purple">Confirmed Bookings</h3>
              
              {bookingRequests.filter(b => b.status === 'confirmed').length === 0 ? (
                <p className="text-center py-4">No confirmed bookings</p>
              ) : (
                <div className="space-y-4">
                  {bookingRequests.filter(b => b.status === 'confirmed').map(booking => (
                    <div key={booking.id} className="bg-uv-dark bg-opacity-50 p-4 rounded-lg border border-green-500/30">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold">{booking.clientName}</h4>
                          <p className="text-sm">{booking.roomName} • {formatDate(booking.date)}</p>
                          <p className="text-sm">Time: {booking.startTime} • Duration: {booking.duration} hours</p>
                          <p className="text-sm">Persons: {booking.persons} • Total: {formatPrice(booking.totalPrice)} LBP</p>
                        </div>
                        <div className="bg-green-600 text-white px-2 py-1 rounded text-xs">
                          Confirmed
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="card">
              <h3 className="text-xl font-bold mb-4 text-uv-purple">Room Status</h3>
              <div className="space-y-3">
                {rooms.map(room => {
                  let statusColor = '';
                  switch(room.status) {
                    case 'available':
                      statusColor = 'bg-green-600';
                      break;
                    case 'booked':
                      statusColor = 'bg-yellow-600';
                      break;
                    case 'maintenance':
                      statusColor = 'bg-red-600';
                      break;
                    default:
                      statusColor = 'bg-gray-600';
                  }
                  
                  return (
                    <div key={room.id} className="bg-uv-dark bg-opacity-50 p-4 rounded-lg border border-uv-purple/30">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">{room.name}</h4>
                          <p className="text-sm">Capacity: {room.capacity} persons</p>
                        </div>
                        <div className={`${statusColor} text-white px-2 py-1 rounded text-xs`}>
                          {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-bold mb-3 text-uv-purple">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="btn-primary text-sm">Add Room</button>
                  <button className="btn-secondary text-sm">Maintenance</button>
                  <button className="btn-secondary text-sm">Manual Booking</button>
                  <button className="btn-secondary text-sm">View Calendar</button>
                </div>
              </div>
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
