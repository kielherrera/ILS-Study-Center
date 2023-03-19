const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const myUserSchema = mongoose.Schema({
    username: String,
    password: String
});

myUserSchema.plugin(passportLocalMongoose);

module.exports = new mongoose.model("User", myUserSchema);