var mongoose = require('mongoose');

var genders = 'Male,Female'.split(',');
var educationLevels = 'Illiterate,Student,Technician,' +
    'Associates,Bachelor of Science,Bachelor of Business Administration,' +
    'Bachelor of Arts,Juris Doctorate,Master of Science,Master of Arts,' +
    'Medical Doctor,Master of Business (MBA),Master of Fine Arts (MFA),' +
    'PhD,Other'.split(',');
var preferredWorks = 'Full Time,Part Time,Temporary,Any'.split(',');

var jobSeekerSchema = mongoose.Schema({
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Gender: {type: String, enum: genders},
        BirthDate: {type: Date},
        Address: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        },
        ResumeLink: {type: String},
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
        EducationLevel: {type: String, enum: educationLevels},
        SchoolName: {type: String},
        GradeOfGraduation: {type: String},
        LanguageSpoken: [{type: String}],
        SalaryPreference: {type: Number},
        PreferredWork: {type: String, enum: preferredWorks},
        PreferredCityOfWork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City'
        },
        PreferredCountryOfWork: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        },
        Reference1: {type: String},
        Reference1Contact: {type: String},
        Reference2: {type: String},
        Reference2Contact: {type: String},
        ModifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        CreatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: {createdAt: 'CreatedAt', updatedAt: "UpdatedAt"}
    });


var JobSeeker = mongoose.model('JobSeeker', jobSeekerSchema);

function createDefaultJobSeekers() {
    JobSeeker.find({}).exec(function (err, col) {
        if (col.length === 0) {

            JobSeeker.create({
                Gender: 'Male'
            });

            JobSeeker.create({
                Gender: 'Female'
            });
        }
    });
}

exports.createDefaultJobSeekers = createDefaultJobSeekers;