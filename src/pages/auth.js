import { useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Welcome() {
  const router = useRouter();

  // Automatically redirect to main content
  useEffect(() => {
    // Short timeout to allow page to render before redirect
    const timer = setTimeout(() => {
      router.push('/dashboard/overview');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.7)]">
        <Head>
          <title>Welcome | Underground Chilling Room</title>
          <meta name="description" content="Welcome to Underground Chilling Room" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-center items-center">
            <div className="logo-container">
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
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="card neon-border">
              <h2 className="text-xl font-bold mb-6 text-center neon-text">
                Welcome to Underground Chilling Room
              </h2>
              
              <div className="text-center mb-8">
                <p className="mb-4">Experience premium chilling rooms with food, beverage, and arguile service</p>
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[rgb(var(--neon-pink))]"></div>
                <p className="mt-4">Redirecting to main content...</p>
              </div>
              
              <div className="space-y-4">
                <Link href="/dashboard/overview" className="btn-primary w-full block text-center">
                  View Rooms & Services
                </Link>
                <Link href="/" className="btn-secondary w-full block text-center">
                  Return to Home
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
