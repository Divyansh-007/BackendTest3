// required libraries
const express = require('express');

const router = express.Router();
const homeAPI = require('../../../controllers/api/home_api');

// home routing
router.get('/',homeAPI.index);

// all reports of all patients with a specific status  
router.get('/reports/:status',homeAPI.allReports);

// all reports of a patient
router.get('/patients/:id/all_reports',homeAPI.patientAllReports);

module.exports = router;