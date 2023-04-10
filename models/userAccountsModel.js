var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var userAccount = new mongoose.Schema({


    firstName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    userType: {
        type: String,
    },
    password: {
        type: String,
    },
    username:{
        type: String,
        required: true
    }

});
userAccount.plugin(passportLocalMongoose);
module.exports = mongoose.model('userAccounts', userAccount);
