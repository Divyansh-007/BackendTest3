// required library
const express = require('express');

const router = express.Router();
const homeController = require('../controllers/homeController');

// home page routing
router.get('/',homeController.home);

// api routing
router.use('/api',require('./api/index'));

module.exports = router;