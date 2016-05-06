var mongoose = require('mongoose');

var SkillSchema = mongoose.Schema({
    JobSeeker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'JobSeeker'
    },
    SkillType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkillType'
    },
    SkillLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SkillLevel'
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

var Skill = mongoose.model('Skill', SkillSchema);


function createDefaultSkills() {
    
    Skill.find({}).exec(function (err1, col) {
        if (col.length === 0) {
            
           
        }
    });
}

exports.createDefaultSkills = createDefaultSkills;
