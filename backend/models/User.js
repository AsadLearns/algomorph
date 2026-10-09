const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
  },
  passwordHash: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  profileImage: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    default: ''
  },
  totalScore: {
    type: Number,
    default: 0
  },
  patternsCompleted: {
    type: Number,
    default: 0
  },
  currentStreak: {
    type: Number,
    default: 0
  },
  badges: [{
    name: String,
    earnedAt: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastLoginAt: Date,
  isActive: {
    type: Boolean,
    default: true
  }
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('passwordHash')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(passwordToCheck) {
  return await bcrypt.compare(passwordToCheck, this.passwordHash);
};

// Remove password hash from response
userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.passwordHash;
  return user;
};

module.exports = mongoose.model('User', userSchema);
