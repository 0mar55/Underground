import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { checkAuthStatus } from '../services/auth';

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check if user is already authenticated
    const { isAuthenticated, user } = checkAuthStatus();
    setIsAuthenticated(isAuthenticated);
    setUser(user);
    
    // If authenticated, redirect to appropriate dashboard
    if (isAuthenticated && user) {
      if (user.role === 'owner') {
        router.push('/dashboard/owner');
      } else if (user.role === 'manager') {
        router.push('/dashboard/manager');
      } else if (user.role === 'accountant') {
        router.push('/dashboard/reports/accountant');
      } else if (user.role === 'staff') {
        router.push('/dashboard/reports/staff');
      } else {
        router.push('/booking');
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Head>
        <title>Underground Chilling Room</title>
        <meta name="description" content="Underground Chilling Room - Food, Beverage, and Arguile Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full max-w-md">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4 neon-text-purple">Underground</h1>
              <p className="text-xl neon-text-blue">Chilling Room Experience</p>
            </div>
            
            <div className="neon-card p-8 rounded-lg shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Welcome to Underground</h2>
                <p className="text-gray-300">Experience premium chilling rooms with food, beverage, and arguile service</p>
              </div>
              
              <div className="space-y-6">
                <div className="purple-blue-gradient p-4 rounded-lg text-center">
                  <h3 className="font-bold mb-2">Premium Chilling Rooms</h3>
                  <p>Relax in our specially designed rooms with friends</p>
                </div>
                
                <div className="pink-purple-gradient p-4 rounded-lg text-center">
                  <h3 className="font-bold mb-2">Food & Beverage</h3>
                  <p>Enjoy our selection of food and drinks</p>
                </div>
                
                <div className="purple-blue-gradient p-4 rounded-lg text-center">
                  <h3 className="font-bold mb-2">Arguile Service</h3>
                  <p>Premium arguile with various flavors</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4 neon-text-purple">Create an Account or Sign In</h2>
                <div className="flex flex-col space-y-4">
                  <Link href="/auth" className="px-6 py-3 rounded purple-blue-gradient text-white font-bold text-center">
                    Sign In / Register
                  </Link>
                  <p className="text-center text-gray-400">
                    New clients can create an account during their first visit
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 text-center text-sm text-gray-500">
              <p>© 2025 Underground Chilling Room. All rights reserved.</p>
              <p>Located in Ain el Remaneh</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
