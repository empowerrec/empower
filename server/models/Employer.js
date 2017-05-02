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
    Photo: {
        type: String
    },
    EmployerType: {
        type: String
    },
    NumberOfEmployees: {
        type: Number
    },
    AverageNumberOfJobOpeningsPerMonth: {
        type: Number
    },
    ContactFirstName: { type: String },
    ContactLastName: { type: String },
    ContactTitle: { type: String },
    ContactMobileNumber: { type: String },
    CompanyPhone: { type: String },
    CompanyWebsite: { type: String },
    CompanySize: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanySize'
    },
    Country: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Country'
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

var Employer = mongoose.model('Employer', employerSchema);

function createDefaultEmployers() {
    Employer.find({}).exec(function (err, col) {
        if (col.length === 0) {

            Employer.create({
                Deleted: false,
                EmployerType: 'D',
                NumberOfEmployees: 5000,
                AverageNumberOfJobOpeningsPerMonth: 50
            });

            Employer.create({
                Deleted: false,
                EmployerType: 'S',
                NumberOfEmployees: 10,
                AverageNumberOfJobOpeningsPerMonth: 1
            });
        }
    });
}

exports.createDefaultEmployers = createDefaultEmployers;
