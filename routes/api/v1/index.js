// required libraries
const express = require('express');

const router = express.Router();

// home routing
router.use('/home',require('./home'));

// doctor routing
router.use('/doctor',require('./doctor'));

// patient routing
router.use('/patients',require('./patient'));

module.exports = router;