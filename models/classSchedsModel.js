var mongoose = require('mongoose');

var classSched = new mongoose.Schema({

    className: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true
    },
    teacherAssigned: {
        type: String,
        required: true,
    },
    availableSlots: {
        type: Number,
        required: true
    },
    program: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('classScheds', classSched);