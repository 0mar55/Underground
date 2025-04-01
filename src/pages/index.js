import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function Index() {
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');

  // Simulate checking authentication status
  useEffect(() => {
    // In a real app, this would check for a valid session/token
    const checkAuth = () => {
      // For demo purposes, we'll just redirect to auth page if not authenticated
      if (!isAuthenticated) {
        // Redirect to auth page after a short delay
        setTimeout(() => {
          window.location.href = '/auth';
        }, 1000);
      }
    };
    
    checkAuth();
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.7)]">
        <Head>
          <title>Underground Chilling Room</title>
          <meta name="description" content="Underground Chilling Room - Mobile app for room rental service" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-between items-center">
            <div className="logo-container">
              <Image 
                src="/images/logo-simple.webp" 
                alt="Underground Logo" 
                width={200} 
                height={50} 
                className="h-10 w-auto"
              />
            </div>
            <Link href="/auth">
              <a className="btn-secondary text-sm neon-text-blue">
                Sign In
              </a>
            </Link>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="card max-w-md w-full mb-8 neon-border">
              <h2 className="text-2xl font-bold text-center mb-6 neon-text">Welcome to Underground</h2>
              <p className="text-center mb-8">Premium chilling rooms with food, beverages, and arguile service</p>
              
              <div className="flex flex-col space-y-4">
                <p className="text-center">Please sign in or create an account to continue</p>
                <Link href="/auth">
                  <a className="btn-primary w-full text-center neon-text">Sign In / Sign Up</a>
                </Link>
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
