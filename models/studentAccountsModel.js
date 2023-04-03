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
    
    classes: [{_id:String, className: String, teacherAssigned: String, section:String, startTime:String, endTime:String}],

    studentInfo: [{nickName: String, birthDate: Date, age: String, gender: String, phoneNumber: String, address: String, nationality: String, primaryLanguage: String, religion: String}],
    
    emergencyContact: [{name1: String, name2: String, relationship1: String, relationship2: String, phoneNumber1: String, phoneNumber2: String}]

});
module.exports = mongoose.model('studentAccounts', studentAccount);