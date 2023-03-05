var mongoose = require('mongoose');

var inquiryForm = new mongoose.Schema({

  name: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  fbLink: {
    type: String,
    required: true,
  },
  childName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  program: {
    type: String,
    required: true,
  },
  inquiry: {
    type: String,
    required: true,
  },
  
});

module.exports = mongoose.model('inquiryForms', inquiryForm);