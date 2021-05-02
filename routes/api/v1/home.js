// required libraries
const express = require('express');

const router = express.Router();
const homeAPI = require('../../../controllers/api/home_api');

router.get('/',homeAPI.index);

module.exports = router;