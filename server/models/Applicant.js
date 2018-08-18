var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var applicantSchema = mongoose.Schema({
   
    JobSeeker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker'
    },
    Vacancy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vacancy'
    },
    Employer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employer'
    },
    Confirmed: Boolean,
    ArrangeInterviewDate: { type: Date },
    ArrangeInterviewTime: { type: Date },
    ArrangeInterviewLocation: String,
    Status: String,
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

var Applicant = mongoose.model('Applicant', applicantSchema);



