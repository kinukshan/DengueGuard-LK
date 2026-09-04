const express = require('express');
const { getReports, getReportById } = require('../controllers/readReportController');

const router = express.Router();

router.get('/', getReports);
router.get('/:id', getReportById);

module.exports = router;
