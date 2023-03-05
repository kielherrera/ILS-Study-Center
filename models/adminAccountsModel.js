var mongoose = require('mongoose');

var adminAccount = new mongoose.Schema({

    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('adminAccounts', adminAccount);