// required libraries
const express = require('express');

const port = 8000;

const app = express();

// connecting database
const db = require('./config/mongoose');

// for authentication using passport.js
const passport = require('passport');
// jwt strategy
const passportJwt = require('./config/passport-jwt-strategy');

// // to use encoded input data
// app.use(express.urlencoded());

// // use (main) express router
// app.use('/',require('./routes/index'));

// checking the server
app.listen(port,function(err){
    if(err){console.log(`Error in running the server: ${err}`);}

    console.log(`Express server is up and running on port: ${port}`);
});