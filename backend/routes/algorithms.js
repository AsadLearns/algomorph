const express = require('express');
const Algorithm = require('../models/Algorithm');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

// Get all algorithms
router.get('/', async (req, res) => {
  try {
    const algorithms = await Algorithm.find();
    res.json(algorithms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get algorithm by ID
router.get('/:id', async (req, res) => {
  try {
    const algorithm = await Algorithm.findById(req.params.id);
    if (!algorithm) {
      return res.status(404).json({ error: 'Algorithm not found' });
    }
    res.json(algorithm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get algorithms by category
router.get('/category/:category', async (req, res) => {
  try {
    const algorithms = await Algorithm.find({ category: req.params.category });
    res.json(algorithms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create algorithm (admin only)
router.post('/', authMiddleware, async (req, res) => {
  try {
    if (req.userRole !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const algorithm = new Algorithm(req.body);
    await algorithm.save();
    res.status(201).json(algorithm);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
