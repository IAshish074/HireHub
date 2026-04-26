const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// @route   POST /api/jobs
// @desc    Create a new job
router.post('/', authMiddleware, adminMiddleware, jobController.createJob);

// @route   PUT /api/jobs/:id
// @desc    Update a job
router.put('/:id', authMiddleware, adminMiddleware, jobController.updateJob);

// @route   DELETE /api/jobs/:id
// @desc    Delete a job
router.delete('/:id', authMiddleware, adminMiddleware, jobController.deleteJob);

// @route   GET /api/jobs
// @desc    Get all jobs
router.get('/', jobController.getAllJobs);

// @route   GET /api/jobs/:id
// @desc    Get single job
router.get('/:id', authMiddleware, jobController.getJobById);

module.exports = router;
