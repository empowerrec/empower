var mongoose = require('mongoose');
var VacancySchema = mongoose.Schema({
    Employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    Category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    Industry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Industry'
    },
    HotJobFlag: { type: Boolean },
    AvailableFrom: { type: Date },
    AvailableTo: { type: Date },
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
    EducationalLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EducationalLevel'
    },
    CareerLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CareerLevel'
    },
    SalaryRangeFrom: { type: Number },
    SalaryRangeTo: { type: Number },
    SalaryCurancy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Curancy'
    },
    SalaryType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SalaryType'
    },
    JobType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobType'
    }, 
    JobRole: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobRole'
    },   
    JobDescription: { type: String },
    JobTitle: { type: String },
    JobRequirements: { type: String },
    RequiredExperience  : { type: Number },
    Position : { type: String }   , 
    
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



var Vacancy = mongoose.model('Vacancy', VacancySchema);

function createDefaultVacancies() {    
    Vacancy.find({}).exec(function (err, col) {
        if (col.length === 0) {
            Vacancy.create({
                Employer : "5700e4ad2b9cc7982e72d1e9",
                Type: 'Full Time',
                Salary: 5000,
                JobDescription: "Ugent Senior .Net Developer Needed",
                JobTitle: "Senior .net developer" ,
                EducationalLevel: "5707dd5a59e12bf8047383da",
                AvailableFrom: "01/05/2016",
                AvailableTo: "05/05/2016",
                Deleted: false
            }, function (errr) {
                if (!errr) {
                    Vacancy.remove({}).exec();
                }                
            });
        }
    });
}

exports.createDefaultVacancies = createDefaultVacancies;