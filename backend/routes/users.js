const express = require('express');
const User = require('../models/User');
const Progress = require('../models/Progress');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const { name, bio, profileImage } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, bio, profileImage },
      { new: true }
    );
    res.json(user.toJSON());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user dashboard stats
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const progressData = await Progress.find({ userId: req.userId });
    
    const stats = {
      user: user.toJSON(),
      totalPatterns: progressData.length,
      completedPatterns: progressData.filter(p => p.completed).length,
      totalScore: user.totalScore,
      currentStreak: user.currentStreak,
      averageAccuracy: progressData.length > 0
        ? (progressData.reduce((sum, p) => sum + (p.correctAttempts / Math.max(p.attempts, 1)), 0) / progressData.length * 100).toFixed(2)
        : 0,
      recentProgress: progressData.slice(-5)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all users (public list)
router.get('/leaderboard', async (req, res) => {
  try {
    const users = await User.find({ isActive: true })
      .select('name totalScore patternsCompleted currentStreak badges createdAt')
      .sort({ totalScore: -1 })
      .limit(100);
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
