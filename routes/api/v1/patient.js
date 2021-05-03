// required libraries
const express = require('express');

const router = express.Router();
const patientAPI = require('../../../controllers/api/patient_api');

router.post('/register',patientAPI.register);

module.exports = router;