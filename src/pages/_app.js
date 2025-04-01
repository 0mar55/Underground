import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import { checkAuthStatus } from '../services/auth';

function UndergroundApp({ Component, pageProps }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication status
    const { isAuthenticated, user } = checkAuthStatus();
    setIsAuthenticated(isAuthenticated);
    setUser(user);
    setIsLoading(false);
    
    // Redirect to auth page if not authenticated and not already on auth page
    if (!isAuthenticated && router.pathname !== '/auth' && router.pathname !== '/') {
      router.push('/auth');
    }
  }, [router.pathname]);
  
  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }
  
  return (
    <>
      <Head>
        <title>Underground Chilling Room</title>
        <meta name="description" content="Underground Chilling Room - Food, Beverage, and Arguile Service" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#121212" />
        <meta property="og:title" content="Underground Chilling Room" />
        <meta property="og:description" content="Underground Chilling Room - Food, Beverage, and Arguile Service" />
        <meta property="og:url" content="https://undergr0und.space" />
        <meta property="og:type" content="website" />
      </Head>
      <Component {...pageProps} isAuthenticated={isAuthenticated} user={user} />
    </>
  ) ;
}

export default UndergroundApp;
