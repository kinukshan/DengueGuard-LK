const express = require('express');
const { createReport, updateReport, deleteReport } = require('../controllers/manageReportController');

const router = express.Router();

router.post('/', createReport);
router.put('/:id', updateReport);
router.delete('/:id', deleteReport);

module.exports = router;
