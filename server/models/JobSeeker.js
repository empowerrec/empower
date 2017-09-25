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
    ContactVia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ContactVia'
    }, Religion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Religion'
    },
    FirstName: { type: String },
    MiddleName: { type: String },
    LastName: { type: String },
    BirthDate: { type: Date },
    MaritalStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MaritalStatus'
    }, VisaStatus: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VisaStatus'
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
    DrivingLicenseIssuedIn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
    },
    Address: [{
        Country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        },

        City: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City'
        },
        Area: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Area'
        },
        AddressLine1: String,
        AddressLine2: String,
        Current: Boolean,
        JobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobSeeker'
        }
    }],
    Interests: [{        
        Interest: String
    }],
    MembershipsAndAwards: [{
        Membership: String,
        HonorAndAward: String,
    }],
    FacebookAcount: String,
    TwitterAcount: String,
    LinkedinAccount: String,
    Email: String,
    MobileNo: String,
    HomePhoneNo: String,

    EducationalInformation: [{
        JobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobSeeker'
        },
        EducationalLevel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EducationalLevel'
        },
        Univirsty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Univirsty'
        },
        Faculty: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Faculty'
        },
        Specialization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Specialization'
        },
        Grade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grade'
        },
        Country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        },
        City: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'City'
        },
        GraduationYear: Number,
        StartYear: Number,
        Description: { type: String },
        Skills: { type: String },
        Current: Boolean
    }],
    Courses: [{
        Title: { type: String },
        TrainingCenter: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'TrainingCenter'
        },
        JobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobSeeker'
        },
        Specialization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Specialization'
        },
        Grade: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Grade'
        },
        CourseYear: Number,
        ModifiedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    Experiances: [{
        Company: String,
        JobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobSeeker'
        },

        CompanySize: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CompanySize'
        },
        CompanyType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CompanyType'
        },
        Country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        },
        Position: {
            type: String
        },
        CompanyWebsite: {
            type: String
        },
        JobRole: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobRole'
        },
        ReportTo: {
            type: String
        },
        Salary: Number,
        TransportAllowance: Number,
        HousingAllowance: Number,
        OtherAllowance: Number,
        Achievements: String,
        FunctionalTasks: String,
        PeriodFrom: { type: Date },
        PeriodTo: { type: Date },
        Current: Boolean
    }],
    ProfessionalCertifications: [{
        CertificationName: String,
        InstitutionName: String,
        DateIssued: { type: Date },
        OverallGradeGPA: Number,
        Summary: String,
        CountryOfExamination: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
        },
        JobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobSeeker'
        }
    }],
    Skills: [{
        JobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobSeeker'
        },
        SkillType: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SkillType'
        },
        SkillLevel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SkillLevel'
        }
    }],

    LanguageSkills: [{
        JobSeeker: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JobSeeker'
        },
        Language: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Language'
        },
        LanguageSkillLevel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LanguageLevel'
        }
    }],
    ExpectedSalary: Number,
    PeriodOfEnrollment: Number,
    MoreInformation: String,
    ResumeLink: { type: String },
    ExperienceLevel: {
        type: Number
    },
    Nationality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nationality'
    },
    SecondNationality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nationality'
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
    PreferredJobTitle: [{ type: String }],
    PreferredCityOfWork: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    PreferredJobCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],

    FirstPreferredIndustry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry'
    },
    SecondPreferredIndustry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry'
    },
    ThirdPreferredIndustry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry'
    },
    FirstPreferredCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    SecondPreferredCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    ThirdPreferredCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    PreferredCareerLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CareerLevel'
    },
    PreferredSalaryCurancy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curancy'
    },
    PreferredSalaryType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalaryType'
    },
    PreferredJobType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobType'
    },
    PreferredJobRole: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobRole'
    }],
    ReferenceFullName: { type: String },
    ReferencePosition: { type: String },
    ReferenceCompany: { type: String },
    ReferenceEmailAddress: { type: String },
    ReferencePhoneNumber: { type: String },
    ReferenceRelationship: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ReferenceRelationship'
    },
    
    Photo: {
        type: String
    },
    CVFile: {
        type: String
    },
    ProfessionalOverviewSummary: {
        type: String
    },
    ProfessionalOverviewTotalYearsOfExperiance: {
        type: Number
    },
    ProfessionalOverviewCareerLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CareerLevel'
    },
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, Deleted: Boolean,
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
                Deleted: false,
                Gender: 'Male'
            });

            JobSeeker.create({
                Deleted: false,
                Gender: 'Female'
            });
        }
    });
}

exports.createDefaultJobSeekers = createDefaultJobSeekers;