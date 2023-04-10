var mongoose = require('mongoose');

var teacherAccount = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('teacherAccounts', teacherAccount);