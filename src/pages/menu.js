import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '../../utils/database';

export default function Menu() {
  const [activeTab, setActiveTab] = useState('food');
  
  // Get data from mock database
  const { food, beverages, arguile } = mockData.menu;

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Menu | Underground Chilling Room</title>
          <meta name="description" content="Food, beverages and arguile menu at Underground Chilling Room" />
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
            <nav className="flex space-x-4">
              <Link href="/dashboard/overview" className="text-white hover:text-[rgb(var(--neon-pink))]">
                Rooms
              </Link>
              <Link href="/booking" className="text-white hover:text-[rgb(var(--neon-pink))]">
                Book Now
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold neon-text">Our Menu</h2>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[rgba(var(--neon-blue),0.3)] mb-6">
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

          <div className="mt-8 text-center">
            <Link href="/booking" className="btn-primary inline-block">
              Book a Room Now
            </Link>
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
