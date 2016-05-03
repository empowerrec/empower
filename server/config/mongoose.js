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
var areaModel = require('../models/Area');

var careerLevelModel = require('../models/CareerLevel');
var curancyModel = require('../models/Curancy');
var salaryTypeModel = require('../models/SalaryType');
var jobTypeModel = require('../models/JobType');
var jobRoleModel = require('../models/JobRole');

var addressModel = require('../models/Address');
var genderModel = require('../models/Gender');
var maritalStatusModel = require('../models/MaritalStatus');
var militaryStatusModel = require('../models/MilitaryStatus');
var carLicenceTypeModel = require('../models/CarLicenceType');

var educationalInformatioModel = require('../models/EducationalInformation');
var educationTypeModel = require('../models/EducationType');
var univirstyModel = require('../models/Univirsty');
var specializationModel = require('../models/Specialization');
var gradeModel = require('../models/Grade');
var trainingCenterModel = require('../models/TrainingCenter');

var experianceModel = require('../models/Experiance');
var companyTypeModel = require('../models/CompanyType');
var companySizeModel = require('../models/CompanySize');
var positionModel = require('../models/Position');

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
    countryModel.createDefaultCountries();
    careerLevelModel.createDefaultCareerLevels();
    curancyModel.createDefaultCurancies();
    salaryTypeModel.createDefaultSalaryTypes();
    jobTypeModel.createDefaultJobTypes();
    jobRoleModel.createDefaultJobRoles();
    cityModel.createDefaultCities();
    areaModel.createDefaultAreas();
    addressModel.createDefaultAddresss();
    genderModel.createDefaultGenders();
    maritalStatusModel.createDefaultMaritalStatuss();
    militaryStatusModel.createDefaultMilitaryStatuss();
    
    carLicenceTypeModel.createDefaultCarLicenceTypes();
    
    educationalInformatioModel.createDefaultEducationalInformations();
    educationTypeModel.createDefaultEducationTypes();
    univirstyModel.createDefaultUnivirsties();
    specializationModel.createDefaultSpecializations();
    gradeModel.createDefaultGrades();
    trainingCenterModel.createDefaultTrainingCenters();
    
    companyTypeModel.createDefaultCompanyTypes();
    companySizeModel.createDefaultCompanySizes();
    positionModel.createDefaultPositions();

    experianceModel.createDefaultExperiances();


};
