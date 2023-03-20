var mongoose = require('mongoose');

var announcement = new mongoose.Schema({
    dateCreated: {type:String},

    announcementTitle: {type:String},

    announcementText:{type:String}
});

module.exports = mongoose.model('announcement', announcement);