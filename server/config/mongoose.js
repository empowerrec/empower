var mongoose = require('mongoose');
var userModel = require('../models/User');
var courseModel = require('../models/Course');
var employerModel = require('../models/Employer');
var categoryModel = require('../models/Category');
var jobSeekerModel = require('../models/JobSeeker');
var vacancyModel = require('../models/Vacancy');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();
    employerModel.createDefaultEmployers();
    categoryModel.createDefaultCategories();
    jobSeekerModel.createDefaultJobSeekers();
    vacancyModel.createDefaultVacancies();
};
