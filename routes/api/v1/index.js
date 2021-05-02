// required libraries
const express = require('express');

const router = express.Router();

router.use('/home',require('./home'));

router.use('/doctor',require('./doctor'));

module.exports = router;