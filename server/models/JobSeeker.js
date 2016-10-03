var mongoose = require('mongoose');

var genders = 'Male,Female'.split(',');
var educationLevels = 'Illiterate,Student,Technician,' +
    'Associates,Bachelor of Science,Bachelor of Business Administration,' +
    'Bachelor of Arts,Juris Doctorate,Master of Science,Master of Arts,' +
    'Medical Doctor,Master of Business (MBA),Master of Fine Arts (MFA),' +
    'PhD,Other'.split(',');
var preferredWorks = 'Full Time,Part Time,Temporary,Any'.split(',');
var graduationGrades = 'Very Goog,Good'.split(',');

var jobSeekerSchema = mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    Gender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Gender'
    },
    FirstName: { type: String },
    MiddleName: { type: String },
    LastName: { type: String },
    BirthDate: { type: Date },
    MaritalStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaritalStatus'
    },
    MilitaryStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MilitaryStatus'
    },
    HasACar: { type: Boolean },
    CarLicenceType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarLicenceType'
    },
    Address: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        }],
    FacebookAcount: String ,
    TwitterAcount: String ,
    LinkedinAccount: String ,
    Email : String ,
    MobileNo : String ,
    
    EducationalInformation: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EducationalInformation'
        }],
    Courses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }], 
    Experiances: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experiance'
        }],
    Skills: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill'
        }],
    ExpectedSalary: Number,
    PeriodOfEnrollment : Number,
    MoreInformation : String,
    ResumeLink: { type: String },
    ExperienceLevel: {
        type: Number
    },
    MostRecentEmployer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    MostRecentJobTitle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobTitle'
    },
    JobCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    PreferredJobCategory: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        }],
    EducationLevel: { type: String, enum: educationLevels },
    SchoolName: { type: String },
    GraduationGrade: { type: String, enum: graduationGrades },
    LanguageSpoken: [{ type: String }],
    SalaryPreference: { type: Number },
    PreferredWork: { type: String, enum: preferredWorks },    
    PreferredCountryOfWork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    PreferredCityOfWork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    Reference1: { type: String },
    Reference1Contact: { type: String },
    Reference2: { type: String },
    Reference2Contact: { type: String },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, Deleted : Boolean  ,   
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},
    {
    timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
});


var JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

function createDefaultJobSeekers() {
    JobSeeker.find({}).exec(function (err, col) {
        if (col.length === 0) {
            
            JobSeeker.create({
                Deleted : false,
                Gender: 'Male'
            });
            
            JobSeeker.create({
                Deleted : false,
                Gender: 'Female'
            });
        }
    });
}

exports.createDefaultJobSeekers = createDefaultJobSeekers;