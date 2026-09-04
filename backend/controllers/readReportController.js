const mongoose = require('mongoose');
const Report = require('../models/Report');

// GET /api/reports
// Supports: ?search=...&district=...&riskLevel=...&status=...
exports.getReports = async (req, res) => {
  try {
    const { search, district, riskLevel, status } = req.query;
    const query = {};

    // Apply filters
    if (district) {
      query.district = district;
    }

    if (riskLevel) {
      query.riskLevel = riskLevel;
    }

    if (status) {
      query.status = status;
    }

    // Apply case-insensitive search across text fields
    if (search) {
      const searchRegex = new RegExp(search, 'i');
      query.$or = [
        { area: searchRegex },
        { locationType: searchRegex },
        { description: searchRegex },
        { district: searchRegex },
      ];
    }

    const reports = await Report.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: reports.length,
      data: reports,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve reports. Please try again.',
    });
  }
};

// GET /api/reports/:id
exports.getReportById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID',
      });
    }

    const report = await Report.findById(id);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: 'Report not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: report,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to retrieve the report. Please try again.',
    });
  }
};
