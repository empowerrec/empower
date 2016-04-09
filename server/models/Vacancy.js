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
        Type: {type: String, enum: vacancyTypes},
        AvailableFrom: {type: Date},
        AvailableTo: {type: Date},
        WorkPlace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'
        },
        PreferredEducationLevel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'EducationLevel'
        },
        Salary: {type: Number},
        JobDescription: {type: String},
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


var Vacancy = mongoose.model('Vacancy', vacancySchema);

function createDefaultVacancies() {
    Vacancy.find({}).exec(function (err, col) {
        if (col.length === 0) {
        }
    });
}

exports.createDefaultVacancies = createDefaultVacancies;