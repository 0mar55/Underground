import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Booking() {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [duration, setDuration] = useState(1);
  const [persons, setPersons] = useState(5);
  const [isWeekend, setIsWeekend] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Mock data for available rooms
  const availableRooms = [
    { id: 1, name: 'Neon Lounge', capacity: 8, available: true },
    { id: 2, name: 'Purple Haze', capacity: 10, available: true },
    { id: 3, name: 'Blue Velvet', capacity: 6, available: false },
    { id: 4, name: 'Midnight Oasis', capacity: 12, available: true },
  ];

  // Calculate price based on requirements
  const calculatePrice = () => {
    if (!date || !startTime || duration < 1) return 0;
    
    // Check if selected date is weekend (Friday, Saturday)
    const selectedDate = new Date(date);
    const day = selectedDate.getDay();
    const isWeekendDay = day === 5 || day === 6; // 5 = Friday, 6 = Saturday
    setIsWeekend(isWeekendDay);
    
    // Base price: weekdays 375,000 LBP, weekends 500,000 LBP (up to 5 persons)
    const basePrice = isWeekendDay ? 500000 : 375000;
    
    // Extra person: weekdays +75,000 LBP, weekends +100,000 LBP per person
    const extraPersonRate = isWeekendDay ? 100000 : 75000;
    const extraPersons = Math.max(0, persons - 5);
    const extraPersonCharge = extraPersons * extraPersonRate;
    
    // Total price = (base price + extra person charge) * duration (hourly)
    const price = (basePrice + extraPersonCharge) * duration;
    
    return price;
  };

  // Handle date and time changes
  const handleDateChange = (e) => {
    setDate(e.target.value);
    const newPrice = calculatePrice();
    setTotalPrice(newPrice);
  };

  const handleTimeChange = (e) => {
    setStartTime(e.target.value);
    const newPrice = calculatePrice();
    setTotalPrice(newPrice);
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
    const newPrice = calculatePrice();
    setTotalPrice(newPrice);
  };

  const handlePersonsChange = (e) => {
    setPersons(parseInt(e.target.value));
    const newPrice = calculatePrice();
    setTotalPrice(newPrice);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Book a Room | Underground Chilling Room</title>
        <meta name="description" content="Book your private chilling room experience" />
      </Head>

      <header className="bg-uv-dark bg-opacity-90 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-white">Underground</a>
          </Link>
          <h1 className="text-xl font-bold text-white">Room Booking</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-bold mb-4 text-uv-purple">Book Your Room</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input 
                  type="date" 
                  className="input-field w-full"
                  value={date}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Start Time</label>
                <input 
                  type="time" 
                  className="input-field w-full"
                  value={startTime}
                  onChange={handleTimeChange}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Duration (hours)</label>
                <input 
                  type="number" 
                  className="input-field w-full"
                  value={duration}
                  onChange={handleDurationChange}
                  min="1"
                  max="12"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Number of Persons</label>
                <input 
                  type="number" 
                  className="input-field w-full"
                  value={persons}
                  onChange={handlePersonsChange}
                  min="1"
                  max="20"
                  required
                />
              </div>
              
              <div className="bg-uv-dark bg-opacity-50 p-4 rounded">
                <h3 className="font-bold text-uv-purple mb-2">Price Calculation</h3>
                <p>Base rate: {isWeekend ? '500,000' : '375,000'} LBP (up to 5 persons)</p>
                {persons > 5 && (
                  <p>Extra person charge: {formatPrice((persons - 5) * (isWeekend ? 100000 : 75000))} LBP</p>
                )}
                <p>Duration: {duration} hour(s)</p>
                <p className="font-bold mt-2">Total: {formatPrice(totalPrice)} LBP</p>
              </div>
            </form>
          </div>
          
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-uv-purple">Available Rooms</h2>
              <div className="space-y-3">
                {availableRooms.map(room => (
                  <div 
                    key={room.id} 
                    className={`p-3 rounded-lg border ${room.available 
                      ? 'border-uv-purple/30 bg-uv-dark/50' 
                      : 'border-gray-700 bg-gray-900/50 opacity-50'}`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">{room.name}</h3>
                        <p className="text-sm">Capacity: {room.capacity} persons</p>
                      </div>
                      {room.available ? (
                        <button className="btn-primary text-sm">Select</button>
                      ) : (
                        <span className="text-sm text-gray-400">Unavailable</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="card">
              <h2 className="text-xl font-bold mb-4 text-uv-purple">Booking Information</h2>
              <ul className="space-y-2 text-sm">
                <li>• Bookings require staff confirmation</li>
                <li>• Weekday rates: 375,000 LBP base (up to 5 persons)</li>
                <li>• Weekend rates: 500,000 LBP base (up to 5 persons)</li>
                <li>• Extra person: +75,000 LBP (weekday) or +100,000 LBP (weekend)</li>
                <li>• All prices are per hour</li>
                <li>• Minimum booking duration: 1 hour</li>
              </ul>
              
              <button className="btn-primary w-full mt-4">Request Booking</button>
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
