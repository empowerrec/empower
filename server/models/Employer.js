var mongoose = require('mongoose');

var employerSchema = mongoose.Schema({
        User: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        Industry: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Industry'
        },
        EmployerName: [{
            Lang: String,
            Text: String
        }]
        ,
        Address: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address'

        }],
        EmployerType: {
            type: String
        },
        NumberOfEmployees: {
            type: Number
        },
        AverageNumberOfJobOpeningsPerMonth: {
            type: Number
        },
        ContactFirstName: {type: String},
        ContactLastName: {type: String},
        ContactTitle: {type: String},
        ContactMobileNumber: {type: String},
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

var Employer = mongoose.model('Employer', employerSchema);

function createDefaultEmployers() {
    Employer.find({}).exec(function (err, col) {
        if (col.length === 0) {

            Employer.create({
                EmployerType: 'D',
                NumberOfEmployees: 5000,
                AverageNumberOfJobOpeningsPerMonth: 50
            });

            Employer.create({
                EmployerType: 'S',
                NumberOfEmployees: 10,
                AverageNumberOfJobOpeningsPerMonth: 1
            });
        }
    });
}

exports.createDefaultEmployers = createDefaultEmployers;
