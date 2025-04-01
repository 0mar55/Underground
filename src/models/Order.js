import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  },
  items: [{
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MenuItem',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      enum: ['food', 'beverages', 'arguile'],
      required: true
    }
  }],
  subtotal: {
    type: Number,
    required: true
  },
  serviceCharge: {
    type: Number,
    required: true
  },
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'preparing', 'delivered', 'cancelled'],
    default: 'pending'
  },
  isDelivery: {
    type: Boolean,
    default: false
  },
  deliveryAddress: {
    street: String,
    city: String,
    district: String,
    building: String,
    floor: String,
    notes: String
  },
  deliveryFee: {
    type: Number,
    default: 0
  },
  deliveryDistance: {
    type: Number
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  handledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Create model if it doesn't exist
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
