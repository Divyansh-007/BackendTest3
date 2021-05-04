// required library
const express = require('express');

const router = express.Router();

// api routing
router.use('/api',require('./api/index'));

module.exports = router;