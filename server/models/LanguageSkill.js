var mongoose = require('mongoose');

var LanguageSkillSchema = mongoose.Schema({
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
    },
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
    timestamps: { createdAt: 'CreatedAt', updatedAt: "UpdatedAt" }
});

var LanguageSkill = mongoose.model('LanguageSkill', LanguageSkillSchema);


function createDefaultLanguageSkills() {
    
    LanguageSkill.find({}).exec(function (err1, col) {
        if (col.length === 0) {
            
           
        }
    });
}

exports.createDefaultLanguageSkills = createDefaultLanguageSkills;
