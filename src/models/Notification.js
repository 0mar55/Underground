import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['booking', 'order', 'inventory', 'system'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  relatedId: {
    type: mongoose.Schema.Types.ObjectId,
    // This could reference a booking, order, or inventory item
  },
  status: {
    type: String,
    enum: ['pending', 'sent', 'failed', 'delivered', 'read'],
    default: 'pending'
  },
  channel: {
    type: String,
    enum: ['whatsapp', 'sms', 'email', 'app'],
    default: 'whatsapp'
  },
  isStaffNotification: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  sentAt: {
    type: Date
  },
  deliveredAt: {
    type: Date
  },
  readAt: {
    type: Date
  }
});

// Create model if it doesn't exist
const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);

export default Notification;
