import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { withRoleProtection } from '../../utils/rbac';
import usePermissions from '../../hooks/usePermissions';

// Import auth service
const useAuth = () => {
  // In a real app, this would be imported from the auth service
  const checkAuth = () => {
    const user = localStorage.getItem('underground_user');
    return user ? JSON.parse(user) : null;
  };

  const logout = () => {
    localStorage.removeItem('underground_user');
    window.location.href = '/auth';
  };

  return { checkAuth, logout };
};

function DataManagement() {
  const [activeTab, setActiveTab] = useState('rooms');
  const [rooms, setRooms] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(null);
  const { hasPermission } = usePermissions();
  const { logout } = useAuth();

  // Form states for different data types
  const [roomForm, setRoomForm] = useState({
    name: '',
    capacity: 5,
    status: 'available',
    description: '',
    hourlyRateWeekday: 375000,
    hourlyRateWeekend: 500000,
    extraPersonRateWeekday: 75000,
    extraPersonRateWeekend: 100000,
    baseCapacity: 5
  });

  const [menuItemForm, setMenuItemForm] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'food',
    isAvailable: true,
    isPopular: false,
    ingredients: ''
  });

  const [inventoryForm, setInventoryForm] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: 'pcs',
    lowStockThreshold: 5,
    cost: 0,
    supplier: ''
  });

  // Mock data
  useEffect(() => {
    // In a real app, this would fetch from the database
    setRooms([
      { id: 1, name: 'Neon Lounge', capacity: 8, status: 'available', description: 'Our signature room with neon lighting and premium sound system', hourlyRateWeekday: 375000, hourlyRateWeekend: 500000, extraPersonRateWeekday: 75000, extraPersonRateWeekend: 100000, baseCapacity: 5 },
      { id: 2, name: 'Purple Haze', capacity: 6, status: 'booked', description: 'Intimate setting with purple ambient lighting', hourlyRateWeekday: 375000, hourlyRateWeekend: 500000, extraPersonRateWeekday: 75000, extraPersonRateWeekend: 100000, baseCapacity: 5 },
      { id: 3, name: 'Blue Velvet', capacity: 10, status: 'available', description: 'Our largest room with blue velvet furnishings', hourlyRateWeekday: 450000, hourlyRateWeekend: 600000, extraPersonRateWeekday: 75000, extraPersonRateWeekend: 100000, baseCapacity: 8 },
      { id: 4, name: 'Midnight Oasis', capacity: 4, status: 'maintenance', description: 'Cozy room for small groups', hourlyRateWeekday: 300000, hourlyRateWeekend: 400000, extraPersonRateWeekday: 75000, extraPersonRateWeekend: 100000, baseCapacity: 4 }
    ]);

    setMenuItems([
      { id: 1, name: 'Premium Flavor Arguile', description: 'Premium tobacco with special house blend', price: 150000, category: 'arguile', isAvailable: true, isPopular: true, ingredients: 'Premium tobacco, fruit flavors' },
      { id: 2, name: 'Mezze Platter', description: 'Selection of Lebanese mezze', price: 200000, category: 'food', isAvailable: true, isPopular: true, ingredients: 'Hummus, tabbouleh, fattoush, kibbeh, cheese rolls' },
      { id: 3, name: 'Chicken Wings', description: 'Spicy chicken wings', price: 150000, category: 'food', isAvailable: true, isPopular: true, ingredients: 'Chicken wings, spices, sauce' },
      { id: 4, name: 'Fruit Mocktail', description: 'Refreshing fruit mocktail', price: 100000, category: 'beverages', isAvailable: true, isPopular: false, ingredients: 'Fresh fruits, juice, soda' }
    ]);

    setInventoryItems([
      { id: 1, name: 'Premium Tobacco', category: 'Arguile Supplies', quantity: 10, unit: 'kg', lowStockThreshold: 5, cost: 500000, supplier: 'Lebanese Tobacco Co.' },
      { id: 2, name: 'Chicken Wings', category: 'Food Ingredients', quantity: 20, unit: 'kg', lowStockThreshold: 5, cost: 300000, supplier: 'Local Butcher' },
      { id: 3, name: 'Hummus', category: 'Food Ingredients', quantity: 5, unit: 'kg', lowStockThreshold: 2, cost: 100000, supplier: 'Lebanese Delights' },
      { id: 4, name: 'Fresh Fruits', category: 'Beverage Ingredients', quantity: 15, unit: 'kg', lowStockThreshold: 5, cost: 200000, supplier: 'Local Market' }
    ]);
  }, []);

  const handleInputChange = (e, formSetter) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      formSetter(prev => ({
        ...prev,
        [name]: checked
      }));
    } else if (type === 'number') {
      formSetter(prev => ({
        ...prev,
        [name]: Number(value)
      }));
    } else {
      formSetter(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const resetForms = () => {
    setRoomForm({
      name: '',
      capacity: 5,
      status: 'available',
      description: '',
      hourlyRateWeekday: 375000,
      hourlyRateWeekend: 500000,
      extraPersonRateWeekday: 75000,
      extraPersonRateWeekend: 100000,
      baseCapacity: 5
    });

    setMenuItemForm({
      name: '',
      description: '',
      price: 0,
      category: 'food',
      isAvailable: true,
      isPopular: false,
      ingredients: ''
    });

    setInventoryForm({
      name: '',
      category: '',
      quantity: 0,
      unit: 'pcs',
      lowStockThreshold: 5,
      cost: 0,
      supplier: ''
    });

    setSelectedItem(null);
    setIsEditing(false);
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    
    if (activeTab === 'rooms') {
      setRoomForm({
        name: item.name,
        capacity: item.capacity,
        status: item.status,
        description: item.description,
        hourlyRateWeekday: item.hourlyRateWeekday,
        hourlyRateWeekend: item.hourlyRateWeekend,
        extraPersonRateWeekday: item.extraPersonRateWeekday,
        extraPersonRateWeekend: item.extraPersonRateWeekend,
        baseCapacity: item.baseCapacity
      });
    } else if (activeTab === 'menu') {
      setMenuItemForm({
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category,
        isAvailable: item.isAvailable,
        isPopular: item.isPopular,
        ingredients: item.ingredients
      });
    } else if (activeTab === 'inventory') {
      setInventoryForm({
        name: item.name,
        category: item.category,
        quantity: item.quantity,
        unit: item.unit,
        lowStockThreshold: item.lowStockThreshold,
        cost: item.cost,
        supplier: item.supplier
      });
    }
    
    setIsEditing(true);
  };

  const handleCreateItem = (e) => {
    e.preventDefault();
    
    if (activeTab === 'rooms') {
      // Validate form
      if (!roomForm.name) {
        setStatus({ type: 'error', message: 'Room name is required' });
        return;
      }
      
      // Create new room
      const newId = Math.max(...rooms.map(room => room.id)) + 1;
      const newRoom = {
        id: newId,
        ...roomForm
      };
      
      setRooms([...rooms, newRoom]);
      setStatus({ type: 'success', message: 'Room created successfully' });
    } else if (activeTab === 'menu') {
      // Validate form
      if (!menuItemForm.name || !menuItemForm.description) {
        setStatus({ type: 'error', message: 'Name and description are required' });
        return;
      }
      
      // Create new menu item
      const newId = Math.max(...menuItems.map(item => item.id)) + 1;
      const newMenuItem = {
        id: newId,
        ...menuItemForm
      };
      
      setMenuItems([...menuItems, newMenuItem]);
      setStatus({ type: 'success', message: 'Menu item created successfully' });
    } else if (activeTab === 'inventory') {
      // Validate form
      if (!inventoryForm.name || !inventoryForm.category) {
        setStatus({ type: 'error', message: 'Name and category are required' });
        return;
      }
      
      // Create new inventory item
      const newId = Math.max(...inventoryItems.map(item => item.id)) + 1;
      const newInventoryItem = {
        id: newId,
        ...inventoryForm
      };
      
      setInventoryItems([...inventoryItems, newInventoryItem]);
      setStatus({ type: 'success', message: 'Inventory item created successfully' });
    }
    
    resetForms();
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();
    
    if (!selectedItem) return;
    
    if (activeTab === 'rooms') {
      // Validate form
      if (!roomForm.name) {
        setStatus({ type: 'error', message: 'Room name is required' });
        return;
      }
      
      // Update room
      const updatedRooms = rooms.map(room => {
        if (room.id === selectedItem.id) {
          return { 
            ...room, 
            ...roomForm
          };
        }
        return room;
      });
      
      setRooms(updatedRooms);
      setStatus({ type: 'success', message: 'Room updated successfully' });
    } else if (activeTab === 'menu') {
      // Validate form
      if (!menuItemForm.name || !menuItemForm.description) {
        setStatus({ type: 'error', message: 'Name and description are required' });
        return;
      }
      
      // Update menu item
      const updatedMenuItems = menuItems.map(item => {
        if (item.id === selectedItem.id) {
          return { 
            ...item, 
            ...menuItemForm
          };
        }
        return item;
      });
      
      setMenuItems(updatedMenuItems);
      setStatus({ type: 'success', message: 'Menu item updated successfully' });
    } else if (activeTab === 'inventory') {
      // Validate form
      if (!inventoryForm.name || !inventoryForm.category) {
        setStatus({ type: 'error', message: 'Name and category are required' });
        return;
      }
      
      // Update inventory item
      const updatedInventoryItems = inventoryItems.map(item => {
        if (item.id === selectedItem.id) {
          return { 
            ...item, 
            ...inventoryForm
          };
        }
        return item;
      });
      
      setInventoryItems(updatedInventoryItems);
      setStatus({ type: 'success', message: 'Inventory item updated successfully' });
    }
    
    resetForms();
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  const handleDeleteItem = (id) => {
    // Confirm deletion
    if (!confirm('Are you sure you want to delete this item? This action cannot be undone.')) {
      return;
    }
    
    if (activeTab === 'rooms') {
      // Delete room
      const updatedRooms = rooms.filter(room => room.id !== id);
      setRooms(updatedRooms);
      setStatus({ type: 'success', message: 'Room deleted successfully' });
    } else if (activeTab === 'menu') {
      // Delete menu item
      const updatedMenuItems = menuItems.filter(item => item.id !== id);
      setMenuItems(updatedMenuItems);
      setStatus({ type: 'success', message: 'Menu item deleted successfully' });
    } else if (activeTab === 'inventory') {
      // Delete inventory item
      const updatedInventoryItems = inventoryItems.filter(item => item.id !== id);
      setInventoryItems(updatedInventoryItems);
      setStatus({ type: 'success', message: 'Inventory item deleted successfully' });
    }
    
    if (selectedItem && selectedItem.id === id) {
      resetForms();
    }
    
    // Clear status after 3 seconds
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };

  const renderRoomsTable = () => (
    <table className="w-full">
      <thead>
        <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
          <th className="text-left py-2 px-3">Name</th>
          <th className="text-left py-2 px-3">Capacity</th>
          <th className="text-left py-2 px-3">Status</th>
          <th className="text-left py-2 px-3">Weekday Rate</th>
          <th className="text-left py-2 px-3">Weekend Rate</th>
          <th className="text-right py-2 px-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {rooms.map(room => (
          <tr key={room.id} className="border-b border-[rgba(var(--neon-pink),0.1)]">
            <td className="py-2 px-3">{room.name}</td>
            <td className="py-2 px-3">{room.capacity} persons</td>
            <td className="py-2 px-3">
              <span className={`px-2 py-1 rounded text-xs ${
                room.status === 'available' ? 'bg-green-600' :
                room.status === 'booked' ? 'bg-[rgba(var(--neon-blue),0.8)]' :
                'bg-[rgba(var(--neon-orange),0.8)]'
              }`}>
                {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
              </span>
            </td>
            <td className="py-2 px-3">{room.hourlyRateWeekday.toLocaleString()} LBP</td>
            <td className="py-2 px-3">{room.hourlyRateWeekend.toLocaleString()} LBP</td>
            <td className="py-2 px-3 text-right">
              <button 
                onClick={() => handleSelectItem(room)}
                className="text-[rgb(var(--neon-blue))] hover:underline text-sm mr-2"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteItem(room.id)}
                className="text-[rgb(var(--neon-pink))] hover:underline text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderMenuTable = () => (
    <table className="w-full">
      <thead>
        <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
          <th className="text-left py-2 px-3">Name</th>
          <th className="text-left py-2 px-3">Category</th>
          <th className="text-left py-2 px-3">Price</th>
          <th className="text-left py-2 px-3">Status</th>
          <th className="text-left py-2 px-3">Popular</th>
          <th className="text-right py-2 px-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {menuItems.map(item => (
          <tr key={item.id} className="border-b border-[rgba(var(--neon-pink),0.1)]">
            <td className="py-2 px-3">{item.name}</td>
            <td className="py-2 px-3">
              <span className={`px-2 py-1 rounded text-xs ${
                item.category === 'food' ? 'bg-[rgba(var(--neon-green),0.8)]' :
                item.category === 'beverages' ? 'bg-[rgba(var(--neon-blue),0.8)]' :
                'bg-[rgba(var(--neon-purple),0.8)]'
              }`}>
                {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
              </span>
            </td>
            <td className="py-2 px-3">{item.price.toLocaleString()} LBP</td>
            <td className="py-2 px-3">
              <span className={`px-2 py-1 rounded text-xs ${item.isAvailable ? 'bg-green-600' : 'bg-red-600'}`}>
                {item.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </td>
            <td className="py-2 px-3">
              <span className={`px-2 py-1 rounded text-xs ${item.isPopular ? 'bg-[rgba(var(--neon-pink),0.8)]' : 'bg-gray-600'}`}>
                {item.isPopular ? 'Popular' : 'Regular'}
              </span>
            </td>
            <td className="py-2 px-3 text-right">
              <button 
                onClick={() => handleSelectItem(item)}
                className="text-[rgb(var(--neon-blue))] hover:underline text-sm mr-2"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteItem(item.id)}
                className="text-[rgb(var(--neon-pink))] hover:underline text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderInventoryTable = () => (
    <table className="w-full">
      <thead>
        <tr className="border-b border-[rgba(var(--neon-pink),0.3)]">
          <th className="text-left py-2 px-3">Name</th>
          <th className="text-left py-2 px-3">Category</th>
          <th className="text-left py-2 px-3">Quantity</th>
          <th className="text-left py-2 px-3">Unit</th>
          <th className="text-left py-2 px-3">Cost</th>
          <th className="text-right py-2 px-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {inventoryItems.map(item => (
          <tr key={item.id} className="border-b border-[rgba(var(--neon-pink),0.1)]">
            <td className="py-2 px-3">{item.name}</td>
            <td className="py-2 px-3">{item.category}</td>
            <td className="py-2 px-3">
              <span className={`px-2 py-1 rounded text-xs ${
                item.quantity <= item.lowStockThreshold ? 'bg-red-600' : 'bg-green-600'
              }`}>
                {item.quantity} {item.unit}
              </span>
            </td>
            <td className="py-2 px-3">{item.unit}</td>
            <td className="py-2 px-3">{item.cost.toLocaleString()} LBP</td>
            <td className="py-2 px-3 text-right">
              <button 
                onClick={() => handleSelectItem(item)}
                className="text-[rgb(var(--neon-blue))] hover:underline text-sm mr-2"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDeleteItem(item.id)}
                className="text-[rgb(var(--neon-pink))] hover:underline text-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderRoomForm = () => (
    <form onSubmit={isEditing ? handleUpdateItem : handleCreateItem} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Room Name *</label>
          <input 
            type="text" 
            name="name"
            className="input-field w-full"
            value={roomForm.name}
            onChange={(e) => handleInputChange(e, setRoomForm)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Capacity *</label>
          <input 
            type="number" 
            name="capacity"
            className="input-field w-full"
            value={roomForm.capacity}
            onChange={(e) => handleInputChange(e, setRoomForm)}
            min="1"
            required
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea 
          name="description"
          className="input-field w-full h-20"
          value={roomForm.description}
          onChange={(e) => handleInputChange(e, setRoomForm)}
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select 
          name="status"
          className="input-field w-full"
          value={roomForm.status}
          onChange={(e) => handleInputChange(e, setRoomForm)}
        >
          <option value="available">Available</option>
          <option value="booked">Booked</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Weekday Rate (LBP) *</label>
          <input 
            type="number" 
            name="hourlyRateWeekday"
            className="input-field w-full"
            value={roomForm.hourlyRateWeekday}
            onChange={(e) => handleInputChange(e, setRoomForm)}
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Weekend Rate (LBP) *</label>
          <input 
            type="number" 
            name="hourlyRateWeekend"
            className="input-field w-full"
            value={roomForm.hourlyRateWeekend}
            onChange={(e) => handleInputChange(e, setRoomForm)}
            min="0"
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Base Capacity *</label>
          <input 
            type="number" 
            name="baseCapacity"
            className="input-field w-full"
            value={roomForm.baseCapacity}
            onChange={(e) => handleInputChange(e, setRoomForm)}
            min="1"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Extra Person (Weekday)</label>
          <input 
            type="number" 
            name="extraPersonRateWeekday"
            className="input-field w-full"
            value={roomForm.extraPersonRateWeekday}
            onChange={(e) => handleInputChange(e, setRoomForm)}
            min="0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Extra Person (Weekend)</label>
          <input 
            type="number" 
            name="extraPersonRateWeekend"
            className="input-field w-full"
            value={roomForm.extraPersonRateWeekend}
            onChange={(e) => handleInputChange(e, setRoomForm)}
            min="0"
          />
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          type="submit"
          className="btn-primary flex-1"
        >
          {isEditing ? 'Update Room' : 'Create Room'}
        </button>
        {isEditing && (
          <button 
            type="button"
            onClick={resetForms}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  const renderMenuItemForm = () => (
    <form onSubmit={isEditing ? handleUpdateItem : handleCreateItem} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Item Name *</label>
          <input 
            type="text" 
            name="name"
            className="input-field w-full"
            value={menuItemForm.name}
            onChange={(e) => handleInputChange(e, setMenuItemForm)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <select 
            name="category"
            className="input-field w-full"
            value={menuItemForm.category}
            onChange={(e) => handleInputChange(e, setMenuItemForm)}
            required
          >
            <option value="food">Food</option>
            <option value="beverages">Beverages</option>
            <option value="arguile">Arguile</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea 
          name="description"
          className="input-field w-full h-20"
          value={menuItemForm.description}
          onChange={(e) => handleInputChange(e, setMenuItemForm)}
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Ingredients</label>
        <textarea 
          name="ingredients"
          className="input-field w-full h-20"
          value={menuItemForm.ingredients}
          onChange={(e) => handleInputChange(e, setMenuItemForm)}
          placeholder="Comma-separated list of ingredients"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price (LBP) *</label>
          <input 
            type="number" 
            name="price"
            className="input-field w-full"
            value={menuItemForm.price}
            onChange={(e) => handleInputChange(e, setMenuItemForm)}
            min="0"
            required
          />
        </div>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            name="isAvailable"
            id="isAvailable"
            className="w-4 h-4 text-[rgb(var(--neon-blue))] bg-[rgba(15,10,40,0.7)] border-[rgba(var(--neon-blue),0.3)] rounded focus:ring-[rgb(var(--neon-blue))] focus:ring-opacity-25"
            checked={menuItemForm.isAvailable}
            onChange={(e) => handleInputChange(e, setMenuItemForm)}
          />
          <label htmlFor="isAvailable" className="ml-2 text-sm font-medium">Available</label>
        </div>
        <div className="flex items-center">
          <input 
            type="checkbox" 
            name="isPopular"
            id="isPopular"
            className="w-4 h-4 text-[rgb(var(--neon-pink))] bg-[rgba(15,10,40,0.7)] border-[rgba(var(--neon-pink),0.3)] rounded focus:ring-[rgb(var(--neon-pink))] focus:ring-opacity-25"
            checked={menuItemForm.isPopular}
            onChange={(e) => handleInputChange(e, setMenuItemForm)}
          />
          <label htmlFor="isPopular" className="ml-2 text-sm font-medium">Mark as Popular</label>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          type="submit"
          className="btn-primary flex-1"
        >
          {isEditing ? 'Update Item' : 'Create Item'}
        </button>
        {isEditing && (
          <button 
            type="button"
            onClick={resetForms}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  const renderInventoryForm = () => (
    <form onSubmit={isEditing ? handleUpdateItem : handleCreateItem} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Item Name *</label>
          <input 
            type="text" 
            name="name"
            className="input-field w-full"
            value={inventoryForm.name}
            onChange={(e) => handleInputChange(e, setInventoryForm)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <input 
            type="text" 
            name="category"
            className="input-field w-full"
            value={inventoryForm.category}
            onChange={(e) => handleInputChange(e, setInventoryForm)}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Quantity *</label>
          <input 
            type="number" 
            name="quantity"
            className="input-field w-full"
            value={inventoryForm.quantity}
            onChange={(e) => handleInputChange(e, setInventoryForm)}
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Unit *</label>
          <select 
            name="unit"
            className="input-field w-full"
            value={inventoryForm.unit}
            onChange={(e) => handleInputChange(e, setInventoryForm)}
            required
          >
            <option value="pcs">Pieces</option>
            <option value="kg">Kilograms</option>
            <option value="g">Grams</option>
            <option value="l">Liters</option>
            <option value="ml">Milliliters</option>
            <option value="box">Boxes</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Low Stock Threshold</label>
          <input 
            type="number" 
            name="lowStockThreshold"
            className="input-field w-full"
            value={inventoryForm.lowStockThreshold}
            onChange={(e) => handleInputChange(e, setInventoryForm)}
            min="0"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cost (LBP) *</label>
          <input 
            type="number" 
            name="cost"
            className="input-field w-full"
            value={inventoryForm.cost}
            onChange={(e) => handleInputChange(e, setInventoryForm)}
            min="0"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Supplier</label>
          <input 
            type="text" 
            name="supplier"
            className="input-field w-full"
            value={inventoryForm.supplier}
            onChange={(e) => handleInputChange(e, setInventoryForm)}
          />
        </div>
      </div>
      
      <div className="flex space-x-2">
        <button 
          type="submit"
          className="btn-primary flex-1"
        >
          {isEditing ? 'Update Item' : 'Create Item'}
        </button>
        {isEditing && (
          <button 
            type="button"
            onClick={resetForms}
            className="btn-secondary flex-1"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[url('/images/logo-full.webp')] bg-cover bg-center bg-no-repeat bg-fixed">
      <div className="min-h-screen flex flex-col backdrop-blur-sm bg-[rgba(5,0,30,0.8)]">
        <Head>
          <title>Data Management | Underground Chilling Room</title>
          <meta name="description" content="Data management for Underground Chilling Room" />
        </Head>

        <header className="bg-[rgba(5,0,30,0.8)] backdrop-blur-md p-4 shadow-[0_0_15px_rgba(var(--neon-blue),0.5)]">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/dashboard/owner">
              <a className="logo-container">
                <Image 
                  src="/images/logo-simple.webp" 
                  alt="Underground Logo" 
                  width={200} 
                  height={50} 
                  className="h-10 w-auto"
                />
              </a>
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={logout}
                className="btn-secondary text-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold neon-text">Data Management</h2>
            <div className="flex space-x-2">
              <Link href="/dashboard/users">
                <a className="btn-secondary text-sm">
                  Manage Users
                </a>
              </Link>
              <Link href="/dashboard/owner">
                <a className="btn-secondary text-sm">
                  Back to Dashboard
                </a>
              </Link>
            </div>
          </div>
          
          {status && (
            <div className={`mb-6 p-4 rounded-lg ${status.type === 'success' ? 'bg-green-500 bg-opacity-20 border border-green-500' : 'bg-red-500 bg-opacity-20 border border-red-500'}`}>
              <p className={`text-sm ${status.type === 'success' ? 'text-green-500' : 'text-red-500'}`}>{status.message}</p>
            </div>
          )}
          
          <div className="mb-6">
            <div className="flex border-b border-[rgba(var(--neon-blue),0.3)]">
              <button
                className={`neon-tab ${activeTab === 'rooms' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => { setActiveTab('rooms'); resetForms(); }}
              >
                Rooms
              </button>
              <button
                className={`neon-tab ${activeTab === 'menu' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => { setActiveTab('menu'); resetForms(); }}
              >
                Menu Items
              </button>
              <button
                className={`neon-tab ${activeTab === 'inventory' ? 'neon-tab-active' : 'neon-tab-inactive'}`}
                onClick={() => { setActiveTab('inventory'); resetForms(); }}
              >
                Inventory
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="card neon-border">
                <h3 className="text-xl font-bold mb-4 neon-text">
                  {activeTab === 'rooms' ? 'Rooms' : 
                   activeTab === 'menu' ? 'Menu Items' : 
                   'Inventory Items'}
                </h3>
                
                <div className="overflow-x-auto">
                  {activeTab === 'rooms' && renderRoomsTable()}
                  {activeTab === 'menu' && renderMenuTable()}
                  {activeTab === 'inventory' && renderInventoryTable()}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="card neon-border-blue">
                <h3 className="text-xl font-bold mb-4 neon-text-blue">
                  {isEditing ? 
                    (activeTab === 'rooms' ? 'Edit Room' : 
                     activeTab === 'menu' ? 'Edit Menu Item' : 
                     'Edit Inventory Item') : 
                    (activeTab === 'rooms' ? 'Create New Room' : 
                     activeTab === 'menu' ? 'Create New Menu Item' : 
                     'Create New Inventory Item')}
                </h3>
                
                {activeTab === 'rooms' && renderRoomForm()}
                {activeTab === 'menu' && renderMenuItemForm()}
                {activeTab === 'inventory' && renderInventoryForm()}
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

// Wrap component with role protection
export default withRoleProtection(DataManagement, ['owner']);
