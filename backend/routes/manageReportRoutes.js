const express = require('express');
const { updateReport, deleteReport } = require('../controllers/manageReportController');

const router = express.Router();

router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

module.exports = router;
