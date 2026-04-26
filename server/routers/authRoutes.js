const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// @route   POST /api/auth/register
// @desc    Register a new user
router.post('/register', authController.registerUser);

// @route   POST /api/auth/login
// @desc    Authenticate user & get token
router.post('/login', authController.loginUser);

// @route   GET /api/auth/me
// @desc    Get current user profile
const authMiddleware = require('../middleware/authMiddleware');
router.get('/me', authMiddleware, authController.getCurrentUser);

module.exports = router;
