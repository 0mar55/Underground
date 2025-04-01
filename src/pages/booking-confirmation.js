import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function BookingConfirmation() {
  const [booking, setBooking] = useState(null);
  const [status, setStatus] = useState('pending');
  
  // In a real app, this would fetch the booking data from an API
  useEffect(() => {
    // Mock data for a booking request
    const mockBooking = {
      id: 123,
      clientName: 'Current User',
      roomId: 1,
      roomName: 'Neon Lounge',
      date: '2025-04-05',
      startTime: '19:00',
      duration: 3,
      persons: 7,
      totalPrice: 1650000,
      status: 'pending'
    };
    
    setBooking(mockBooking);
    
    // Simulate a response after 5 seconds
    const timer = setTimeout(() => {
      setStatus('confirmed');
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

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
        <title>Booking Confirmation | Underground Chilling Room</title>
        <meta name="description" content="Booking confirmation status" />
      </Head>

      <header className="bg-uv-dark bg-opacity-90 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-white">Underground</a>
          </Link>
          <h1 className="text-xl font-bold text-white">Booking Status</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <div className="card">
            <h2 className="text-xl font-bold mb-6 text-uv-purple text-center">Booking Request</h2>
            
            {!booking ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-uv-purple"></div>
                <p className="mt-4">Loading booking information...</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  <div className="bg-uv-dark bg-opacity-50 p-4 rounded-lg">
                    <h3 className="font-bold text-uv-purple">Room Details</h3>
                    <p>{booking.roomName}</p>
                    <p className="text-sm">{formatDate(booking.date)}</p>
                    <p className="text-sm">Time: {booking.startTime}</p>
                    <p className="text-sm">Duration: {booking.duration} hours</p>
                  </div>
                  
                  <div className="bg-uv-dark bg-opacity-50 p-4 rounded-lg">
                    <h3 className="font-bold text-uv-purple">Booking Details</h3>
                    <p>Number of persons: {booking.persons}</p>
                    <p>Total price: {formatPrice(booking.totalPrice)} LBP</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className={`inline-flex items-center px-4 py-2 rounded-full ${
                    status === 'pending' 
                      ? 'bg-yellow-600 bg-opacity-20 text-yellow-500 border border-yellow-600' 
                      : status === 'confirmed'
                      ? 'bg-green-600 bg-opacity-20 text-green-500 border border-green-600'
                      : 'bg-red-600 bg-opacity-20 text-red-500 border border-red-600'
                  }`}>
                    {status === 'pending' && (
                      <>
                        <div className="mr-2 inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-yellow-500"></div>
                        Awaiting staff confirmation
                      </>
                    )}
                    {status === 'confirmed' && (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Booking confirmed!
                      </>
                    )}
                    {status === 'rejected' && (
                      <>
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                        Booking rejected
                      </>
                    )}
                  </div>
                  
                  {status === 'confirmed' && (
                    <div className="mt-6">
                      <p className="mb-4">Your booking has been confirmed! You can now place orders for your room.</p>
                      <Link href="/order">
                        <a className="btn-primary">Place Order</a>
                      </Link>
                    </div>
                  )}
                  
                  {status === 'pending' && (
                    <p className="mt-4 text-sm">Staff will review your booking request shortly. This page will update automatically.</p>
                  )}
                  
                  {status === 'rejected' && (
                    <div className="mt-6">
                      <p className="mb-4">Unfortunately, your booking request was rejected. Please try a different time or date.</p>
                      <Link href="/booking">
                        <a className="btn-primary">Try Again</a>
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
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
