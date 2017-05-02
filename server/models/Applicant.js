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
    Confirmed: Boolean,
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



