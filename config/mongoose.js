//required library
const mongoose = require('mongoose');

// connecting to the database
// mongoose.connect(!! Your MongoDB database connection URL !!);
mongoose.connect('mongodb+srv://jswdb:jswdb@cluster0.loco6.mongodb.net/hspoital-api');

const db = mongoose.connection;

// checking connection
db.on('error',console.error.bind('error!!'));

db.once('open',function(){
    console.log('Successfully connected to database :: MongoDB');
});

module.exports = db;