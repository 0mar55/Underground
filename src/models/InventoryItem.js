import mongoose from 'mongoose';

const inventoryItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 0
  },
  unit: {
    type: String,
    required: true,
    trim: true
  },
  lowStockThreshold: {
    type: Number,
    required: true,
    default: 5
  },
  cost: {
    type: Number,
    required: true
  },
  supplier: {
    type: String,
    trim: true
  },
  lastRestocked: {
    type: Date,
    default: Date.now
  },
  relatedMenuItems: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem'
  }],
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
const InventoryItem = mongoose.models.InventoryItem || mongoose.model('InventoryItem', inventoryItemSchema);

export default InventoryItem;
