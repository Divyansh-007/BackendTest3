// required libraries
const express = require('express');

const router = express.Router();

router.use('/home',require('./home'));

router.use('/doctor',require('./doctor'));

router.use('/patients',require('./patient'));

module.exports = router;