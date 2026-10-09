const express = require('express');
const Progress = require('../models/Progress');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get user progress
router.get('/user', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.userId }).sort({ updatedAt: -1 });
    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get progress for specific algorithm
router.get('/algorithm/:algorithmId', authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOne({
      userId: req.userId,
      algorithmId: req.params.algorithmId
    });
    res.json(progress || { message: 'No progress yet' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create or update progress
router.post('/update', authMiddleware, async (req, res) => {
  try {
    const { algorithmId, algorithmName, category, attempts, correctAttempts, timeSpentSeconds, score, completed, quizAnswers } = req.body;

    let progress = await Progress.findOne({
      userId: req.userId,
      algorithmId
    });

    if (!progress) {
      progress = new Progress({
        userId: req.userId,
        algorithmId,
        algorithmName,
        category
      });
    }

    progress.attempts = attempts;
    progress.correctAttempts = correctAttempts;
    progress.timeSpentSeconds = timeSpentSeconds;
    progress.score = score;
    progress.completed = completed;
    progress.lastAttemptAt = new Date();
    
    if (quizAnswers) {
      progress.quizAnswers = [...(progress.quizAnswers || []), ...quizAnswers];
    }

    if (completed && !progress.completedAt) {
      progress.completedAt = new Date();
      
      // Update user stats
      const user = await User.findById(req.userId);
      user.patternsCompleted = (user.patternsCompleted || 0) + 1;
      user.totalScore = (user.totalScore || 0) + score;
      await user.save();
    }

    await progress.save();

    // Log activity
    await Activity.create({
      userId: req.userId,
      action: completed ? 'algorithm_completed' : 'algorithm_started',
      details: { algorithmId, algorithmName }
    });

    res.json(progress);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit quiz answers
router.post('/quiz/submit', authMiddleware, async (req, res) => {
  try {
    const { algorithmId, answers } = req.body;

    let progress = await Progress.findOne({
      userId: req.userId,
      algorithmId
    });

    if (!progress) {
      return res.status(404).json({ error: 'Progress not found' });
    }

    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = Math.round((correctCount / answers.length) * 100);

    progress.quizAnswers = [...(progress.quizAnswers || []), ...answers];
    progress.attempts = (progress.attempts || 0) + 1;
    progress.correctAttempts = (progress.correctAttempts || 0) + correctCount;
    progress.score = score;
    progress.lastAttemptAt = new Date();

    if (score >= 80) {
      progress.completed = true;
      progress.completedAt = new Date();

      const user = await User.findById(req.userId);
      user.patternsCompleted = (user.patternsCompleted || 0) + 1;
      user.totalScore = (user.totalScore || 0) + score;
      await user.save();
    }

    await progress.save();

    await Activity.create({
      userId: req.userId,
      action: 'quiz_submitted',
      details: { algorithmId, score, correctCount, totalQuestions: answers.length }
    });

    res.json({ score, correctCount, totalQuestions: answers.length, progress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
