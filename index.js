// using express js framework
const express = require('express');

// port for running
const port = process.env.PORT || 8000;

// app intialization
const app = express();

// for database
const db = require('./config/mongoose');

// for authentication using passport.js
const passport = require('passport');
// jwt strategy
const passportJwt = require('./config/passport-jwt-strategy');

// to use encoded input data
app.use(express.urlencoded());

// for using static assets files
app.use(express.static('./assets'));

// using ejs as view engine
app.set('view engine','ejs');

// use (main) express router
app.use('/',require('./routes/index'));

// checking the server
app.listen(port,function(err){
    if(err){console.log(`Error in running the server: ${err}`);}

    console.log(`Express server is up and running on port: ${port}`);
});