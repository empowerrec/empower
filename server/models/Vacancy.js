var mongoose = require('mongoose');
var vacancyTypes = 'Full Time,Part Time,Temporary,Any'.split(',');
var vacancySchema = mongoose.Schema({
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
        
        AvailableFrom: {type: Date},
        AvailableTo: {type: Date},
        Country: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Country'
    },
    City: { type: String },
    Area: { type: String },
        PreferredEducationLevel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EducationLevel'
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
        timestamps: {createdAt: 'CreatedAt', updatedAt: "UpdatedAt"}
    });



var Vacancy = mongoose.model('Vacancy', vacancySchema);

function createDefaultVacancies() {
    Vacancy.find({}).exec(function (err, col) {
        if (col.length === 0) {


            Vacancy.create({
                Employer : "5700e4ad2b9cc7982e72d1e9",
                Type: 'Full Time',
                Salary: 5000,
                JobDescription:"Ugent Senior .Net Developer Needed",
                JobTitle:"Senior .net developer" ,
                PreferredEducationLevel:"5707dd5a59e12bf8047383da",
                AvailableFrom:"01/05/2016",
                AvailableTo:"05/05/2016"
            });

            Vacancy.create({
                Employer : "5700e4ad2b9cc7982e72d1e9",
                Type: 'Full Time',
                Salary: 3000,
                JobDescription:"Junior  .Net Developer Needed",
                JobTitle:"Juior .net developer",
                PreferredEducationLevel:"5707dd5a59e12bf8047383da",
                AvailableFrom:"01/05/2016",
                AvailableTo:"15/05/2016"
            });
    }
  });

}

exports.createDefaultVacancies = createDefaultVacancies;