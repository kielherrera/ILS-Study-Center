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
    
    emergencyContact: [{fullName: String, relationshipWithChild: String, contactInformation: String}],

    siblings: [{fullName:String, age:Number, gender:String, contactInformation:String}]

});
module.exports = mongoose.model('studentAccounts', studentAccount);