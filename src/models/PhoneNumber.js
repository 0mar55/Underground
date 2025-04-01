import mongoose from 'mongoose';

const phoneNumberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  number: {
    type: String,
    required: true,
    trim: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isPrimary: {
    type: Boolean,
    default: true
  },
  type: {
    type: String,
    enum: ['personal', 'work', 'other'],
    default: 'personal'
  },
  notificationPreferences: {
    bookingUpdates: {
      type: Boolean,
      default: true
    },
    orderUpdates: {
      type: Boolean,
      default: true
    },
    promotions: {
      type: Boolean,
      default: false
    },
    staffAlerts: {
      type: Boolean,
      default: true
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create model if it doesn't exist
const PhoneNumber = mongoose.models.PhoneNumber || mongoose.model('PhoneNumber', phoneNumberSchema);

export default PhoneNumber;
