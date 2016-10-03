var mongoose = require('mongoose');

var SkillTypeSchema = mongoose.Schema({
    
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

var SkillType = mongoose.model('SkillType', SkillTypeSchema);


function createDefaultSkillTypes() {
            SkillType.find({}).exec(function (err1, col) {
                if (col.length === 0) {
                    
                    SkillType.create({
                Deleted : false,
                Name: [{ "Text": "C#" , "Lang": "en" }, { "Text": "C#" , "Lang": "ar" }]
                        
                    });
                    
                    SkillType.create({
                Deleted : false,
                Name: [{ "Text": "Java" , "Lang": "en" }, { "Text": "Java" , "Lang": "ar" }]
                       
                    });
                }
            });
            
        
    };
    


exports.createDefaultSkillTypes = createDefaultSkillTypes;
