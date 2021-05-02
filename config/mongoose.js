//required library
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://jswdb:jswdb@cluster0.loco6.mongodb.net/hospital-api');

const db = mongoose.connection;

db.on('error',console.error.bind('error!!'));

db.once('open',function(){
    console.log('Successfully connected to database :: MongoDB');
});

module.exports = db;