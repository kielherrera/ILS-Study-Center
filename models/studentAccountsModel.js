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

    address:{
        type: String
    },

    nickname:{
        type:String
    },

    birthday:{
        type:Date
    },

    phoneNumber:{
        type:String
    },

    nationality:{
        type:String
    },

    religion:{
        type:String
    },

    language:{
        type:String
    },

    motherName:{
        type:String
    },

    motherOccupation:{
        type:String
    },

    motherNumber:{
        type:String
    },

    fatherName:{
        type:String
    },

    fatherOccupation:{
        type:String
    },

    fatherNumber:{
        type:String
    },

    emergencyName:{
        type:String
    },

    emergencyRelationship:{
        type:String
    },

    emergencyNumber:{
        type:String
    }

    
});
module.exports = mongoose.model('studentAccounts', studentAccount);