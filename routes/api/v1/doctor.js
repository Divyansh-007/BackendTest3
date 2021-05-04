// required libraries
const express = require('express');
const passport = require('passport');

const router = express.Router();
const docAPI = require('../../../controllers/api/doc_api');

// register a new doctor
router.post('/register',docAPI.register);

// login a registered doctor
router.post('/login',docAPI.login);

// creating report of a patient
router.post('/patients/:id/create_report',passport.authenticate(
    'jwt',
    {session: false}
),docAPI.createReport);

module.exports = router;