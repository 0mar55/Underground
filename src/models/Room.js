import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'maintenance'],
    default: 'available'
  },
  description: {
    type: String,
    trim: true
  },
  images: [{
    type: String
  }],
  features: [{
    type: String
  }],
  hourlyRate: {
    weekday: {
      type: Number,
      required: true,
      default: 375000 // 375,000 LBP
    },
    weekend: {
      type: Number,
      required: true,
      default: 500000 // 500,000 LBP
    }
  },
  extraPersonRate: {
    weekday: {
      type: Number,
      required: true,
      default: 75000 // 75,000 LBP
    },
    weekend: {
      type: Number,
      required: true,
      default: 100000 // 100,000 LBP
    }
  },
  baseCapacity: {
    type: Number,
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model if it doesn't exist
const Room = mongoose.models.Room || mongoose.model('Room', roomSchema);

export default Room;
