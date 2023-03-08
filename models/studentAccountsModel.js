var mongoose = require('mongoose');

var studentAccount = new mongoose.Schema({

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
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    classes: [{className: String, teacherAssigned: String, section:String, startTime:String, endTime:String}]

});

module.exports = mongoose.model('studentAccounts', studentAccount);