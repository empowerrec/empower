var mongoose = require('mongoose');
var roleModel = require('../models/Role');
var userModel = require('../models/User');
var courseModel = require('../models/Course');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    roleModel.createDefaultRoles(userModel.createDefaultUsers);
    courseModel.createDefaultCourses();
};
