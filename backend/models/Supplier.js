const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  supplierName: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  supplierType: {
    type: String,
    enum: ['food', 'beverages', 'raw-materials', 'packaging', 'equipment', 'other'],
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  gstNumber: {
    type: String
  },
  paymentTerms: {
    type: String,
    enum: ['immediate', 'net-7', 'net-15', 'net-30', 'net-60'],
    default: 'net-30'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 3
  },
  notes: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Supplier', supplierSchema);
