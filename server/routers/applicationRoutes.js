const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// @route   POST /api/applications
// @desc    Apply for a job
router.post('/', authMiddleware, applicationController.applyForJob);

// @route   GET /api/applications/my
// @desc    View my applications
router.get('/my', authMiddleware, applicationController.getMyApplications);

// @route   GET /api/applications/job/:jobId
// @desc    View applicants for a specific job (Admin only)
router.get('/job/:jobId', authMiddleware, adminMiddleware, applicationController.getJobApplicants);

// @route   GET /api/applications/all
// @desc    View globally tracked applications across all sectors (Admin)
router.get('/all', authMiddleware, adminMiddleware, applicationController.getAllApplications);

// @route   DELETE /api/applications/:id
// @desc    Cancel/withdraw an application (User)
router.delete('/:id', authMiddleware, applicationController.cancelApplication);

module.exports = router;
