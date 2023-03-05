var mongoose = require('mongoose');

var userAccount = new mongoose.Schema({

    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        required: true,
        enum: ['Student', 'Teacher']
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('userAccounts', userAccount);