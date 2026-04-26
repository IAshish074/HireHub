const Job = require('../models/Job');
const User = require('../models/User');
const Application = require('../models/Application');

// 🔹 Get Platform Statistics (Admin Only)
exports.getPlatformStats = async (req, res, next) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalUsers = await User.countDocuments({ role: 'user' });
    const totalApplications = await Application.countDocuments();

    res.status(200).json({
      totalJobs,
      totalUsers,
      totalApplications
    });
  } catch (error) {
    next(error);
  }
};
// 🔹 Get All Users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ users });
  } catch (error) {
    next(error);
  }
};

// 🔹 Delete User
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if trying to delete admin
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Cannot delete admin users' });
    }

    // Delete user's applications
    await Application.deleteMany({ user: user._id });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
};
