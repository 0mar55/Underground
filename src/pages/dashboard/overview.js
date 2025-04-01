import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '../../utils/database';

export default function Overview() {
  const [activeTab, setActiveTab] = useState('rooms');
  
  // Get data from mock database
  const { rooms } = mockData;
  const { food, beverages, arguile } = mockData.menu;

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Overview | Underground Chilling Room</title>
          <meta name="description" content="Overview of Underground Chilling Room services" />
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
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold neon-text">Underground Chilling Room</h2>
            <div className="text-sm text-white">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[rgba(var(--neon-blue),0.3)] mb-6">
            <button 
              className={`px-4 py-2 ${activeTab === 'rooms' ? 'text-[rgb(var(--neon-pink))] border-b-2 border-[rgb(var(--neon-pink))]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('rooms')}
            >
              Rooms
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'food' ? 'text-[rgb(var(--neon-pink))] border-b-2 border-[rgb(var(--neon-pink))]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('food')}
            >
              Food
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'beverages' ? 'text-[rgb(var(--neon-pink))] border-b-2 border-[rgb(var(--neon-pink))]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('beverages')}
            >
              Beverages
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === 'arguile' ? 'text-[rgb(var(--neon-pink))] border-b-2 border-[rgb(var(--neon-pink))]' : 'text-gray-400'}`}
              onClick={() => setActiveTab('arguile')}
            >
              Arguile
            </button>
          </div>

          {/* Rooms Tab */}
          {activeTab === 'rooms' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {rooms.map(room => (
                <div key={room.id} className="card neon-border">
                  <h3 className="text-xl font-bold mb-2 neon-text">{room.name}</h3>
                  <div className="flex justify-between mb-2">
                    <span>Capacity:</span>
                    <span>{room.capacity} people</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Price:</span>
                    <span>{new Intl.NumberFormat('en-US').format(room.pricePerHour)} LBP/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={room.isAvailable ? 'text-green-400' : 'text-red-400'}>
                      {room.isAvailable ? 'Available' : 'Booked'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Food Tab */}
          {activeTab === 'food' && (
            <div className="card neon-border">
              <h3 className="text-xl font-bold mb-4 neon-text">Food Menu</h3>
              <div className="space-y-6">
                {['Appetizers', 'Main Course'].map(category => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold mb-2 neon-text-blue">{category}</h4>
                    <div className="space-y-2">
                      {food.filter(item => item.category === category).map(item => (
                        <div key={item.id} className="flex justify-between p-2 border-b border-[rgba(var(--neon-blue),0.2)]">
                          <span>{item.name}</span>
                          <span>{new Intl.NumberFormat('en-US').format(item.price)} LBP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Beverages Tab */}
          {activeTab === 'beverages' && (
            <div className="card neon-border">
              <h3 className="text-xl font-bold mb-4 neon-text">Beverages Menu</h3>
              <div className="space-y-6">
                {['Non-Alcoholic', 'Hot Drinks'].map(category => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold mb-2 neon-text-blue">{category}</h4>
                    <div className="space-y-2">
                      {beverages.filter(item => item.category === category).map(item => (
                        <div key={item.id} className="flex justify-between p-2 border-b border-[rgba(var(--neon-blue),0.2)]">
                          <span>{item.name}</span>
                          <span>{new Intl.NumberFormat('en-US').format(item.price)} LBP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Arguile Tab */}
          {activeTab === 'arguile' && (
            <div className="card neon-border">
              <h3 className="text-xl font-bold mb-4 neon-text">Arguile Menu</h3>
              <div className="space-y-6">
                {['Classic', 'Premium'].map(category => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold mb-2 neon-text-blue">{category}</h4>
                    <div className="space-y-2">
                      {arguile.filter(item => item.category === category).map(item => (
                        <div key={item.id} className="flex justify-between p-2 border-b border-[rgba(var(--neon-blue),0.2)]">
                          <span>{item.name}</span>
                          <span>{new Intl.NumberFormat('en-US').format(item.price)} LBP</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mt-8">
            <div className="card neon-border-green">
              <h3 className="text-xl font-bold mb-4 neon-text-green">Contact Us</h3>
              <p className="mb-4">For reservations and inquiries:</p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <span className="w-24">Phone:</span>
                  <span>+961 81 540 918</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Location:</span>
                  <span>Ain el Remaneh</span>
                </div>
                <div className="flex items-center">
                  <span className="w-24">Hours:</span>
                  <span>4:00 PM - 2:00 AM daily</span>
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
