var mongoose = require('mongoose');

var EducationalInformationSchema = mongoose.Schema({
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
    GraduationYear: Number,
    ModifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },    
    CreatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }, 
    Deleted : Boolean  ,   
    DeletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},    
{
    timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
});

var EducationalInformation = mongoose.model('EducationalInformation', EducationalInformationSchema);


function createDefaultEducationalInformations() {
    
    EducationalInformation.find({}).exec(function (err1, col) {
        if (col.length === 0) {
            
            EducationalInformation.create({
                Deleted : false,
                GraduationYear : 2006
            });
            
            EducationalInformation.create({
                Deleted : false,
                GraduationYear : 2007
            });
        }
    });
}

exports.createDefaultEducationalInformations = createDefaultEducationalInformations;
