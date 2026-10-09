const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  algorithmId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Algorithm',
    required: true
  },
  algorithmName: String,
  category: String,
  attempts: {
    type: Number,
    default: 0
  },
  correctAttempts: {
    type: Number,
    default: 0
  },
  timeSpentSeconds: {
    type: Number,
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: Date,
  lastAttemptAt: Date,
  quizAnswers: [{
    question: String,
    userAnswer: String,
    correctAnswer: String,
    isCorrect: Boolean,
    attemptedAt: Date
  }],
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Progress', progressSchema);
