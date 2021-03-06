var mongoose = require('mongoose');
var userModel = require('../models/User');
var courseModel = require('../models/Course');
var languageSkillModel = require('../models/LanguageSkill');
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
var referenceRelationshipModel = require('../models/ReferenceRelationship');

var addressModel = require('../models/Address');
var religionModel = require('../models/Religion');
var visaStatusModel = require('../models/VisaStatus');
var genderModel = require('../models/Gender');
var hearAboutUsModel = require('../models/HearAboutUs');
var contactViaModel = require('../models/ContactVia');
var maritalStatusModel = require('../models/MaritalStatus');
var militaryStatusModel = require('../models/MilitaryStatus');
var carLicenceTypeModel = require('../models/CarLicenceType');
var educationalInformatioModel = require('../models/EducationalInformation');
var univirstyModel = require('../models/Univirsty');
var facultyModel = require('../models/Faculty');
var specializationModel = require('../models/Specialization');
var gradeModel = require('../models/Grade');
var featureModel = require('../models/Feature');
var packageFeatureModel = require('../models/PackageFeature');
var packageCostModel = require('../models/PackageCost');
var userPackageModel = require('../models/UserPackage');
var userFeatureModel = require('../models/UserFeature');
var trainingCenterModel = require('../models/TrainingCenter');
var experianceModel = require('../models/Experiance');
var companyTypeModel = require('../models/CompanyType');
var companySizeModel = require('../models/CompanySize');
var positionModel = require('../models/Position');
var skillTypeModel = require('../models/SkillType');
var skillLevelsModel = require('../models/SkillLevel');
var skillModel = require('../models/Skill');
var langaugeLevelsModel = require('../models/LanguageLevel');
var nationalityModel = require('../models/Nationality');
var applicant = require('../models/Applicant');
var packageModel = require('../models/Package');
var questionModel = require('../models/Question');
var subUserInvitationModel = require('../models/SubUserInvitation');
var subUserInvitationDetailModel = require('../models/SubUserInvitationDetail');
var subUserFeatureModel = require('../models/SubUserFeature');
var travelPreferenceModel = require('../models/TravelPreference');
module.exports = function (config) {
	mongoose.connect(config.db);
	
	//mongoose.connect(config.db, function (err) {
	//    if (err) throw err;
	//});
	
	var db = mongoose.connection;
	db.on('error', function (err) {
		console.log(err);
		console.error.bind(console, 'connection error...');
	});
	db.once('open', function callback() {
		console.log('empower db opened');
	});
	
	userModel.createDefaultUsers();
	courseModel.createDefaultCourses();
	languageSkillModel.createDefaultLanguageSkills();
	employerModel.createDefaultEmployers();
	categoryModel.createDefaultCategories();
	jobSeekerModel.createDefaultJobSeekers();
	vacancyModel.createDefaultVacancies();
	industryModel.createDefaultIndustry();
    subUserInvitationModel.createDefaultSubUserInvitation();
    subUserInvitationDetailModel.createDefaultSubUserInvitationDetail();
    subUserFeatureModel.createDefaultSubUserFeatures();
	jobTypeModel.createDefaultJobTypes();
	innerPageModel.createDefaultInnerPages();
	languageModel.createDefaultLanguages();
	countryModel.createDefaultCountries();
	careerLevelModel.createDefaultCareerLevels();
	curancyModel.createDefaultCurancies();
	salaryTypeModel.createDefaultSalaryTypes();
	jobRoleModel.createDefaultJobRoles();
	cityModel.createDefaultCities();
	areaModel.createDefaultAreas();
    addressModel.createDefaultAddresss();
    religionModel.createDefaultReligions();
    visaStatusModel.createDefaultVisaStatuss();
    genderModel.createDefaultGenders();
    hearAboutUsModel.createDefaultHearAboutUss();
    contactViaModel.createDefaultContactVias();
	maritalStatusModel.createDefaultMaritalStatuss();
	militaryStatusModel.createDefaultMilitaryStatuss();    
	carLicenceTypeModel.createDefaultCarLicenceTypes();    
	educationalInformatioModel.createDefaultEducationalInformations();
	univirstyModel.createDefaultUnivirsties();
	facultyModel.createDefaultFaculties();
	specializationModel.createDefaultSpecializations();
	gradeModel.createDefaultGrades();
	featureModel.createDefaultFeatures();
	packageFeatureModel.createDefaultPackageFeatures();
    packageCostModel.createDefaultPackageCosts();
    userPackageModel.createDefaultUserPackages();
    userFeatureModel.createDefaultUserFeatures();
	trainingCenterModel.createDefaultTrainingCenters();    
	companyTypeModel.createDefaultCompanyTypes();
	companySizeModel.createDefaultCompanySizes();
	positionModel.createDefaultPositions();
	experianceModel.createDefaultExperiances();    
	skillTypeModel.createDefaultSkillTypes();
	skillLevelsModel.createDefaultSkillLevels();
	langaugeLevelsModel.createDefaultLanguageLevels();
	skillModel.createDefaultSkills();
	educationalLevelModel.createDefaultEducationalLevels();
	packageModel.createDefaultPackages();
    questionModel.createDefaultQuestions();
    nationalityModel.createDefaultNationalities();
    referenceRelationshipModel.createDefaultReferenceRelationships();
    travelPreferenceModel.createDefaultTravelPreferences();

};
