var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');
var userAccount = new mongoose.Schema({

    email: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userType: {
        type: String,
    },
    username: {
        type: String,
    }

});
userAccount.plugin(passportLocalMongoose);
module.exports = mongoose.model('userAccounts', userAccount);
