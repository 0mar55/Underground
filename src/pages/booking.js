import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Booking() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [room, setRoom] = useState('');
  const [guests, setGuests] = useState(1);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a simplified version, just show success message
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Book a Room | Underground Chilling Room</title>
          <meta name="description" content="Book a room at Underground Chilling Room" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/">
              <Image 
                src="/images/logo-simple.webp" 
                alt="Underground Logo" 
                width={200} 
                height={50} 
                className="h-10 w-auto"
              />
            </Link>
            <nav>
              <Link href="/dashboard/overview" className="text-white hover:text-[rgb(var(--neon-pink))]">
                View Rooms & Services
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 neon-text">Book a Room</h2>
            
            {isSubmitted ? (
              <div className="card neon-border-green">
                <h3 className="text-xl font-bold mb-4 neon-text-green">Booking Request Received!</h3>
                <p className="mb-4">Thank you for your booking request. We will contact you shortly to confirm your reservation.</p>
                <div className="flex space-x-4">
                  <Link href="/dashboard/overview" className="btn-primary">
                    View Rooms & Services
                  </Link>
                  <Link href="/" className="btn-secondary">
                    Return to Home
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card neon-border">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Your Name</label>
                    <input 
                      type="text" 
                      className="input-field w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      className="input-field w-full"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <input 
                      type="date" 
                      className="input-field w-full"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Time</label>
                    <input 
                      type="time" 
                      className="input-field w-full"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Room</label>
                    <select 
                      className="input-field w-full"
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      required
                    >
                      <option value="">Select a room</option>
                      <option value="neon-lounge">Neon Lounge</option>
                      <option value="purple-haze">Purple Haze</option>
                      <option value="midnight-oasis">Midnight Oasis</option>
                      <option value="electric-dreams">Electric Dreams</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Number of Guests</label>
                    <input 
                      type="number" 
                      min="1"
                      max="10"
                      className="input-field w-full"
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Special Requests</label>
                  <textarea 
                    className="input-field w-full h-24"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full">
                  Submit Booking Request
                </button>
              </form>
            )}
          </div>
        </main>

        <footer className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto text-center text-sm">
            <p className="neon-text">© 2025 Underground Chilling Room. All rights reserved.</p>
            <p className="mt-2">For immediate assistance, call +961 81 540 918</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
