var mongoose = require('mongoose');

var adminAccount = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'Teacher', 'Student']
    }
});

module.exports = mongoose.model('adminAccounts', adminAccount);