var mongoose = require('mongoose');

const enrollmentInformation = new mongoose.Schema({
    totalEnrolled :{
        type: String
    },

    playDateEnrolled: {
        type: String
    },

    tutorEnrolled :{
        type: String
    }
});

module.exports = mongoose.model('enrollmentInformation', enrollmentInformation);