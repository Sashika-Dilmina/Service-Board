const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a job title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    default: 'General',
  },
  location: {
    type: String,
    required: [true, 'Please add a location'],
  },
  contactName: {
    type: String,
    required: [true, 'Please add a contact name'],
  },
  contactEmail: {
    type: String,
    required: [true, 'Please add a contact email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  status: {
    type: String,
    enum: ['Open', 'In Progress', 'Closed'],
    default: 'Open',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('JobRequest', jobRequestSchema);