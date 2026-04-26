const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// @route   GET /api/admin/stats
// @desc    Get dashboard metrics for platform analysis
router.get('/stats', authMiddleware, adminMiddleware, adminController.getPlatformStats);

// @route   GET /api/admin/users
// @desc    Get all users for platform administration
router.get('/users', authMiddleware, adminMiddleware, adminController.getAllUsers);

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
router.delete('/users/:id', authMiddleware, adminMiddleware, adminController.deleteUser);

module.exports = router;
