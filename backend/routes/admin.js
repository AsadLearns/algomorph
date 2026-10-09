const express = require('express');
const User = require('../models/User');
const Progress = require('../models/Progress');
const Activity = require('../models/Activity');
const Algorithm = require('../models/Algorithm');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all users (admin only)
router.get('/users', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const users = await User.find()
      .select('-passwordHash')
      .sort({ createdAt: -1 });
    
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user details with progress (admin only)
router.get('/users/:userId', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-passwordHash');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const progress = await Progress.find({ userId: req.params.userId });
    const activities = await Activity.find({ userId: req.params.userId }).sort({ createdAt: -1 }).limit(50);

    res.json({
      user,
      progress,
      activities,
      stats: {
        totalAttempts: progress.reduce((sum, p) => sum + p.attempts, 0),
        completedPatterns: progress.filter(p => p.completed).length,
        totalTimeSpent: progress.reduce((sum, p) => sum + p.timeSpentSeconds, 0),
        averageScore: progress.length > 0 ? (progress.reduce((sum, p) => sum + p.score, 0) / progress.length).toFixed(2) : 0
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get dashboard summary (admin only)
router.get('/summary', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ isActive: true });
    const totalProgress = await Progress.countDocuments();
    const completedPatterns = await Progress.countDocuments({ completed: true });
    
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('name email createdAt totalScore');
    
    const topUsers = await User.find({ isActive: true })
      .sort({ totalScore: -1 })
      .limit(10)
      .select('name totalScore patternsCompleted');

    const recentActivities = await Activity.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('userId', 'name email');

    const algorithmStats = await Progress.aggregate([
      {
        $group: {
          _id: '$algorithmName',
          attempts: { $sum: '$attempts' },
          completed: { $sum: { $cond: ['$completed', 1, 0] } },
          avgScore: { $avg: '$score' }
        }
      },
      { $sort: { attempts: -1 } }
    ]);

    res.json({
      overview: {
        totalUsers,
        activeUsers,
        totalProgress,
        completedPatterns,
        completionRate: ((completedPatterns / totalProgress) * 100).toFixed(2) + '%'
      },
      recentUsers,
      topUsers,
      recentActivities,
      algorithmStats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user role (admin only)
router.put('/users/:userId/role', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role },
      { new: true }
    ).select('-passwordHash');

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Deactivate user (admin only)
router.put('/users/:userId/deactivate', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { isActive: false },
      { new: true }
    ).select('-passwordHash');

    res.json({ message: 'User deactivated', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get activity logs (admin only)
router.get('/activities/logs', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { days = 7, action } = req.query;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - parseInt(days));

    let query = { createdAt: { $gte: startDate } };
    if (action) query.action = action;

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .populate('userId', 'name email')
      .limit(500);

    res.json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
