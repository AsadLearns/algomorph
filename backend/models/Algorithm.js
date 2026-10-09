const mongoose = require('mongoose');

const algorithmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    enum: ['Two Pointers', 'Sliding Window', 'Binary Search', 'Monotonic Stack', 'Fast & Slow Pointers'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  description: String,
  timeComplexity: String,
  spaceComplexity: String,
  exampleProblems: [String],
  prerequisites: [String],
  codeSnippet: String,
  visualization: {
    arrayExample: [Number],
    steps: [String]
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

module.exports = mongoose.model('Algorithm', algorithmSchema);
