// required libraries
const express = require('express');

const router = express.Router();
const homeAPI = require('../../../controllers/api/home_api');

router.get('/',homeAPI.index);
router.get('/reports/:status',homeAPI.allReports);
router.get('/patients/:id/all_reports',homeAPI.patientAllReports);

module.exports = router;