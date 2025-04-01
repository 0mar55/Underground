import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { mockData } from '../../utils/database';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
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
          <title>Contact Us | Underground Chilling Room</title>
          <meta name="description" content="Contact Underground Chilling Room" />
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
              <Link href="/menu" className="text-white hover:text-[rgb(var(--neon-pink))]">
                Menu
              </Link>
              <Link href="/booking" className="text-white hover:text-[rgb(var(--neon-pink))]">
                Book Now
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 neon-text">Contact Us</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card neon-border-blue">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">Our Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p>Ain el Remaneh, Beirut, Lebanon</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <p>+961 81 540 918</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Hours</h4>
                    <p>4:00 PM - 2:00 AM daily</p>
                  </div>
                </div>
              </div>
              
              {isSubmitted ? (
                <div className="card neon-border-green">
                  <h3 className="text-xl font-bold mb-4 neon-text-green">Message Sent!</h3>
                  <p className="mb-4">Thank you for contacting us. We will get back to you as soon as possible.</p>
                  <button 
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setMessage('');
                      setIsSubmitted(false);
                    }}
                    className="btn-secondary"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <div className="card neon-border">
                  <h3 className="text-xl font-bold mb-4 neon-text">Send Us a Message</h3>
                  <form onSubmit={handleSubmit} className="space-y-4">
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
                      <label className="block text-sm font-medium mb-1">Your Email</label>
                      <input 
                        type="email" 
                        className="input-field w-full"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Message</label>
                      <textarea 
                        className="input-field w-full h-24"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Send Message
                    </button>
                  </form>
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
