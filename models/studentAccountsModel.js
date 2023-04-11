var mongoose = require('mongoose');
var studentAccount = new mongoose.Schema({


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
    
    classes: [{_id:String, className: String, teacherAssigned: String, section:String, classProgram:String, startTime:String, endTime:String}],
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
    },

    //Child's Health Information
    question1: {
        type: String
    },
    question2: {
        type: String
    },
    question2_1: {
        type: String
    },
    question3: {
        type: String
    },
    question3_1: {
        type: String
    },


    //Child's Physician Information
    question4: {
        type: String
    },
    question5: {
        type: String
    },
    question6: {
        type: String
    },

    //Child's Personal Background

    question7: {
        type: String
    },
    question8: {
        type: String
    },
    question9: {
        type: String
    },
    question9_1: {
        type: String
    },
    question10: {
        type: String
    },
    question10_1: {
        type: String
    },
    question11: {
        type: String
    },
    question11_1: {
        type: String
    },
    question12: {
        type: String
    },
    question13: {
        type: String
    },
    question14: {
        type: String
    },
    question15: {
        type: String
    },
    question16: {
        type: String
    },
    question17: {
        type: String
    },
    question18: {
        type: String
    },
    question19: {
        type: String
    },
    question20: {
        type: String
    },
    question21: {
        type: String
    },
    question22: {
        type: String
    }

});
module.exports = mongoose.model('studentAccounts', studentAccount);