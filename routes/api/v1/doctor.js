// required libraries
const express = require('express');

const router = express.Router();
const docAPI = require('../../../controllers/api/doc_api');

router.post('/register',docAPI.register);
router.post('/login',docAPI.login);
module.exports = router;