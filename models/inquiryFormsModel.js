var mongoose = require('mongoose');

var inquiryForm = new mongoose.Schema({
  name: {
    type: String,
  },
  childName: {
    type: String,
  },
  age: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  fbLink: {
    type: String,
  },
  gender: {
    type: String,
  },
  program: {
    type: String,
  },
  concern1: {
    type: String,
  },
  concern2: {
    type: String,
  },
  inquiry: {
    type: String,
  },
  inquiryDate: {
    type: Date
  }
    
});

module.exports = mongoose.model('inquiryForms', inquiryForm);