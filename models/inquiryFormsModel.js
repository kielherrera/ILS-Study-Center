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

  },
  fbLink: {
    type: String,

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
  inquiryDate: {
    type: Date
  }
  
});

module.exports = mongoose.model('inquiryForms', inquiryForm);