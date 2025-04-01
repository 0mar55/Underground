import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('client');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setLoading(false);
      
      // For demo purposes, hardcoded credentials
      if (isLogin) {
        if (email === 'owner@underground.com' && password === 'password') {
          router.push('/dashboard/owner');
        } else if (email === 'manager@underground.com' && password === 'password') {
          router.push('/dashboard/manager');
        } else if (email === 'accountant@underground.com' && password === 'password') {
          router.push('/dashboard/accountant');
        } else if (email === 'staff@underground.com' && password === 'password') {
          router.push('/staff/rooms');
        } else if (email === 'client@underground.com' && password === 'password') {
          router.push('/');
        } else {
          setError('Invalid email or password');
        }
      } else {
        // In a real app, this would create a new user in the database
        router.push('/');
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.7)]">
        <Head>
          <title>{isLogin ? 'Sign In' : 'Sign Up'} | Underground Chilling Room</title>
          <meta name="description" content="Authentication for Underground Chilling Room app" />
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
                {isLogin ? 'Sign In to Your Account' : 'Create a New Account'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Full Name</label>
                    <input 
                      type="text" 
                      className="input-field w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <input 
                    type="password" 
                    className="w-full p-3 rounded bg-gray-800 border border-gray-600 text-white"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium mb-1">Account Type</label>
                    <select 
                      className="input-field w-full"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="client">Client</option>
                      <option value="staff">Staff (Requires Approval)</option>
                    </select>
                  </div>
                )}
                
                {error && (
                  <div className="bg-red-500 bg-opacity-20 border border-red-500 text-red-500 p-3 rounded text-sm">
                    {error}
                  </div>
                )}
                
                <button 
                  type="submit"
                  className="btn-primary w-full flex justify-center items-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="mr-2 inline-block animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    isLogin ? 'Sign In' : 'Sign Up'
                  )}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <p>
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <button 
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-[rgb(var(--neon-pink))] hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
              
              {isLogin && (
                <div className="mt-8 border-t border-[rgba(var(--neon-blue),0.3)] pt-6">
                  <h3 className="text-center text-sm font-medium mb-4 neon-text-blue">Demo Accounts</h3>
                  <div className="grid grid-cols-1 gap-2 text-xs">
                    <div className="bg-[rgba(15,10,40,0.7)] p-2 rounded neon-border-blue">
                      <p><strong className="text-[rgb(var(--neon-pink))]">Owner:</strong> owner@underground.com / password</p>
                    </div>
                    <div className="bg-[rgba(15,10,40,0.7)] p-2 rounded neon-border-blue">
                      <p><strong className="text-[rgb(var(--neon-pink))]">Manager:</strong> manager@underground.com / password</p>
                    </div>
                    <div className="bg-[rgba(15,10,40,0.7)] p-2 rounded neon-border-blue">
                      <p><strong className="text-[rgb(var(--neon-pink))]">Accountant:</strong> accountant@underground.com / password</p>
                    </div>
                    <div className="bg-[rgba(15,10,40,0.7)] p-2 rounded neon-border-blue">
                      <p><strong className="text-[rgb(var(--neon-pink))]">Staff:</strong> staff@underground.com / password</p>
                    </div>
                    <div className="bg-[rgba(15,10,40,0.7)] p-2 rounded neon-border-blue">
                      <p><strong className="text-[rgb(var(--neon-pink))]">Client:</strong> client@underground.com / password</p>
                    </div>
                  </div>
                </div>
              )}
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
