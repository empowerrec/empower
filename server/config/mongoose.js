var mongoose = require('mongoose');
var userModel = require('../models/User');
var courseModel = require('../models/Course');
var employerModel = require('../models/Employer');
var categoryModel = require('../models/Category');
var jobSeekerModel = require('../models/JobSeeker');
var vacancyModel = require('../models/Vacancy');
var educationalLevelModel = require('../models/EducationalLevel');
var industryModel = require('../models/Industry');
var jobTypeModel = require('../models/JobType');

var innerPageModel = require('../models/InnerPage');
var languageModel = require('../models/Language');
var countryModel = require('../models/Country');
var cityModel = require('../models/City');
var careerLevelModel = require('../models/CareerLevel');
var curancyModel = require('../models/Curancy');
var salaryTypeModel = require('../models/SalaryType');
var jobTypeModel = require('../models/JobType');



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
    educationalLevelModel.createDefaultEducationalLevels();
    industryModel.createDefaultIndustry();
    jobTypeModel.createDefaultJobTypes();
    innerPageModel.createDefaultInnerPages();
    languageModel.createDefaultLanguages();
    countryModel.createDefaultCountries(cityModel.createDefaultCities());
    careerLevelModel.createDefaultCareerLevels();
    curancyModel.createDefaultCurancies();
    salaryTypeModel.createDefaultSalaryTypes();
    jobTypeModel.createDefaultJobTypes();
    
    
    
};
