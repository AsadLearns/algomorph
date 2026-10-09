const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['login', 'logout', 'algorithm_started', 'algorithm_completed', 'quiz_submitted', 'profile_updated'],
    required: true
  },
  details: mongoose.Schema.Types.Mixed,
  ipAddress: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

module.exports = mongoose.model('Activity', activitySchema);
