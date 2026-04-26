const Job = require('../models/Job');

// 🔹 Create Job
exports.createJob = async (req, res) => {
  try {
    const job = new Job({ ...req.body, createdBy: req.user.id });
    const savedJob = await job.save();
    res.status(201).json({ message: "Job created successfully", job: savedJob });
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: "Error creating job" });
  }
};

// 🔹 Update Job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
    
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: "Error updating job" });
  }
};

// 🔹 Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedJob = await Job.findByIdAndDelete(id);
    
    if (!deletedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: "Error deleting job" });
  }
};

// 🔹 Get All Jobs (with Search & Filter)
exports.getAllJobs = async (req, res) => {
  try {
    // Both standard and query-specific naming to stay robust
    const keyword = req.query.keyword || req.query.search;
    const type = req.query.type || (req.query.filter !== 'All' ? req.query.filter : null);
    const location = req.query.location;

    let query = {};

    // 1. Search filter by title or company
    if (keyword) {
      query.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } }
      ];
    }

    // 2. Exact match filters
    if (type && type !== 'All') {
      query.type = type;
    }

    if (location) {
      // Allow flexible location typing (e.g. 'remote')
      query.location = { $regex: location, $options: 'i' };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 });

    res.status(200).json({ jobs, count: jobs.length });
  } catch (error) {
    console.error('Get all jobs error:', error);
    res.status(500).json({ message: "Error fetching jobs" });
  }
};

// 🔹 Get Single Job
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error('Get job by id error:', error);
    res.status(500).json({ message: "Error fetching job details" });
  }
};
