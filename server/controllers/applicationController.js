const Application = require('../models/Application');
const Job = require('../models/Job');

// 🔹 Apply for Job
exports.applyForJob = async (req, res, next) => {
  try {
    const { jobId } = req.body;
    const userId = req.user.id; // from authMiddleware

    // Check if Job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // Checking if User already applied
    const existingApp = await Application.findOne({ user: userId, job: jobId });
    if (existingApp) {
      return res.status(400).json({ message: "You have already applied for this position." });
    }

    // Save Application
    const application = new Application({
      user: userId,
      job: jobId
    });
    
    await application.save();

    res.status(201).json({ message: "Successfully applied!", application });
  } catch (error) {
    next(error); 
  }
};

// 🔹 View Own Applications (User)
exports.getMyApplications = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const applications = await Application.find({ user: userId })
                                          .populate('job')
                                          .sort({ createdAt: -1 });

    res.status(200).json({ applications, count: applications.length });
  } catch (error) {
    next(error);
  }
};

// 🔹 View Applicants for a Job (Admin)
exports.getJobApplicants = async (req, res, next) => {
  try {
    const { jobId } = req.params;
    
    // Will run behind adminMiddleware, yielding all candidate profiles mapped to this job ID
    const applications = await Application.find({ job: jobId })
                                          .populate('user', '-password') 
                                          .sort({ createdAt: -1 });

    res.status(200).json({ applications, count: applications.length });
  } catch (error) {
    next(error);
  }
};

// 🔹 View All Applications (Admin - Global)
exports.getAllApplications = async (req, res, next) => {
  try {
    const applications = await Application.find()
      .populate('user', 'name email')
      .populate('job', 'title company location')
      .sort({ createdAt: -1 });

    res.status(200).json({ applications, count: applications.length });
  } catch (error) {
    next(error);
  }
};

// 🔹 Cancel/Withdraw Application (User)
exports.cancelApplication = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id; // from authMiddleware

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Ensure the user owns the application
    if (application.user.toString() !== userId) {
      return res.status(403).json({ message: "Not authorized to cancel this application" });
    }

    await Application.findByIdAndDelete(id);

    res.status(200).json({ message: "Application cancelled successfully" });
  } catch (error) {
    next(error);
  }
};
