const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reporterName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    district: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
    locationType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },
    riskLevel: {
      type: String,
      required: true,
      enum: ['Low', 'Medium', 'High'],
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Resolved'],
      default: 'Pending',
    },
  },
  {
    timestamps: true,
  }
);

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;
