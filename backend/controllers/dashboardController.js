const Report = require('../models/Report');

// GET /api/dashboard/stats
exports.getDashboardStats = async (req, res) => {
  try {
    const totalReports = await Report.countDocuments();
    const highRisk = await Report.countDocuments({ riskLevel: 'High' });
    const pending = await Report.countDocuments({ status: 'Pending' });
    const inProgress = await Report.countDocuments({ status: 'In Progress' });
    const resolved = await Report.countDocuments({ status: 'Resolved' });

    return res.status(200).json({
      success: true,
      data: {
        totalReports,
        highRisk,
        pending,
        inProgress,
        resolved,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to load dashboard statistics. Please try again.',
    });
  }
};
