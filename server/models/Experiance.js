var mongoose = require('mongoose');

var ExperianceSchema = mongoose.Schema({
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
    City: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    Position: {
        type: String
    },
    Salary: Number,
    Achievements: String,
    FunctionalTasks: String,
    PeriodFrom: { type: Date },
    PeriodTo: { type: Date },
    Current: Boolean,
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

var Experiance = mongoose.model('Experiance', ExperianceSchema);


function createDefaultExperiances() {

    Experiance.find({}).exec(function (err1, col) {
        if (col.length === 0) {

            Experiance.create({
                Deleted: false,
                Salary: 2006, Achievements: "Many Achievements", FunctionalTasks: "Many Tasks "
            });

            Experiance.create({
                Deleted: false,
                Salary: 2007, Achievements: "Many Achievements", FunctionalTasks: "Many Tasks "
            });
        }
    });




}

exports.createDefaultExperiances = createDefaultExperiances;
