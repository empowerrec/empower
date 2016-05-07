var mongoose = require('mongoose');

var SkillLevelSchema = mongoose.Schema({
    
    Name: [{
            Lang: String,
            Text: String
        }],
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

var SkillLevel = mongoose.model('SkillLevel', SkillLevelSchema);


function createDefaultSkillLevels() {
            SkillLevel.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    SkillLevel.create({
                Name: [{ "Text": "Exxlent" , "Lang": "en" }, { "Text": "„„ «“" , "Lang": "ar" }]
                        
                    });
                    
                    SkillLevel.create({
                Name: [{ "Text": "Very Good" , "Lang": "en" }, { "Text": "ÃÌœ Ãœ«" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultSkillLevels = createDefaultSkillLevels;
