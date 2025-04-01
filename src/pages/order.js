import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Order() {
  const [activeTab, setActiveTab] = useState('food');
  const [cart, setCart] = useState([]);
  const [roomNumber, setRoomNumber] = useState('Neon Lounge');
  
  // Mock data for menu items
  const menuItems = {
    food: [
      { id: 'f1', name: 'Mezze Platter', description: 'Hummus, tabbouleh, baba ghanoush, and pita bread', price: 150000, image: 'mezze.jpg' },
      { id: 'f2', name: 'Chicken Wings', description: 'Spicy buffalo or BBQ sauce, with blue cheese dip', price: 120000, image: 'wings.jpg' },
      { id: 'f3', name: 'Beef Sliders', description: 'Three mini burgers with cheese and special sauce', price: 180000, image: 'sliders.jpg' },
      { id: 'f4', name: 'Cheese Platter', description: 'Selection of local and imported cheeses with crackers', price: 200000, image: 'cheese.jpg' },
      { id: 'f5', name: 'French Fries', description: 'Crispy fries with ketchup and aioli', price: 80000, image: 'fries.jpg' },
    ],
    beverages: [
      { id: 'b1', name: 'Fresh Juice', description: 'Orange, apple, or carrot', price: 70000, image: 'juice.jpg' },
      { id: 'b2', name: 'Soft Drinks', description: 'Coca-Cola, Sprite, Fanta', price: 50000, image: 'soda.jpg' },
      { id: 'b3', name: 'Sparkling Water', description: 'San Pellegrino or Perrier', price: 60000, image: 'sparkling.jpg' },
      { id: 'b4', name: 'Iced Tea', description: 'Peach or lemon', price: 65000, image: 'icedtea.jpg' },
      { id: 'b5', name: 'Mocktails', description: 'Virgin mojito, piña colada, or blue lagoon', price: 90000, image: 'mocktail.jpg' },
    ],
    arguile: [
      { id: 'a1', name: 'Classic Flavor', description: 'Apple, grape, or mint', price: 100000, image: 'classic.jpg' },
      { id: 'a2', name: 'Premium Flavor', description: 'Blueberry, watermelon, or peach', price: 120000, image: 'premium.jpg' },
      { id: 'a3', name: 'Special Mix', description: 'Custom blend of flavors', price: 150000, image: 'special.jpg' },
      { id: 'a4', name: 'Ice Arguile', description: 'With ice base for smoother experience', price: 180000, image: 'ice.jpg' },
    ]
  };

  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existingItem = cart.find(item => item.id === itemId);
    
    if (existingItem.quantity === 1) {
      setCart(cart.filter(item => item.id !== itemId));
    } else {
      setCart(cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Place Order | Underground Chilling Room</title>
        <meta name="description" content="Order food, beverages, and arguile service" />
      </Head>

      <header className="bg-uv-dark bg-opacity-90 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/">
            <a className="text-2xl font-bold text-white">Underground</a>
          </Link>
          <h1 className="text-xl font-bold text-white">Place Order</h1>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-uv-purple">Menu</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveTab('food')}
                    className={`px-3 py-1 rounded text-sm ${activeTab === 'food' ? 'bg-uv-purple text-white' : 'bg-uv-dark text-white'}`}
                  >
                    Food
                  </button>
                  <button 
                    onClick={() => setActiveTab('beverages')}
                    className={`px-3 py-1 rounded text-sm ${activeTab === 'beverages' ? 'bg-uv-purple text-white' : 'bg-uv-dark text-white'}`}
                  >
                    Beverages
                  </button>
                  <button 
                    onClick={() => setActiveTab('arguile')}
                    className={`px-3 py-1 rounded text-sm ${activeTab === 'arguile' ? 'bg-uv-purple text-white' : 'bg-uv-dark text-white'}`}
                  >
                    Arguile
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {menuItems[activeTab].map(item => (
                  <div key={item.id} className="bg-uv-dark bg-opacity-50 p-4 rounded-lg border border-uv-purple/30 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm">{item.description}</p>
                      <p className="text-uv-purple font-bold mt-1">{formatPrice(item.price)} LBP</p>
                    </div>
                    <button 
                      onClick={() => addToCart(item)}
                      className="btn-primary text-sm"
                    >
                      Add to Order
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="card sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-uv-purple">Your Order</h2>
              
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Room</label>
                <select 
                  className="input-field w-full"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                >
                  <option value="Neon Lounge">Neon Lounge</option>
                  <option value="Purple Haze">Purple Haze</option>
                  <option value="Blue Velvet">Blue Velvet</option>
                  <option value="Midnight Oasis">Midnight Oasis</option>
                </select>
              </div>
              
              {cart.length === 0 ? (
                <div className="bg-uv-dark bg-opacity-50 p-4 rounded-lg text-center">
                  <p>Your order is empty</p>
                  <p className="text-sm mt-2">Add items from the menu</p>
                </div>
              ) : (
                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.id} className="bg-uv-dark bg-opacity-50 p-3 rounded-lg flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-sm">{item.name}</h3>
                        <p className="text-xs">{formatPrice(item.price)} LBP × {item.quantity}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="bg-uv-dark text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="bg-uv-purple text-white w-6 h-6 rounded-full flex items-center justify-center text-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="border-t border-uv-purple/30 pt-4 mt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>{formatPrice(calculateTotal())} LBP</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service Charge (10%)</span>
                  <span>{formatPrice(calculateTotal() * 0.1)} LBP</span>
                </div>
                <div className="flex justify-between font-bold text-uv-purple">
                  <span>Total</span>
                  <span>{formatPrice(calculateTotal() * 1.1)} LBP</span>
                </div>
              </div>
              
              <button 
                className={`btn-primary w-full mt-4 ${cart.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={cart.length === 0}
              >
                Place Order
              </button>
              
              <p className="text-xs text-center mt-2">
                Your order will be delivered to {roomNumber}
              </p>
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
