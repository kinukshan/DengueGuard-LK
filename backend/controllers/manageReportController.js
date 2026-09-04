const mongoose = require('mongoose');
const Report = require('../models/Report');

const VALID_RISK_LEVELS = ['Low', 'Medium', 'High'];
const VALID_STATUSES = ['Pending', 'In Progress', 'Resolved'];

function validateReportUpdate(data) {
  const errors = [];

  if (data.riskLevel !== undefined && !VALID_RISK_LEVELS.includes(data.riskLevel)) {
    errors.push('Risk level must be Low, Medium, or High.');
  }

  if (data.status !== undefined && !VALID_STATUSES.includes(data.status)) {
    errors.push('Status must be Pending, In Progress, or Resolved.');
  }

  if (data.reporterName !== undefined) {
    const trimmedName = String(data.reporterName).trim();
    if (!trimmedName || trimmedName.length < 2) {
      errors.push('Reporter name must be at least 2 characters long.');
    }
  }

  if (data.area !== undefined) {
    const trimmedArea = String(data.area).trim();
    if (!trimmedArea || trimmedArea.length < 2) {
      errors.push('Area must be at least 2 characters long.');
    }
  }

  if (data.description !== undefined) {
    const trimmedDescription = String(data.description).trim();
    if (!trimmedDescription || trimmedDescription.length < 10) {
      errors.push('Description must be at least 10 characters long.');
    }
  }

  return errors;
}

exports.createReport = async (req, res) => {
  try {
    const { reporterName, district, area, locationType, description, riskLevel } = req.body;

    // Check all required fields are present
    if (!reporterName || !district || !area || !locationType || !description || !riskLevel) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.',
      });
    }

    const validationErrors = validateReportUpdate({
      reporterName,
      area,
      description,
      riskLevel,
    });

    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
      });
    }

    const newReport = await Report.create({
      reporterName: String(reporterName).trim(),
      district: String(district).trim(),
      area: String(area).trim(),
      locationType: String(locationType).trim(),
      description: String(description).trim(),
      riskLevel,
    });

    return res.status(201).json({
      success: true,
      message: 'Report created successfully',
      data: newReport,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report data provided.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to create the report. Please try again.',
    });
  }
};
exports.updateReport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID.',
      });
    }

    const { reporterName, district, area, locationType, description, riskLevel, status } = req.body;

    const updateData = {};

    if (reporterName !== undefined) updateData.reporterName = String(reporterName).trim();
    if (district !== undefined) updateData.district = String(district).trim();
    if (area !== undefined) updateData.area = String(area).trim();
    if (locationType !== undefined) updateData.locationType = String(locationType).trim();
    if (description !== undefined) updateData.description = String(description).trim();
    if (riskLevel !== undefined) updateData.riskLevel = riskLevel;
    if (status !== undefined) updateData.status = status;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid report fields were provided for update.',
      });
    }

    const validationErrors = validateReportUpdate(updateData);
    if (validationErrors.length > 0) {
      return res.status(400).json({
        success: false,
        message: validationErrors[0],
      });
    }

    const existingReport = await Report.findById(id);
    if (!existingReport) {
      return res.status(404).json({
        success: false,
        message: 'Report not found.',
      });
    }

    const updatedReport = await Report.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      success: true,
      message: 'Report updated successfully',
      data: updatedReport,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid report data provided.',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Unable to update the report. Please try again.',
    });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid report ID.',
      });
    }

    const deletedReport = await Report.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({
        success: false,
        message: 'Report not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Report deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to delete the report. Please try again.',
    });
  }
};
