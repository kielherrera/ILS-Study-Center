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
    //Student Information
    nickName: {
        type: String
    }, 
    birthDate: {
        type: Date
    }, 
    age: {
        type: String
    }, 
    gender: {
        type: String
    }, 
    phoneNumber: {
        type: String
    }, 
    address: {
        type: String
    }, 
    nationality: {
        type: String
    }, 
    primaryLanguage: {
        type: String
    }, 
    religion: {
        type: String
    },

    //Family Information
    motherName: {
        type: String
    }, 
    fatherName: {
        type: String
    },
    motherOccupation: {
        type: String
    }, 
    fatherOccupation: {
        type: String
    }, 
    motherPhoneNo: {
        type: String
    }, 
    fatherPhoneNo: {
        type: String
    }, 
    ordinality: {
        type: String
    },

    siblings: [{siblingName:String, siblingAge:String, siblingContactInfo:String, siblingGender: String}],

    //Emergency Contact
    name1: {
        type: String
    }, 
    name2: {
        type: String
    }, 
    relationship1: {
        type: String
    }, 
    relationship2: {
        type: String
    }, 
    phoneNumber1: {
        type: String
    }, 
    phoneNumber2: {
        type: String
    }

});
module.exports = mongoose.model('studentAccounts', studentAccount);