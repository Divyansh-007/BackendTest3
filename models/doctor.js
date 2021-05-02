const mongoose = require('mongoose');

const docSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const Doctor = mongoose.model('Doctor',docSchema);

module.exports = Doctor;
