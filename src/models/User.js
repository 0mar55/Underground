import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['owner', 'manager', 'accountant', 'staff', 'client'],
    default: 'client'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLogin: {
    type: Date
  },
  phoneNumber: {
    type: String,
    trim: true
  },
  profileImage: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  }
});

// Create model if it doesn't exist
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
